var weixin = require('weixin-apis');
var WechatAPI = require('wechat-api');
var defines = require('../db/define');


var api = new WechatAPI('wx9b2bbce36613b66e', 'b4c3079540dd4b57269a09b5e2d36dc0');
var _models;
var models = function() {
    if (!_models) {
        _models = defines.cachedModels;
    }
    return _models;
};

var weixin_biz = function (app) {


// 微信接入配置
    weixin.configurate({
        app: app,
        token: 'guanai',
        appid: 'wx9b2bbce36613b66e',//'wx9b2bbce36613b66e',
        secret: 'b4c3079540dd4b57269a09b5e2d36dc0'//'b4c3079540dd4b57269a09b5e2d36dc0'
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
                            msg.content = "暂时没有需要审核的病人";
                            weixin.sendMsg(msg);
                        } else {
                            for (var i = 0; i< da2.length; i++) {
                                msg.content += "病人[" + da2[i].sickName + "]申请成为您的病人\n";
                            }
                            
                            msg.content += "请回复‘同意+病人姓名'审核通过，回复'拒绝+病人姓名'拒绝请求";
                            
                            weixin.sendMsg(msg);
                        }
                    });
                }
            });
            
            
            // console.log(msg);
            // weixin.sendMsg(msg);
            // api.sendText(data.fromUserName, "hello world", function(err){
            //     console.error(err)
            // });

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
                    models().sickRequest.find({doctorId: dat[0].id, sickName: name}, function(err, dat2){
                        if (err) {
                            weixin.sendMsg(msg);
                        } else if (dat2.length === 0) {
                            msg.content = "找不到该病人的审核申请";
                            weixin.sendMsg(msg);
                        } else {
                            dat2[0].save({status:'t'});
                            models().sick.get(dat2[0].sickId, function(err, sick) {
                                if (err || !sick) {
                                    msg.content="找不到该病人的信息";
                                    weixin.sendMsg(msg);
                                } else {
                                    sick.save({status:'t'}, function(err){
                                        if (err) {
                                            weixin.sendMsg(msg);
                                        } else {
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
                        if (err || dat2.length == 0) {
                            weixin.sendMsg(msg);
                        } else {
                            models().sick.get(dat2[0].sickId, function(err, sick) {
                                if (err || !sick) {
                                    msg.content="找不到该病人的信息";
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
                                }
                            });
                        }
                    });
                }
            });
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
            title: "欢迎使用XXX",
            description: "使用入门",
            picUrl: "http://cms.csdnimg.cn/article/201404/01/5339fcde7d200.jpg",
            url: "http://www.csdn.net/article/2014-04-01/2819079-9-soft-skills-every-web-developer-should-master"
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
            title: "欢迎使用XXX",
            description: "使用入门",
            picUrl: "http://cms.csdnimg.cn/article/201404/01/5339fcde7d200.jpg",
            url: "http://www.csdn.net/article/2014-04-01/2819079-9-soft-skills-every-web-developer-should-master"
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

// 监听点击菜单拉取消息时的事件推送
    weixin.on('clickEventMsg', function (data) {
        console.log('>>>>>>>>> clickEventMsg emit >>>>>>>>>');
        console.log(data);
    });

// 监听点击菜单跳转链接时的事件推送
    weixin.on('viewEventMsg', function (data) {
        console.log('>>>>>>>>> viewEventMsg emit >>>>>>>>>');
        console.log(data);
    });
};
module.exports = weixin_biz;
