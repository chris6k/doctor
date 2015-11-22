var weixin = require('weixin-apis');
var WechatAPI = require('wechat-api');
var defines = require('../db/define');
var signtool = require('weixin-signature');
var dateFormat = require('dateformat');


//wxaf3a162fe7e04d37,
//2166e5441e7412dc7ebd4111635db0b7

//test
//'wx9b2bbce36613b66e',
//'b4c3079540dd4b57269a09b5e2d36dc0'
var api = new WechatAPI('wxaf3a162fe7e04d37', '2166e5441e7412dc7ebd4111635db0b7');
var _models;
var models = function() {
    if (!_models) {
        _models = defines.cachedModels;
    }
    return _models;
};

var callback = function(err) {
    if (err) {
        console.error(err);
    } else {
        console.info("send template ok");
    }
}

var weixin_biz = function (app) {


// 微信接入配置
    weixin.configurate({
        app: app,
        token: 'guanai',
        appid: 'wxaf3a162fe7e04d37',
        secret: '2166e5441e7412dc7ebd4111635db0b7'
    });
   

    // 监听文本消息
    weixin.on('textMsg', function (data) {
        console.log('>>>>>>>>> textMsg emit >>>>>>>>>');
        console.log(data);
        if (data.content === '审核') {
            var msg = {
                toUserName: data.fromUserName,
                fromUserName: data.toUserName,
                msgType: 'text',
                content: ''
            };
            models().doctor.find({"wx_id":data.fromUserName}, function(err, da){
                if (err || da.length==0) {
                    console.error(err);
                    msg.content = "医生账户未绑定微信，请登录";
                    console.log(msg);
                    weixin.sendMsg(msg);
                } else {
                    models().sickRequest.find({"doctorId": da[0].id, "status":"f"}, function(err, da2){
                        if (err) {
                            console.error(err);
                            msg.content="抱歉，暂时无法提供服务";
                            console.log(msg);
                            weixin.sendMsg(msg);
                        } else if (da2.length == 0) {
                            msg.content = "暂时没有需要审核的患者";
                            weixin.sendMsg(msg);
                        } else {
                            for (var i = 0; i< da2.length; i++) {
                                msg.content += "患者(" + da2[i].sickName + ")申请成为您的患者\n";
                            }
                            
                            msg.content += "请回复‘同意+患者姓名'审核通过，回复'拒绝+患者姓名'拒绝请求";
                            
                            weixin.sendMsg(msg);
                        }
                    });
                }
            });
            

        } else if (data.content.indexOf("同意") == 0) {
            var name = data.content.slice(2);
            var msg = {
                        toUserName: data.fromUserName,
                        fromUserName: data.toUserName,
                        msgType: 'text',
                        content: "操作失败，暂时无法审核，请稍候再试"
                    };
            console.info("sick name = " + name);
            models().doctor.find({wx_id: data.fromUserName}, function(err, dat) {
                if (err || dat.length === 0) {
                    weixin.sendMsg(msg);
                } else {
                    models().sickRequest.find({doctorId: dat[0].id, sickName: name, status:'f'}, function(err, dat2){
                        if (err) {
                            weixin.sendMsg(msg);
                        } else if (dat2.length === 0) {
                            msg.content = "找不到该患者的审核申请";
                            weixin.sendMsg(msg);
                        } else {
                            dat2[0].save({status:'t'});
                            models().sick.get(dat2[0].sickId, function(err, sick) {
                                if (err || !sick) {
                                    msg.content="找不到该患者的信息";
                                    weixin.sendMsg(msg);
                                } else {
                                    sick.save({status:'t'}, function(err){
                                        if (err) {
                                            weixin.sendMsg(msg);
                                        } else {
                                            models().sick_notify.create({
                                                "sick_id" : sick.id,
                                                "day" : 1,
                                                "wx_id" : sick.wx_id,
                                                "status" : 1
                                            }, function(err){
                                                if (!err) {
                                                    notifyOneDay(sick.wx_id);
                                                } else {
                                                    console.error(err);
                                                }
                                            });
                                            if (sick.wx_id) {
                                                var templateId = "qYe34Nu4PM505KmbFaduJ3bf82hcgmNDtczROaDOCAU";
                                                var url = 'http://www.guanaikangfu.com/gakf/video.html';
                                                var topcolor = '#FF0000'; // 顶部颜色
                                                var datetime = new Date();
                                                var data = {
                                                    "first": {"value":"医生审核通过"},
                                                    "keyword1": {"value":"医生通过了您的申请"},
                                                    "keyword2": {"value":dat[0].name},
                                                    "keyword3" :{"value":dateFormat(datetime,"yyyy/mm/dd hh:MM:ss")},
                                                    "remarks":{"value":""}
                                                };
                                                api.sendTemplate(sick.wx_id, templateId, "", topcolor, data, function(err){
                                                    console.info(err||'ok');
                                                });
                                                // 视频模板
                                                templateId = "_hpYqESfjPoRF45jEmSoKSVs49NFU5h1DkSQoE73RAY";
                                                data = {
                                                    first: {"value":"帮助视频"},
                                                    keyword1: {"value":"给您的帮助视频，请点击观看"},
                                                    keyword2: {"value":dateFormat(datetime,"yyyy/mm/dd hh:MM:ss")},
                                                    remarks: {"value":"请点击观看"}
                                                };
                                                api.sendTemplate(sick.wx_id, templateId, url, topcolor,data,function(err){
                                                    console.info(err||'ok');
                                                });
                                            }
                                            msg.content="操作成功";
                                            weixin.sendMsg(msg);
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
            
        } else if (data.content.indexOf("拒绝") == 0) {
            var name = data.content.slice(2);
            var msg = {
                        toUserName: data.fromUserName,
                        fromUserName: data.toUserName,
                        msgType: 'text',
                        content: "操作失败，暂时无法审核，请稍候再试"
                    };
            console.info("sick name = " + name);
            models().doctor.find({wx_id: data.fromUserName}, function(err, dat) {
                if (err || dat.length === 0) {
                    weixin.sendMsg(msg);
                } else {
                    models().sickRequest.find({doctorId: dat[0].id, sickName: name}, function(err, dat2){
                        if (err) {
                            weixin.sendMsg(msg);
                        } else if (dat2.length === 0) {
                            msg.content = "找不到该患者的审核申请";
                            weixin.sendMsg(msg);
                        } else {
                            dat2[0].save({status:'t'});
                            models().sick.get(dat2[0].sickId, function(err, sick) {
                                if (err || !sick) {
                                    msg.content="找不到该患者的信息";
                                    weixin.sendMsg(msg);
                                } else {
                                    sick.save({status:'f'}, function(err){
                                        if (err) {
                                            weixin.sendMsg(msg);
                                        } else {
                                            msg.content="操作成功";
                                            weixin.sendMsg(msg);
                                        }
                                    });
                                    if (sick.wx_id) {
                                        var templateId = "-Vyr7il3acv0WRMneuSANWib1wCcB4c9WWnWL1JL1-w";
                                        var url = '';
                                        var topcolor = '#FF0000'; // 顶部颜色
                                        var datetime = new Date();
                                        var data = {
                                            "first": {"value":"医生审核未通过"},
                                            "keyword1": {"value": dat[0].name},
                                            "keyword2": {"value": "无"},
                                            "keyword3" :{"value": "无"},
                                            "keyword4" :{"value" : "医生拒绝了您的申请"},
                                            "remarks":{"value": ""}
                                        };
                                        api.sendTemplate(sick.wx_id, templateId, "", topcolor, data, function(err){
                                            console.info(err||'ok');
                                        });
                                    }
                                }
                            });
                        }
                    });
                }
            });
            
        } else {
            var articles = [];
            articles[0] = {
            title: "欢迎使用关艾康复微信平台",
            description: "使用入门",
            picUrl: "http://www.guanaikangfu.com/gakf/static/images/help.jpg",
            url: "http://www.guanaikangfu.com/gakf/help.html"
            };
            var msg = {
                toUserName: data.fromUserName,
                fromUserName: data.toUserName,
                msgType: 'news',
                articles: articles
            };
            weixin.sendMsg(msg);
        }
        
    });

// 监听图片消息
    weixin.on('imageMsg', function (data) {
        console.log('>>>>>>>>> imageMsg emit >>>>>>>>>');
        console.log(data);
    });

// 监听语音消息
    weixin.on('voiceMsg', function (data) {
        console.log('>>>>>>>>> voiceMsg emit >>>>>>>>>');
        console.log(data);
    });

// 监听视频消息
    weixin.on('videoMsg', function (data) {
        console.log('>>>>>>>>> videoMsg emit >>>>>>>>>');
        console.log(data);
    });

// 监听地理位置消息
    weixin.on('locationMsg', function (data) {
        console.log('>>>>>>>>> locationMsg emit >>>>>>>>>');
        console.log(data);
    });

// 监听链接消息
    weixin.on('linkMsg', function (data) {
        console.log('>>>>>>>>> linkMsg emit >>>>>>>>>');
        console.log(data);
    });

// 监听关注事件
    weixin.on('subscribeEventMsg', function (data) {
        console.log('>>>>>>>>> subscribeEventMsg emit >>>>>>>>>');
        console.log(data);
        var articles = [];
        articles[0] = {
            title: "欢迎使用关艾康复微信平台",
            description: "使用入门",
            picUrl: "http://www.guanaikangfu.com/gakf/static/images/help.jpg",
            url: "http://www.guanaikangfu.com/gakf/help.html"
        };
        var msg = {
            toUserName: data.fromUserName,
            fromUserName: data.toUserName,
            msgType: 'news',
            articles: articles
        };
        weixin.sendMsg(msg);
    });

// 监听取消关注事件
    weixin.on('unsubscribeEventMsg', function (data) {
        console.log('>>>>>>>>> unsubscribeEventMsg emit >>>>>>>>>');
        console.log(data);
        //todo
    });

// 扫描带参数二维码事件
// 2. 用户已关注时的事件推送
    weixin.on("scanEventMsg", function (data) {
        console.log('>>>>>>>>> scanEventMsg emit >>>>>>>>>');
        console.log(data);
        var articles = [];
        articles[0] = {
            title: "欢迎使用关艾康复微信平台",
            description: "使用入门",
            picUrl: "http://www.guanaikangfu.com/gakf/static/images/help.jpg",
            url: "http://www.guanaikangfu.com/gakf/help.html"
        };
        var msg = {
            toUserName: data.fromUserName,
            fromUserName: data.toUserName,
            msgType: 'news',
            articles: articles
        };
        weixin.sendMsg(msg);
    });

// 监听上报地理位置事件
    weixin.on('locationEventMsg', function (data) {
        console.log('>>>>>>>>> locationEventMsg emit >>>>>>>>>');
        console.log(data);
    });

// // 监听点击菜单拉取消息时的事件推送
//     weixin.on('clickEventMsg', function (data) {
//         console.log('>>>>>>>>> clickEventMsg emit >>>>>>>>>');
//         console.log(data);
//     });

// 监听点击菜单跳转链接时的事件推送
    weixin.on('viewEventMsg', function (data) {
        console.log('>>>>>>>>> viewEventMsg emit >>>>>>>>>');
        console.log(data);
    });
   
    weixin.on("templateSendJobFinishEventMsg", function(data){
         console.log('>>>>>>> TEMPLATESENDJOBFINISH emit >>>>>>>>');
         console.log(data);
         weixin.sendMsg("success");
    });

};

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


var notifyOneDay = function(wx_id) {
    var templateId = "_hpYqESfjPoRF45jEmSoKSVs49NFU5h1DkSQoE73RAY";
    var sick_day = 1;
    var day = sick_day + '_1';
    var url = 'http://www.guanaikangfu.com/gakf/day.html?day=' + day;
    var topcolor = '#FF0000'; // 顶部颜色
    var datetime = new Date();
    var data = {
        first: {"value":"健康小贴士，第 "+sick_day+" 天 " + articleList[day]},
        keyword1: {"value":"给您的健康小贴士，请点击阅读"},
        keyword2: {"value":dateFormat(datetime,"yyyy/mm/dd hh:MM:ss")},
        remarks: {"value":"请点击阅读"}
    };

   
    if (wx_id) {
            api.sendTemplate(wx_id, templateId, url, topcolor,data,callback);
            var day2 = sick_day + '_2';
            url = 'http://www.guanaikangfu.com/gakf/day.html?day=' + day2;
            data.first.value = "健康小贴士，第 "+ sick_day +" 天 "+ articleList[day2];
            api.sendTemplate(wx_id, templateId, url, topcolor,data,callback);
    }

    
    
};

weixin_biz.api = api;
weixin_biz.weixin = weixin;
module.exports = weixin_biz;

