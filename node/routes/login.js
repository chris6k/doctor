var express = require('express');
var router = express.Router();
var request = require('request');
var result = require('./result');
var getCb = require('./loginCheck').getCb;
var appid = 'wxaf3a162fe7e04d37', secret = '2166e5441e7412dc7ebd4111635db0b7';
var login_url = '/gakf/login.html';
var dateFormat = require('dateformat');
// var target_url = {sick: '/gakf/sickDetail.html'};
var reg_url = '/gakf/register.html';
var unverifyUrl = '/gakf/msg.html';

var api = require('../biz/weixin').api;
var weixin = require('../biz/weixin').weixin;
var signtool = require("weixin-signature").sign;

var unreg_url = '/gakf/msg.html';
var bed_num_reg = /[a-zA-Z0-9]+/;
var name_reg = /[\[\]\?\,\+\*\-]+/;
var username_reg = /[a-zA-Z0-9_]+/;

var getOpenId = function (req, res, code) {
    var url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + appid + '&secret='
        + secret + '&code=' + code + '&grant_type=authorization_code';
    console.log('cb_key=' + req.cookies.cb_key);
    var cb = getCb(req.cookies.cb_key);
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            var openid = data.openid;
            if (openid) {
                res.cookie('wx_id', openid, {expires: new Date(Date.now() + 900000), httpOnly: false});
                req.models.doctor.find({wx_id: openid}, function (err, data) {
                
                    if (err) {
                        console.error(err);
                        res.redirect(login_url + '?wx_id=' + openid + '&cb=' + encodeURIComponent(cb));
                    } else {
                        if (data && data.length > 0) {
                            res.cookie('doctor_id', data[0].id, {expires: new Date(Date.now() + 900000), httpOnly: false});
                            res.cookie('type', 'doctor', {expires: new Date(Date.now() + 900000), httpOnly: false});
                            res.cookie('status', data[0].status, {expires: new Date(Date.now() + 900000), httpOnly: false});
                            res.redirect(cb + '?wx_id=' + openid + '&doctor_id=' + data[0].id);
                        } else {
                            req.models.sick.find({wx_id: openid}, function (err, data) {
                                if (err || !data || data.length == 0) {
                                    console.info("no wx_id user found, id=" + openid);
                                    res.redirect(login_url + '?wx_id=' + openid + '&cb=' + encodeURIComponent(cb));
                                } else {
                                    res.cookie('sick_id', data[0].id, {expires: new Date(Date.now() + 900000), httpOnly: false});
                                    res.cookie('type', 'sick', {expires: new Date(Date.now() + 900000), httpOnly: false});
                                    res.cookie('status', data[0].status, {expires: new Date(Date.now() + 900000), httpOnly: false});
                                    if (data[0].status === 't') {
                                        res.redirect(cb + '?wx_id=' + openid + '&sick_id=' + data[0].id);
                                    } else if (data[0].status === 'f') {
                                        res.redirect(login_url);
                                    } else {
                                        res.redirect(unverifyUrl + "?doctor_name=" + encodeURIComponent(data[0].doctor_name)); 
                                    }
                                }
                            });
                        }
                    }
                });
            }
        } else {

            console.error(error);
            res.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid
                        + '&redirect_uri=' + redirectUri + '&state='
                        + '&response_type=code&scope=snsapi_base#wechat_redirect');
        }
    });
};

var apiJs;
var timeout = 0;
var getSign = function(ticket, timestamp, url) {
    var config = {
    noncestr    : "Wm3WZYTPz0wzccnW",
    jsapi_ticket: ticket,
    timestamp   : timestamp,
    url         : url
    };
    return signtool(config);
};

router.get('/weixin_sign', function(req, res, next){
    var url = req.param('url');
    var timestamp = Date.now();

    if (apiJs && Date.now() < timeout) {
        res.json(result(true, '', getSign(apiJs, timestamp, url)));    
    } else {
        weixin.getCacheAccessToken(function(accessToken) {
            if (accessToken) {
                var jsapiurl = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=" + accessToken.access_token + "&type=jsapi";
                request(jsapiurl, function (error, response, body) {
                    if (error) {
                        res.json(result(false,'err',error));
                    } else {
                        r = JSON.parse(body);
                        apiJs = r.ticket;
                        timeout = Date.now() + r.expires_in * 1000;
                        res.json(result(true, '', getSign(apiJs, timestamp, url)));
                    }
                });
             } else {
                res.json(result(false,'get token failed',null));
            }
        });
    }
});

