var urlMap = {'/gakf/flowSick.html':'1', '/gakf/communicate.html':'2', '/gakf/inpatientInfo.html':'3',
'/gakf/setting.html':'4', '/gakf/pills.html':'5', '/gakf/sickDetail.html' : '6', '/gakf/sick.html' : '7', '/gakf/account.html' : '8', '/gakf/reject.html' : '9'};
var appid = 'wxaf3a162fe7e04d37', redirectUrl = 'http://www.guanaikangfu.com/user/callback';

//todo
var unverifyUrl = '/gakf/msg.html';
var loginUrl = '/gakf/login.html';

var checkUrl = function(path) {
    path = path || "";
    var idx = path.indexOf("?");
    path = path.substring(0, idx <= 0 ? path.length : idx);
    console.info("checkUrl.path=" + path);
    if (urlMap[path]) {
        return true;
    } 
    return false;
};

var getCb = function(code) {
    for(var key in urlMap) {
        if (urlMap[key] == code) {
            return key;
        }
    }
    return null;
};

var check = function (req, res, next) {
    console.log("check in");
    var path = req.originalUrl;
    var open_id = req.cookies.wx_id;
    var uid = req.cookies.sick_id || req.cookies.doctor_id;
    var status = req.cookies.status;
    var type = req.cookies.type;
    var missInfo = !open_id || open_id === 'undefined' || !uid || uid === 'undefined' 
    || !status || status === 'undefined' || !type || type === 'undefined';
    var expiresTime = 360*24*3600*1000;
    console.log("path=" + path + ",checkUrl=" + checkUrl(path));
    console.log("missinfo=" + missInfo);
    if (checkUrl(path)) {
        if (missInfo) {
            var redirectUri = encodeURIComponent(redirectUrl);
            console.info('redirectUri=' + redirectUri);
            res.cookie('cb_key', urlMap[path], {expires: new Date(Date.now() + expiresTime), httpOnly: false});
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
                    res.cookie('status', sick.status, {expires: new Date(Date.now() + expiresTime), httpOnly: false});
                    next();
                    return;
                }
                if (sick.status === 'f'){
                    res.cookie('status', sick.status, {expires: new Date(Date.now() + expiresTime), httpOnly: false});
                    res.redirect(loginUrl);
                    return;
                }
                res.redirect(unverifyUrl + "?doctor_name=" + encodeURIComponent(sick.doctor_name));
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

var loginCheck = {};
loginCheck.check = check;
loginCheck.getCb = getCb;

module.exports = loginCheck;
