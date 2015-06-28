var express = require('express');
var router = express.Router();
var result = require('./result');

router.get('/sickstatus', function (req, res, next) {
    req.models.sickstatus.find({type: req.param('type'), sick_id: req.param('sick_id')}, function (err, data) {
        if (err) {
            console.error(err);
            res.json(result(false, '', {}));
        } else {
            res.json(result(true, '', data));
        }
    });
});

router.get('/info', function (req, res, next) {
    req.models.sick.get(req.param('id'), function (err, data) {
        if (err) {
            console.error(err);
            res.json(result(false, '', {}));
        } else {
            res.json(result(true, '', data));
        }
    });
});

router.post('/create', function (req, res, next) {
    var sick = JSON.parse(req.param('sick'));
    req.models.sick.create(sick, function (err, data) {
        if (err) {
            res.json(result(false, 'save failed', {}));
        } else {
            res.json(result(true, '', data));
        }
    });
});

router.get('/print', function (req, res, next) {
    var id = req.param('id');
    req.models.sick.get(id, function (err, sick) {
        if (err) {
            console.error(err);
            res.json(result(false, '', {}));
        } else {
            if (!sick.qr_code) {
                //TODO
                res.json(result(false, '没有二维码，搞毛线', {}));
            } else {
                res.json(result(true, '', sick));
            }
        }
    })
});

router.get('sickdrug', function (req, res, next) {
    var sick_id = req.param('sick_id');
    req.models.sickdrug.find({sick_id: sick_id}, function (err, data) {
        if (err) {
            console.error(err);
            res.json(result(false, '', {}));
        } else {
            res.json(result(true, '', data));
        }
    });
});


module.exports = router;
