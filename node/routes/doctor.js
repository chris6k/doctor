var express = require('express');
var router = express.Router();
var result = require('./result');
var orm = require('orm');
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');
//Todo
var source_url = {check: '', review: ''};
var target_url = {check: '/gakf/check.html', review: ''};

//根据ID获取医生信息
router.get('/info', function (req, res, next) {
    var doctor_id = req.param('doctor_id');
    req.models.doctor.get(doctor_id, function (err, item) {
        if (err || !item) {
            res.json(result(false, err.msg, {}));
        } else {
            res.json(result(true, '', item));
        }
    });
});

//获取出院的病人
router.get('/out_sicks', function (req, res, next) {
    var doctor_id = req.param('doctor_id');
    if (!doctor_id) {
        res.json(result(false, 'no doctor_id', {}));
        return;
    }
    req.models.sick.find({
        doctor_id: doctor_id,
        out_day: orm.lte(new Date())
    }, function (err, data) {
        if (err || !data) {
            console.error(err);
            res.json(result(false, '', {}));
        } else {
            for (var i = 0; i< data.length; i++) {
                data[i].out_dur = data[i].out_duration();
            }
            res.json(result(true, '', data));
        }
    });
});

//获取该医生所有的病人
router.get('/sicks', function (req, res, next) {
    var doctor_id = req.param('doctor_id');
    if (!doctor_id) {
        res.json(result(false, 'no doctor_id', {}));
        return;
    }
    req.models.sick.find({doctor_id: doctor_id}, function (err, data) {
        if (err || !data) {
            console.error(err);
            res.json(result(false, '', {}));
        } else {
            for (var i = 0; i< data.length; i++) {
                data[i].in_dur = data[i].in_duration();
            }
            res.json(result(true, '', data));
        }
    });
});

//查房
router.post('/check', function (req, res, next) {
    
        
        var sick_id, doctor_id, description, title, pic, hasErr;
        try {
            sick_id = req.param('sick_id');
            doctor_id = req.param('doctor_id');
            title = req.param('title');
            description = req.param('description');
            pic = req.param('pics');
            if (!(pic instanceof Array)) {
                var temp = [];
                temp.push(pic);
                pic=temp;
            }
            console.log("description=" + description + ", pics=" + pic);
        } catch (e) {
            console.error(e);
            hasErr = e;
        }
        if (hasErr) {
            console.log('parse param error: ' + hasErr);
            res.redirect(source_url.check + "?err=1");
        } else {
            var sc = {
                title: title,
                sick_id: sick_id, doctor_id: doctor_id, day: new Date(), description: description, pics: pic
            };
            console.log('sc=' + JSON.stringify(sc));
            req.models.sickcheck.create(sc, function (err, item) {
                if (err) {
                    console.error(err);
                    res.redirect(source_url.check + "?err=1");
                } else {
                    res.redirect(target_url.check);
                }
            });

        }
    
});

//随访
router.post('/out_check', function (req, res, next) {
    //生成multiparty对象，并配置下载目标路径
    var form = new multiparty.Form({uploadDir: './public/images/'});
    //下载后处理
    form.parse(req, function (err, fields, files) {
        var filesTmp = JSON.stringify(files, null, 2);
        var sick_id, doctor_id, description, title;
        try {
            sick_id = fields['sick_id'];
            doctor_id = fields['doctor_id'];
            title = fields['title'];
            description = fields['description'];
        } catch (e) {
            console.error(e);
            err = e;
        }
        if (err) {
            console.log('parse image error: ' + err);
            res.redirect(source_url.review + "?err=1");
        } else {
            console.log('parse files: ' + filesTmp);
            var pic = [];
            for (var i = 0; i < files.inputFile.length; i++) {
                pic[i] = files.file[i].path;
            }

            req.models.sickreview.create({
                title: title,
                sick_id: sick_id, doctor_id: doctor_id, day: new Date(), description: JSON.parse(description), pics: pic
            }, function (err, item) {
                if (err) {
                    console.error(err);
                    res.redirect(source_url.review + "?err=1");
                } else {
                    res.redirect(target_url.review);
                }
            });

        }
    });

});

router.get("/checkList", function(req, res, next){
    var sick_id = req.param("sick_id");
    var doctor_id = req.param("doctor_id");
    var query = {};
    if (sick_id) {
        query.sick_id = sick_id;
    } 
    if (doctor_id) {
        query.doctor_id = doctor_id;
    }
    req.models.sickcheck.find(query, function(err, data) {
        if (err) {
            res.json(result(false,"get sickcheck err", err));
        } else {
            res.json(result(true,'',data));
        }
    });
});


module.exports = router;
