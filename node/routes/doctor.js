var express = require('express');
var router = express.Router();
var result = require('./result');
var orm = require('orm');
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');

router.get('/sicks', function (req, res, next) {
    req.models.sick.find({doctor_id: req.param('doctor_id'), out_day: orm.lte(new Date())}, function (err, data) {
        if (!err) {
            res.json(result(false, '', {}));
        } else {
            res.json(result(true, '', data));
        }
    });
});


router.post('/check', function (req, res, next) {
    //生成multiparty对象，并配置下载目标路径
    var sick_id = req.param('sick_id');
    var doctor_id = req.param('doctor_id');
    var description = req.param('description');
    var form = new multiparty.Form({uploadDir: './public/images/'});
    //下载后处理
    form.parse(req, function (err, fields, files) {
        var filesTmp = JSON.stringify(files, null, 2);

        if (err) {
            console.log('parse image error: ' + err);
            res.json(result(false, '', {}));
        } else {
            console.log('parse files: ' + filesTmp);
            var pic = [];
            for (var i = 0; i < files.inputFile.length; i++) {
                pic[i] = files.inputFile[i].path;
            }
            /**
             * sick_id: {type: 'integer'},
             doctor_id: {type: 'string'},
             nurse_id: {type: 'string', required: false},
             day: {type: 'date'},
             description: {type: 'object'},
             pics: {type: 'object'}
             */
            req.models.sickcheck.create({
                sick_id: sick_id, doctor_id: doctor_id, day: new Date(), description: JSON.parse(description), pics: pic
            }, function (err, item) {
                if (!err) {
                    res.json(result(false, 'create check item failed', {}));
                } else {
                    res.json(result(true, '', item));
                }
            });

        }
    });
});


module.exports = router;
