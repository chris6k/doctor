var express = require('express');
var router = express.Router();
var result = require('./result');

router.get('/list', function (req, res, next) {
    var type = req.param('type');
    req.models.sicktables.find({type: type}, 1, function (err, data) {
        if (!err) {
            console.error(err);
            res.json(result(false, 'get list failed', {}));
        } else {
            res.json(result(true, '', data));
        }
    });
});

module.exports = router;
