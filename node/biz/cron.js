var schedule = require('node-schedule');
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
	 	first: "用药提醒",
	 	keyword1: drugn.drug_name,
	 	keyword2: "一日" + drugn.times + "次，一次" + drugn.drug_per + "片",
	 	keyword3: "无",
	 	remarks:"感谢您的使用"
	};
	drugn.save({"times": drugn.times - 1}, function(err){
		if (!err)
			console.info("minus drug times succ");
		else
			console.info("minus drug times failed");
	});
	api.sendTemplate(sick.wx_id, templateId, url, topColor, data, callback);
}
var jobs = [];
var job8 = schedule.scheduleJob('0 0 8 * * ?', function(){
	var times_array = [4,3,2];
	for (var j = 0; j < times_array.length; j++) {
		_models.drugnotify.find({times: times_array[j], count: orm.gt(0)}, function(err, data){
		if (err || data.length === 0) {
			console.info("err or no data");
		} else {
			for(var i=0;i<data.length;i++) {
				var drugn = data[i];
				_models.sick.get(drugn.sick_id, function(err, sick){
					if (!err) {
						notifyInfo(sick, drugn);
					}
				});
			}
		}
    	});
	}
  });
jobs.push(job8);

var job12 = schedule.scheduleJob('0 0 12 * * ?', function(){
	var times_array = [4,3,1];
	for (var j = 0; j < times_array.length; j++) {
		_models.drugnotify.find({times: times_array[j], count: orm.gt(0)}, function(err, data){
		if (err || data.length === 0) {
			console.info("err or no data");
		} else {
			for(var i=0;i<data.length;i++) {
				var drugn = data[i];
				_models.sick.get(drugn.sick_id, function(err, sick){
					if (!err) {
						notifyInfo(sick, drugn);
					}
				});
			}
		}
    	});
	}
    
  });
jobs.push(job12);

var job18 = schedule.scheduleJob('0 0 18 * * ?', function(){
	var times_array = [3];
	for (var j = 0; j < times_array.length; j++) {
	_models.drugnotify.find({times: times_array[j], count: orm.gt(0)}, function(err, data){
		if (err || data.length === 0) {
			console.info("err or no data");
		} else {
			for(var i=0;i<data.length;i++) {
				var drugn = data[i];
				_models.sick.get(drugn.sick_id, function(err, sick){
					if (!err) {
						notifyInfo(sick, drugn);
					}
				});
			}
		}
    	});
	}
  });
jobs.push(job18);

var job20 = schedule.scheduleJob('0 0 20 * * ?', function(){
	var times_array = [4];
	for (var j = 0; j < times_array.length; j++) {
	_models.drugnotify.find({times: times_array[j], count: orm.gt(0)}, function(err, data){
		if (err || data.length === 0) {
			console.info("err or no data");
		} else {
			for(var i=0;i<data.length;i++) {
				var drugn = data[i];
				_models.sick.get(drugn.sick_id, function(err, sick){
					if (!err) {
						notifyInfo(sick, drugn);
					}
				});
			}
		}
    	});
	}

  });
jobs.push(job20);
module.exports = jobs;

