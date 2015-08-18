var urls = ['/gakf/flowSick.html', '/gakf/communicate.html', '/gakf/inpatientInfo.html', '/gakf/setting.html', '/gakf/pills.html'];
var urlMap = {'/gakf/flowSick.html':'1', '/gakf/communicate.html':'2', '/gakf/inpatientInfo.html':'3','/gakf/setting.html':'4', '/gakf/pills.html':'5'};
var appid = 'wxaf3a162fe7e04d37', redirectUrl = 'http://www.guanaikangfu.com/user/callback';
//todo
var unverifyUrl = '/gakf/msg.html';
var loginUrl = '/gakf/login.html';

var checkUrl = function(path) {
    for (var i = 0;i<urls.length;i++) {
        var url = urls[i];
        if (path === url) {
            return true;
        }
    }
    return false;
}

var check = function (req, res, next) {
    console.log("check in");
    var path = req.originalUrl;
    var open_id = req.cookies.wx_id;
    var uid = req.cookies.sick_id || req.cookies.doctor_id;
    var status = req.cookies.status;
    var type = req.cookies.type;
    var missInfo = !open_id || open_id === 'undefined' || !uid || uid === 'undefined' 
    || !status || status === 'undefined' || !type || type === 'undefined';

    console.log("path=" + path + ",checkUrl=" + checkUrl(path));
    console.log("missinfo=" + missInfo);

    if (checkUrl(path)) {
        if (missInfo) {
            var redirectUri = encodeURIComponent(redirectUrl);
            console.info('redirectUri=' + redirectUri);
            res.cookie('cb_key', urlMap[path], {expires: new Date(Date.now() + 900000), httpOnly: false});
            res.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid
                + '&redirect_uri=' + redirectUri + '&state=' + urlMap[path]
                + '&response_type=code&scope=snsapi_base#wechat_redirect');
        } else if (status === 'u' && type === 'sick') {
            req.models.sick.get(uid, function(err, sick){
                if (err){
                    res.redirect(loginUrl);
                    return;
                }
                if (sick.status === 't'){
                    res.cookie('status', sick.status, {expires: new Date(Date.now() + 900000), httpOnly: false});
                    next();
                    return;
                }
                if (sick.status === 'f'){
                    res.cookie('status', sick.status, {expires: new Date(Date.now() + 900000), httpOnly: false});
                    res.redirect(loginUrl);
                    return;
                }
                res.redirect(unverifyUrl);
            });
        } else if (status === 'f') {
            res.redirect(loginUrl);
        } else {
            next();
        }
    } else {
        next();
    }
};



module.exports = check;