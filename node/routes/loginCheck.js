var urls = ["/gakf/flowSick.html", "/gakf/communicate.html", "/gakf/inpatientInfo.html"];
var appid = "wx9b2bbce36613b66e", redirectUrl = "http://101.200.183.229/user/callback?cb=";


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
    var path = req.originalUrl, open_id = req.cookies.wx_id;
    if (!open_id && checkUrl(path)) {
        var redirectUri = encodeURIComponent(redirectUrl + encodeURIComponent(path));
        console.info("redirectUri=" + redirectUri);
        res.redirect("https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appid
            + "&redirect_uri=" + redirectUri
            + "&response_type=code&scope=snsapi_base#wechat_redirect");
    } else {
        next();
    }
};



module.exports = check;