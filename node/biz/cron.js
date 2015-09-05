var later = require('later');
var defines = require('../db/define');
var api = require('./weixin').api;
var orm = require('orm');
var dateFormat = require('dateformat');
var _models;
var template_id = 'F1kjgyVBU1K3JV-Vg0iPselzU7Ox9IOrRPMoY7cxx0M';
var articleList = {
	"1_1":"什么是关节置换术",
	"1_2":"入院后需要做哪些影像学检查",
	"2_1":"得了什么病需要关节置换术",
	"2_2":"哪种关节置换人工材料最适合我",
	"3_1":"什么是静脉血栓栓塞症",
	"3_2":"我会不会得静脉血栓栓塞症",
	"3_3":"静脉血栓栓塞症的危害",
	"4_1":"术前心理干预",
	"4_2":"术后尽早进行功能恢复训练",
	"5_1":"术后应该注意什么",
	"5_2":"术后积极药物抗感染",
	"6_1":"术后如何预防静脉血栓栓塞症",
	"6_2":"新型口服抗凝药优势大",
	"7_1":"如何有效进行术后恢复锻炼",
	"7_2":"术后随访切莫忘",
	"8_1":"术后积极预防静脉血栓栓塞症",
	"8_2":"术后心理干预",
	"9_1":"小心术后便秘",
	"9_2":"术后合理饮食防便秘",
	"10_1":"膝关节功能HSS评分",
	"10_2":"髋关节功能Harris评分"
};
/**
 一天四次，早上8点，中午12点，下午4点，晚上8点
一天三次 发送时间节点  早晨8点，中午12点，晚上6点
一天两次 发送时间节点  早晨8点，晚上8点
一天一次服用药物时间节点 中午12点
**/
later.date.localTime();
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
	drugn.save({"count": drugn.count - 1}, function(err){
		if (!err)
			console.info("minus drug times succ");
		else
			console.info("minus drug times failed");
	});
	api.sendTemplate(sick.wx_id, templateId, url, topcolor, data, callback);
}

var notifySick = function(sick) {
	var templateId = "_hpYqESfjPoRF45jEmSoKSVs49NFU5h1DkSQoE73RAY";
	var sick_day = sick.day;
	var day = sick_day + '_1';
	var url = 'http://www.guanaikangfu.com/gakf/day.html?day=' + day;
	var topcolor = '#FF0000'; // 顶部颜色
	var datetime = new Date();
	var data = {
	 	first: {"value":"健康小贴士，第 "+sick.day+" 天 " + articleList[day]},
	 	keyword1: {"value":"给您的健康小贴士，请点击阅读"},
	 	keyword2: {"value":dateFormat(datetime,"yyyy/mm/dd hh:MM:ss")},
	 	remarks: {"value":"请点击阅读"}
	};

	models().sick.get(sick.sick_id, function(err, sick_item){
		if (!err && sick_item) {
				api.sendTemplate(sick_item.wx_id, templateId, url, topcolor,data,callback);
				day = sick_day + '_2';
				url = 'http://www.guanaikangfu.com/gakf/day.html?day=' + day;
				data.first.value = "健康小贴士，第 "+ sick_day +" 天 "+ articleList[day];
				api.sendTemplate(sick_item.wx_id, templateId, url, topcolor,data,callback);

				if(sick_day == "3"){
					day = sick_day + '_3';
					url = 'http://www.guanaikangfu.com/gakf/day.html?day=' + day;
					data.first.value = "健康小贴士，第 "+ sick_day +" 天 " + articleList[day];
					api.sendTemplate(sick_item.wx_id, templateId, url, topcolor,data,callback);
				}
		}

	});

	
	
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


var rule20 = later.parse.cron("0 20 * * ?");
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

var ruleDay = later.parse.cron("0 10 * * ?");
later.setInterval(function(){
	models().sick_notify.find({"status":1}, function(err, data){
		if (err || !data) {
			console.error("err or no data");
		} else {
			for (var i=0;i<data.length;i++) {
				var item = data[i];
				if (item.day >= 11) {
					item.save({"status":0},function(err){
						console.info(err || "ok");
					});
				} else {
					notifySick(item);
					item.save({"day": item.day + 1}, function(err){
					console.info(err||"ok");
					});
				}
			}
		}
	});
}, ruleDay);

module.exports = jobs;

