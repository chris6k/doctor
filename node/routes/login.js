var express = require('express');
var router = express.Router();
var request = require("request");

var appid = 'wx9b2bbce36613b66e', secret = 'b4c3079540dd4b57269a09b5e2d36dc0';


var login_url = '/gakf/login.html';
var target_url = {sick: '/gakf/sickDetail.html', doctor: '/gakf/sick.html'};
var reg_url = '/gakf/register.html';

var getOpenId = function (req, res, code) {
    var url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + appid + "&secret="
        + secret + "&code=" + code + "&grant_type=authorization_code";
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            var openid = data.openid;
            req.models.doctor.find({wx_id: openid}, function (err, data) {
                if (err) {
                    res.redirect(login_url + "?wx_id=" + openid);
                } else {
                    if (data && data.length > 0) {
                        res.redirect(target_url.doctor + "?wx_id=" + openid + "&doctor_id=" + data[0].id);
                    } else {
                        req.models.user.find({wx_id: openid}, function (err, data) {
                            if (err || !data || data.length == 0) {
                                res.redirect(login_url + "?wx_id=" + openid);
                            } else {
                                res.redirect(target_url.sick + "?wx_id=" + openid + "&sick_id=" + data[0].id);
                            }

                        });
                    }
                }
            });
        } else {
            res.redirect(login_url);
        }
    });
};

router.get('/callback', function (req, res, next) {
    var code = req.param("CODE");
    if (code) {
        getOpenId(req, res, code);
    }
});

router.post('/login', function (req, res, next) {
    var username = req.param('username');
    var password = req.param('password');
    var type = req.param('type');
    var wx_id = req.param('wx_id') || '';
    if (!username || !password || !type) {
        res.redirect(login_url + "?err=1&wx_id=" + wx_id);
        return;
    }
    req.models[type].find({wx_id: wx_id}, function (err, data) {
        if (err) {
            res.redirect(login_url + "?err=2&wx_id=" + wx_id);
        } else if (data && data.length > 0) {
            if (data[0].status === 't' && (data[0].type === type)) {
                //todo
                res.redirect(target_url[type]);
            } else {
                res.redirect(login_url + "?err=2&wx_id=" + wx_id);
            }
        } else {
            req.models[type].find({name: username, password: password}, 1, function (err, data) {
                if (err) {
                    res.redirect(login_url + "?err=2&wx_id=" + wx_id);
                } else if (data && data.length > 0) {
                    data[0].wx_id = wx_id;
                    data[0].save(function (err) {
                        if (!err) {
                            //todo
                            res.redirect(target_url[type]);
                        } else {
                            res.redirect(login_url + "?err=2&wx_id=" + wx_id);
                        }
                    });
                } else {
                    res.redirect(login_url + "?err=2&wx_id=" + wx_id);
                }
            });
        }
    });
});

router.post('/reg', function (req, res, next) {
    var name = req.param('name');
    var username = req.param('username');
    var password = req.param('password');
    var doctor_name = req.param('doctor');
    var bed_no = req.param('bed_no');
    var wx_id = req.param('wx_id') || '';
    if (!username || !password || !doctor_name || !bed_no) {
        res.redirect(reg_url + "?err=1&wx_id=" + wx_id);
        return;
    }

    req.models.doctor.find({name: doctor_name}, function (err, doctor) {
        if (err || !doctor || doctor.length == 0) {
            res.redirect(reg_url + "?err=2&wx_id=" + wx_id);
        } else {
            req.models.sick.find({bed_id: bed_no, doctor_name: doctor_name, name: name}, function (err, sick) {
                if (err) {
                    res.redirect(reg_url + "?err=2&wx_id=" + wx_id);
                } else if (sick && sick.length > 0) {
                    sick[0].username = username;
                    sick[0].password = password;
                    sick[0].wx_id = wx_id;
                    sick[0].save(function (err) {
                        if (err) {
                            res.redirect(reg_url + "?err=2&wx_id=" + wx_id);
                        } else {
                            res.redirect(target_url.sick + "?wx_id=" + wx_id + "&sick_id=" + sick[0].id);
                        }
                    });
                } else {
                    req.models.sick.create({
                        name: name, username: username, password: password,
                        bed_no: bed_no, wx_id: wx_id, doctor_name: doctor_name,
                        nurse_name: doctor.nurse_name, doctor_id: doctor.id, nurse_id: doctor.nurse_id
                    }, function (err, item) {
                        if (err) {
                            res.redirect(reg_url + "?err=2&wx_id=" + wx_id);
                        } else {
                            res.redirect(target_url.sick + "?wx_id=" + wx_id + "&sick_id=" + item.id);
                        }
                    });
                }
            });
        }
    });

});


module.exports = router;