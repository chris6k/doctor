var checkUrl = ["", "", ""];
var appid = "wxaf3a162fe7e04d37", redirectUrl = "http://guanaikangfu.com/user/callback?cb=";
check = function (req, res, next) {
    var path = req.originalUrl, needAuth = false, open_id = !req.cookies.open_id;
    for (var url in checkUrl) {
        if (path === url) {
            needAuth = true;
            break;
        }
    }
    if (needAuth && !open_id) {
        res.redirect("https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appid
            + "&redirect_uri=" + encodeURIComponent(redirectUrl + "?cb=" + encodeURIComponent(path))
            + "&response_type=code&scope=snsapi_base#wechat_redirect");
    }
    next();
};

module.exports = check;