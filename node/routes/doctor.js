var express = require('express');
var router = express.Router();
var result = require('./result');
var orm = require('orm');
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');
//Todo
var source_url = {check: '', review: ''};
var target_url = {check: '', review: ''};

//获取出院的病人
router.get('/out_sicks', function (req, res, next) {
    req.models.sick.find({doctor_id: req.param('doctor_id'), out_day: orm.lte(new Date())}, function (err, data) {
        if (err) {
            console.error(err);
            res.json(result(false, '', {}));
        } else {
            res.json(result(true, '', data));
        }
    });
});

//获取该医生所有的病人
router.get('/sicks', function (req, res, next) {
    req.models.sick.find({doctor_id: req.param('doctor_id')}, function (err, data) {
        if (err) {
            console.error(err);
            res.json(result(false, '', {}));
        } else {
            res.json(result(true, '', data));
        }
    });
});

//查房
router.post('/check', function (req, res, next) {
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
            res.redirect(source_url.check + "?err=1");
        } else {
            console.log('parse files: ' + filesTmp);
            var pic = [];
            for (var i = 0; i < files.inputFile.length; i++) {
                pic[i] = files.inputFile[i].path;
            }

            req.models.sickcheck.create({
                title: title,
                sick_id: sick_id, doctor_id: doctor_id, day: new Date(), description: JSON.parse(description), pics: pic
            }, function (err, item) {
                if (err) {
                    console.error(err);
                    res.redirect(source_url.check + "?err=1");
                } else {
                    res.redirect(target_url.check);
                }
            });

        }
    });
});

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
                pic[i] = files.inputFile[i].path;
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


module.exports = router;