router.get('/callback', function (req, res, next) {
    var code = req.param('code');
    if (code) {
        getOpenId(req, res, code);
    } else {
        next();
    }
});

var loginResp = function(type, id, url, doctor_id, doctor_name) {
    return {type:type, id:id, url:url, doctor_id: doctor_id, doctor_name:doctor_name || ''};
}

router.post('/logout', function(req, res, next){
    var type = req.cookies.type;
    console.info("type=" + type + ",id=" + req.cookies[type + "_id"]);
    if (type === "sick") {
        var sick_id = req.cookies.sick_id;
        req.models.sick.get(sick_id, function(err, data){
            if (!err && data) {
                data.save({"wx_id":""}, function(err){
                    console.info(err || "ok");
                })
            }
        });
    } else if (type === "doctor") {
        var doctor_id = req.cookies.doctor_id;
        req.models.doctor.get(doctor_id, function(err, data){
            if (!err && data) {
                data.save({"wx_id":""}, function(err){
                    console.info(err || "ok");
                })
            }
        });
    }
    res.cookie('sick_id','',{maxAge:0});
    res.cookie('doctor_id','',{maxAge:0});
    res.json(result(true,null,null));
});

router.post('/update', function(req, res, next) {
    var userId = req.param("user_id");
    var type = req.param("type");
    var name = req.param("name");
    var newPassword = req.param("new_password");
    var oldPassword = req.param("old_password");
    var sign = req.param('sign');
    req.models[type].get(userId, function(err, user){
         if (err || !user) {
            res.json(result(false, '未能获取到用户信息', err));
        } else {
            var savedata = {};
            if (newPassword) {
                savedata.password = newPassword;
            }
            if (name) {
                savedata.name = name;
            }
            if (sign) {
                savedata.sign = sign;
            }
            if (oldPassword && user.password != oldPassword) {                
                res.json(result(false, "旧密码不匹配，请重新输入", null));
            } else {
                user.save(savedata, function(err){
                    if (!err) {
                         res.json(result(true, null,null));
                     } else {
                        res.json(result(false, "保存信息失败", err));
                     }
                });
            }
        }
    });
});

router.post('/login', function(req, res, next) {
    var username = req.param('username');
    var password = req.param('password');
    var type = req.param('type');
    var cb = req.param('cb');
    var wx_id = req.cookies.wx_id || '';
    console.info("cookie_wx_id=[" + wx_id + "]");
    if (!username || !password || !type) {
        res.json(result(false,'请输入用户名和密码',{}));
        // res.redirect(login_url + '?err=1&wx_id=' + wx_id);
        return;
    }
    req.models[type].find({username: username, password: password}, function (err, data) {
                if (err) {
                    res.json(result(false, '错误的用户名或密码', err));
                    // res.redirect(login_url + '?err=4&wx_id=' + wx_id);
                } else if (data && data.length > 0) {
                    var updatedata = {};
                    if (wx_id) {
                        updatedata.wx_id = wx_id;
                    } 
                    data[0].save(updatedata, function (err) {
                        console.info(data[0]);
                        if (!err) {

                            var expiresTime = 360*24*3600*1000;
                            if (data[0].doctor_id) {
                                res.cookie('doctor_id', data[0].doctor_id || '', {expires: new Date(Date.now() + expiresTime),httpOnly: false});
                            }
                            res.cookie('type', type || '', {expires: new Date(Date.now() + expiresTime),httpOnly: false});
                            res.cookie('status', data[0].status || '', {expires: new Date(Date.now() + expiresTime),httpOnly: false});
                            res.cookie('id', data[0].id || '', {expires: new Date(Date.now() + expiresTime),httpOnly: false});
                            res.cookie(type + '_id', data[0].id || '', {expires: new Date(Date.now() + expiresTime),httpOnly: false});

                            if (data[0].status === 't') {
                                res.json(result(true, '', loginResp(type, data[0].id, decodeURIComponent(cb||''), 
                                    data[0].doctor_id, data[0].doctor_name || data[0].name)));
                            } else {
                                res.json(result(false, '用户审核中，请等待医生审核通过', {}));
                            }
                        } else {
                           res.json(result(false,'绑定微信账户失败',err));
                        }
                    });
                } else {
                    res.json(result(false,'错误的用户名或密码',{}));
                }
    });
   
});

