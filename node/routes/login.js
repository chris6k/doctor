var express = require('express');
var router = express.Router();
var result = require('./result');
var weixin = require('weixin-apis');
//TODO
var login_url = '';
var target_url = {sick: '', doctor: ''};
var reg_url = '';

router.post('/callback', function (req, res, next) {
    var code = req.param("CODE");
});

router.post('/login', function (req, res, next) {
    var username = req.param('username');
    var password = req.param('password');
    var type = req.param('type');
    var wx_id = req.param('wx_id');
    if (!username || !password || !type || !wx_id) {
        res.redirect(login_url + "?err=1");
        return;
    }
    req.models[type].find({wx_id: wx_id}, function (err, data) {
        if (err) {
            res.redirect(login_url + "?err=2");
        } else if (data && data.length > 0) {
            if (data[0].status === 't' && (data[0].type === type)) {
                res.redirect(target_url[type]);
            } else {
                res.redirect(login_url + "?err=2");
            }
        } else {
            req.models[type].find({name: username, password: password}, 1, function (err, data) {
                if (err) {
                    res.redirect(login_url + "?err=2");
                } else if (data && data.length > 0) {
                    data[0].wx_id = wx_id;
                    data[0].save(function (err) {
                        if (!err) {
                            res.redirect(target_url[type]);
                        } else {
                            res.redirect(login_url + "?err=2");
                        }
                    });
                } else {
                    res.redirect(login_url + "?err=2");
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
    var wx_id = req.param('wx_id');
    if (!username || !password || !doctor_name || !bed_no || !wx_id) {
        res.redirect(reg_url + "?err=1");
        return;
    }

    req.models.doctor.find({name: doctor_name}, function (err, doctor) {
        if (err || !doctor || doctor.length == 0) {
            res.redirect(reg_url + "?err=2");
        } else {
            req.models.sick.find({bed_no: bed_no, doctor_name: doctor_name, name: name}, function (err, sick) {
                if (err) {
                    res.redirect(reg_url + "?err=2");
                } else if (sick && sick.length > 0) {
                    sick[0].username = username;
                    sick[0].password = password;
                    sick[0].wx_id = wx_id;
                    sick[0].save(function (err) {
                        if (err) {
                            res.redirect(reg_url + "?err=2");
                        } else {
                            res.json(target_url.sick);
                        }
                    });
                } else {
                    req.models.sick.create({
                        name: name, username: username, password: password,
                        bed_no: bed_no, wx_id: wx_id, doctor_name: doctor_name,
                        nurse_name: doctor.nurse_name, doctor_id: doctor.id, nurse_id: doctor.nurse_id
                    }, function (err, item) {
                        if (err) {
                            res.json(result(false, 'create sick failed', {}));
                        } else {
                            res.json(result(true, '', item));
                        }
                    });
                }
            });
        }
    });

});


module.exports = router;