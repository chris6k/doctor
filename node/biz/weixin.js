var weixin = require('weixin-apis');

var weixin_biz = function (app) {
// 微信接入配置
    weixin.configurate({
        app: app,
        token: 'guanai',
        appid: 'wxaf3a162fe7e04d37',//'wx9b2bbce36613b66e',
        secret: '2166e5441e7412dc7ebd4111635db0b7'//'b4c3079540dd4b57269a09b5e2d36dc0'
    });

    // 监听文本消息
    weixin.on('textMsg', function (data) {
        console.log('>>>>>>>>> textMsg emit >>>>>>>>>');
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
        console.log(msg);
        weixin.sendMsg(msg);
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