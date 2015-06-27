var express = require('express');
var router = express.Router();
var result = require('./result');
router.post('/login', function (req, res, next) {
    var username = req.param('username');
    var password = req.param('password');
    var type = req.param('type');
    var wx_id = req.param('wx_id');
    if (!username || !password || !type || !wx_id) {
        res.json(result(false, 'invalid request params', {}));
        return;
    }
    req.models[type].find({wx_id: wx_id}, function (err, data) {
        if (err) {
            res.json(result(false, err.msg, {}));
        }
        else if (data) {
            if (data.status === 't' && (data.type === type)) {
                res.json(result(true, '', data));
            } else {
                res.json(result(false, 'status is f or type is mismatch', {}));
            }
        } else {
            req.models[type].find({name: username, password: password}, function (err, data) {
                if (err) {
                    res.json(result(false, err.msg, {}));
                } else if (data) {
                    data.wx_id = wx_id;
                    data.save(function (err) {
                        if (!err) {
                            res.json(result(true, '', {}));
                        } else {
                            res.json(result(false, 'create user failed', {}));
                        }
                    });
                } else {
                    res.json(result(false, 'unknown user', {}));
                }
            });
        }
    });
});

router.post('/reg', function (req, res, next) {
    var username = req.param('username');
    var password = req.param('password');
    var doctor_name = req.param('doctor');
    var bed_no = req.param('bed_no');
    var wx_id = req.param('wx_id');
    if (!username || !password || !doctor_name || !bed_no || !wx_id) {
        res.json(result(false, 'invalid request params', {}));
        return;
    }
    req.models.doctor.find({name: doctor_name}, function (err, doctor) {
        if (err || !doctor) {
            res.json(result(false, 'unknown doctor', {}));
        } else {
            req.models.sick.find({bed_no: bed_no, doctor_name: doctor_name}, function (err, sick) {
                if (err) {
                    res.json(result(false, 'create user failed', {}));
                } else if (sick) {
                    sick.username = username;
                    sick.password = password;
                    sick.wx_id = wx_id;
                    sick.nurse_name = doctor.nurse_name;
                    sick.save(function (err) {
                        if (err) {
                            res.json(result(false, 'save user info failed', {}));
                        } else {
                            res.json(result(true, '', {}));
                        }
                    });
                } else {
                    req.models.sick.create({
                        username: username, password: password,
                        bed_no: bed_no, wx_id: wx_id, doctor_name: doctor_name,
                        nurse_name: doctor.nurse_name
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