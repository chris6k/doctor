var express = require('express');
var router = express.Router();
var result = require('./result');
router.post('/table_rule', function(req, res, next) {
	var table_type = req.param('table_type');
	var rule = req.param('rule');
	req.models.sicktablerule.create({table_type: table_type, rule: rule}, function(err, rule) {
		if (err) {
			res.json(result(false, 'err', err));
		} else {
			res.json(result(true, '', rule));
		}
	});
});
module.exports=router;