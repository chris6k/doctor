var express = require('express');
var router = express.Router();
var request = require('request');
var result = require('./result');
var appid = 'wx9b2bbce36613b66e', secret = 'b4c3079540dd4b57269a09b5e2d36dc0';
var urlMap = {'1':'/gakf/flowSick.html', '2':'/gakf/communicate.html', '3':'/gakf/inpatientInfo.html'};
var weixin = require('weixin-apis');
var login_url = '/gakf/login.html';
var target_url = {sick: '/gakf/sickDetail.html'};
var reg_url = '/gakf/register.html';
var unverifyUrl = '';

//todo
var unreg_url = '';

var getOpenId = function (req, res, code) {
    var url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + appid + '&secret='
        + secret + '&code=' + code + '&grant_type=authorization_code';
    console.log('cb_key=' + req.cookies.cb_key);
    var cb = urlMap[req.cookies.cb_key];
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            var openid = data.openid;
            if (openid) {
                res.cookie('wx_id', openid, {expires: new Date(Date.now() + 900000), httpOnly: true});
                req.models.doctor.find({wx_id: openid}, function (err, data) {
                    if (err) {
                        console.error(err);
                        res.redirect(login_url + '?wx_id=' + openid + '&cb=' + encodeURIComponent(cb));
                    } else {
                        if (data && data.length > 0) {
                            res.cookie('doctor_id', data[0].id, {expires: new Date(Date.now() + 900000), httpOnly: true});
                            res.cookie('type', 'doctor', {expires: new Date(Date.now() + 900000), httpOnly: true});
                            res.cookie('status', data[0].status, {expires: new Date(Date.now() + 900000), httpOnly: true});
                            res.redirect(cb + '?wx_id=' + openid + '&doctor_id=' + data[0].id);
                        } else {
                            req.models.sick.find({wx_id: openid}, function (err, data) {
                                if (err || !data || data.length == 0) {
                                    res.redirect(login_url + '?wx_id=' + openid + '&cb=' + encodeURIComponent(cb));
                                } else {
                                    res.cookie('sick_id', data[0].id, {expires: new Date(Date.now() + 900000), httpOnly: true});
                                    res.cookie('type', 'sick', {expires: new Date(Date.now() + 900000), httpOnly: true});
                                    res.cookie('status', data[0].status, {expires: new Date(Date.now() + 900000), httpOnly: true});
                                    if (data[0].status === 't') {
                                        res.redirect(target_url.sick + '?wx_id=' + openid + '&sick_id=' + data[0].id);
                                    } else if (data[0].status === 'f') {
                                        res.redirect(login_url);
                                    } else {
                                        res.redirect(unverifyUrl); 
                                    }
                                }
                            });
                        }
                    }
                });
            }
        } else {
            console.error(error);
            res.redirect(login_url);
        }
    });
};

router.get('/callback', function (req, res, next) {
    var code = req.param('code');
    if (code) {
        getOpenId(req, res, code);
    } else {
        next();
    }
});

var loginResp = function(type, id, url, doctor_id) {
    return {type:type, id:id, url:url, doctor_id: doctor_id};
}

router.post('/login', function (req, res, next) {
    var username = req.param('username');
    var password = req.param('password');
    var type = req.param('type');
    var cb = req.param('cb');
    var wx_id = req.cookies.wx_id || '';
    if (!username || !password || !type) {
        res.json(result(false,'empty username or password',{}));
        // res.redirect(login_url + '?err=1&wx_id=' + wx_id);
        return;
    }
    req.models[type].find({wx_id: wx_id}, function (err, data) {
        if (err) {
            res.json(result(false, 'get user by wx_id err', err));
            // res.redirect(login_url + '?err=2&wx_id=' + wx_id);
        } else if (data && data.length > 0) {
            if (data[0].status === 't') {
                res.cookie(type + '_id', data[0].id, {expires: new Date(Date.now() + 900000), httpOnly: true});
                res.json(result(true, loginResp(type, data[0].id, decodeURIComponent(cb||''), data[0].doctor_id)));
                // res.redirect(target_url[type] || decodeURIComponent(cb));
            } else {
                res.json(result(false, 'user status is f', {}));
                // res.redirect(login_url + '?err=3&wx_id=' + wx_id);
            }
        } else {
            req.models[type].find({username: username, password: password}, function (err, data) {
                if (err) {
                    res.json(result(false, 'get user by name and password err', err));
                    // res.redirect(login_url + '?err=4&wx_id=' + wx_id);
                } else if (data && data.length > 0) {
                    data[0].wx_id = wx_id;
                    data[0].save(function (err) {
                        if (!err) {
                            res.cookie(type + '_id', data[0].id, {expires: new Date(Date.now() + 900000), httpOnly: true});
                            res.json(result(true, '', loginResp(type, data[0].id, decodeURIComponent(cb||''), data[0].doctor_id)));
                            // res.redirect(target_url[type] || decodeURIComponent(cb));
                        } else {
                           res.json(result(false,'bind wx_id err',err));
                            // res.redirect(login_url + '?err=5&wx_id=' + wx_id);
                        }
                    });
                } else {
                    res.json(result(false,'no user',{}));
                    // res.redirect(login_url + '?err=6&wx_id=' + wx_id);
                }
            });
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
    var wx_id = req.cookies.wx_id;
    if (!username || !password || !doctor_id || !bed_no) {
        res.redirect(reg_url + '?err=1');
        return;
    }

    req.models.doctor.find({id: doctor_id}, function (err, doctor) {
        if (err || !doctor || doctor.length == 0) {
            res.json(result(false, 'get doctor err', err));
            // res.redirect(reg_url + '?err=2&wx_id=' + wx_id);
        } else {
            req.models.sick.create({
                name: name, username: username, password: password, hospital:doctor[0].hospital,
                bed_id: bed_no, wx_id: wx_id, doctor_name: doctor[0].name,
                nurse_name: doctor[0].nurse_name, doctor_id: doctor[0].id, nurse_id: doctor[0].nurse_id
            }, function (err, item) {
                if (err) {
                    res.json(result(false, 'err', err));
                    // res.redirect(reg_url + '?err=2&wx_id=' + wx_id);
                } else {
                    req.models.sickRequest.create({doctorId:doctor[0].id, sickId:item.id}, function(err, sickRequest) {
                        if (err) {
                            res.json(result(false, 'err', err));
                        } else {
                            if (doctor[0].wx_id) {
                                //todo weixin notify
                            }
                            res.cookie(type + '_id', item.id, {expires: new Date(Date.now() + 900000), httpOnly: true});
                            res.cookie('type', type, {expires: new Date(Date.now() + 900000), httpOnly: true});
                            res.cookie('status', 'u', {expires: new Date(Date.now() + 900000), httpOnly: true});
                            res.json(result(true, '', loginResp('sick', item.id, '', item.doctor_id)));       
                        }
                    });
                    // res.redirect(target_url.sick + '?wx_id=' + wx_id + '&sick_id=' + item.id);
                }
            });
        }
    });

});


module.exports = router;