router.post('/reg', function (req, res, next) {
    var name = req.param('name');
    var username = req.param('username');
    var password = req.param('password');
    var doctor_id = req.param('doctor_id');
    // var doctor_name = req.param('doctor');
    var bed_no = req.param('bed_no');
    // var hospital = req.param('hospital');
    var height = req.param('height');
    var weight = req.param('weight');
    var age = req.param("age");
    var gender = req.param('gender');
    var wx_id = req.cookies.wx_id;
    if (!username || !password || !doctor_id) {
        res.json(result(false, '请填写用户名、密码和医生信息', null));
        return;
    }
    if (bed_no && !bed_num_reg.test(bed_no)) {
        res.json(result(false, '错误的床号格式，仅允许[a-zA-Z0-9]', null));
        return;
    }
    if (name_reg.test(name)) {
        res.json(result(false, '姓名不允许名称包含下列字符 [*-],*)', null));
        return;
    }

    req.models.doctor.find({id: doctor_id}, function (err, doctor) {
        if (err || !doctor || doctor.length == 0) {
            res.json(result(false, '找不到该医生信息', err));
            // res.redirect(reg_url + '?err=2&wx_id=' + wx_id);
        } else {
            req.models.sick.create({
                name: name, username: username, password: password, hospital:doctor[0].hospital,
                bed_id: bed_no, wx_id: wx_id, doctor_name: doctor[0].name,
                nurse_name: doctor[0].nurse_name, doctor_id: doctor[0].id, nurse_id: doctor[0].nurse_id,
                height: height, weight:weight, age:age, gender:gender
            }, function (err, item) {
                if (err) {
                    res.json(result(false, '注册失败，可能有相同的用户名，请换一个用户名再试', err));
                    // res.redirect(reg_url + '?err=2&wx_id=' + wx_id);
                } else {
                    console.error('create succ');
                    req.models.sickRequest.create(
                        {doctorId:doctor[0].id, sickId:item.id, sickName:name, sickBed: bed_no, lastUpdate:new Date()}, 
                        function(err, sickRequest) {
                        if (err) {
                            console.error('send request failed');
                            item.remove(function(err){
                                if (err) {
                                    console.error(err);
                                }
                            });
                            res.json(result(false, '注册失败，请重试', err));
                        } else {
                            console.info("doctor_open_id=" + doctor[0].wx_id);
                            if (doctor[0].wx_id) {
                               //TODO
                               notifySick(doctor[0].wx_id, name);
                               // api.sendText(doctor[0].wx_id, "有新病人(" + name + ")申请成为您的病人，请回复‘同意和病人姓名'审核通过，回复'拒绝和病人姓名'拒绝请求", function(err){
                               //      if (err) {
                               //          console.error(err);
                               //      } else {
                               //          console.info("send request success");
                               //      }
                               // });
                            } else {
                                console.error("doctor miss wx_id, doctor_id=" + doctor[0].id);
                            }
                            res.cookie('sick_id', item.id, {expires: new Date(Date.now() + 900000), httpOnly: false});
                            res.cookie('type', 'sick', {expires: new Date(Date.now() + 900000), httpOnly: false});
                            res.cookie('status', 'u', {expires: new Date(Date.now() + 900000), httpOnly: false});
                            res.json(result(true, '', loginResp('sick', item.id, '', item.doctor_id, item.doctor_name)));       
                        }
                    });
                    // res.redirect(target_url.sick + '?wx_id=' + wx_id + '&sick_id=' + item.id);
                }
            });
        }
    });

});

var notifySick = function(wx_id, name) {
    var templateId = "_hpYqESfjPoRF45jEmSoKSVs49NFU5h1DkSQoE73RAY";
    var url = '';
    var topcolor = '#FF0000'; // 顶部颜色
    var datetime = new Date();
    var data = {
        first: {"value":"您有新的病人申请"},
        keyword1: {"value":"有新病人(" + name + ")申请成为您的病人，请回复‘同意和病人姓名'审核通过，回复'拒绝和病人姓名'拒绝请求"},
        keyword2: {"value":dateFormat(datetime,"yyyy/mm/dd hh:MM:ss")},
        remarks: {"value":"请尽快处理"}
    };

    api.sendTemplate(wx_id, templateId, url, topcolor,data,function(err){
        if (err) {
            console.error(err);
        } else {
            console.info("sendTemplate ok");
        }
    });
    
}


module.exports = router;
