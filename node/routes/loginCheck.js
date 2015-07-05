var urls = ["/gakf/flowSick.html", "/gakf/communicate.html", "/gakf/inpatientInfo.html"];
var urlMap = {"/gakf/flowSick.html":"1", "/gakf/communicate.html":"2", "/gakf/inpatientInfo.html":"3"};
var appid = "wx9b2bbce36613b66e", redirectUrl = "http://101.200.183.229/user/callback";


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
    console.info("check");
    var path = req.originalUrl, open_id = req.cookies.wx_id, uid = req.cookies.sick_id || req.cookies.doctor_id;
    if ((!open_id || open_id == 'undefined' || !uid || uid == 'undefined') && checkUrl(path)) {
        var redirectUri = encodeURIComponent(redirectUrl);
        console.info("redirectUri=" + redirectUri);
        res.cookie('cb_key', urlMap[path], {expires: new Date(Date.now() + 900000), httpOnly: true});
        res.redirect("https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appid
            + "&redirect_uri=" + redirectUri + "&state=" + urlMap[path]
            + "&response_type=code&scope=snsapi_base#wechat_redirect");
    } else {
        next();
    }
};



module.exports = check;