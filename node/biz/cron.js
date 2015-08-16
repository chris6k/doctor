var later = require('later');
var defines = require('../db/define');
var api = require('./weixin').api;
var orm = require('orm');
var _models;
var template_id = 'F1kjgyVBU1K3JV-Vg0iPselzU7Ox9IOrRPMoY7cxx0M';

/**
 一天四次，早上8点，中午12点，下午4点，晚上8点
一天三次 发送时间节点  早晨8点，中午12点，晚上6点
一天两次 发送时间节点  早晨8点，晚上8点
一天一次服用药物时间节点 中午12点
**/
var models = function() {
    if (!_models) {
        _models = defines.cachedModels;
    }
    return _models;
};
var callback = function(){
	console.info("send template");
};

var notifyInfo = function(sick, drugn) {
	var templateId = template_id;
	var url = '';
	var topcolor = '#FF0000'; // 顶部颜色
	var data = {
	 	first: {"value":"用药提醒"},
	 	keyword1: {"value":drugn.drug_name},
	 	keyword2: {"value":"一日" + drugn.times + "次，一次" + drugn.drug_per + "片"},
	 	keyword3: {"value":"无"},
	 	remarks: {"value":"感谢您的使用"}
	};
	drugn.save({"times": drugn.count - 1}, function(err){
		if (!err)
			console.info("minus drug times succ");
		else
			console.info("minus drug times failed");
	});
	api.sendTemplate(sick.wx_id, templateId, url, topcolor, data, callback);
}
var jobs = [];
var rule8 = later.parse.cron("0 8 * * ?");
later.setInterval(function(){
	var times_array = [4,3,2];
	for (var j = 0; j < times_array.length; j++) {
		models().drugnotify.find({times: times_array[j], count: orm.gt(0)}, function(err, data){
		if (err || data.length === 0) {
			console.info("err or no data");
		} else {
			for(var i=0;i<data.length;i++) {
				var drugn = data[i];
				models().sick.get(drugn.sick_id, function(err, sick){
					if (!err) {
						notifyInfo(sick, drugn);
					}
				});
			}
		}
    	});
	}
}, rule8);

var rule12 = later.parse.cron("0 12 * * ?");
later.setInterval(function(){
	var times_array = [4,3,1];
	for (var j = 0; j < times_array.length; j++) {
		models().drugnotify.find({times: times_array[j], count: orm.gt(0)}, function(err, data){
		if (err || data.length === 0) {
			console.info("err or no data");
		} else {
			for(var i=0;i<data.length;i++) {
				var drugn = data[i];
				models().sick.get(drugn.sick_id, function(err, sick){
					if (!err) {
						notifyInfo(sick, drugn);
					}
				});
			}
		}
    	});
	}
}, rule12);

var rule18 = later.parse.cron("0 18 * * ?");
later.setInterval(function(){
	var times_array = [3];
	for (var j = 0; j < times_array.length; j++) {
	models().drugnotify.find({times: times_array[j], count: orm.gt(0)}, function(err, data){
		if (err || data.length === 0) {
			console.info("err or no data");
		} else {
			for(var i=0;i<data.length;i++) {
				var drugn = data[i];
				models().sick.get(drugn.sick_id, function(err, sick){
					if (!err) {
						notifyInfo(sick, drugn);
					}
				});
			}
		}
    	});
	}
}, rule18);


var rule20 = later.parse.cron("0 20 * * ?");;
rule20.hour = 20;
later.setInterval(function(){
	var times_array = [4];
	for (var j = 0; j < times_array.length; j++) {
	models().drugnotify.find({times: times_array[j], count: orm.gt(0)}, function(err, data){
		if (err || data.length === 0) {
			console.info("err or no data");
		} else {
			for(var i=0;i<data.length;i++) {
				var drugn = data[i];
				models().sick.get(drugn.sick_id, function(err, sick){
					if (!err) {
						notifyInfo(sick, drugn);
					}
				});
			}
		}
    	});
	}
}, rule20);
module.exports = jobs;

