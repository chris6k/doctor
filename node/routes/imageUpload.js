var express = require("express");
var router = express.Router();
var result = require("./result");

router.post("/upload", function (req, res, next) {
    //生成multiparty对象，并配置下载目标路径
    var form = new multiparty.Form({uploadDir: './public/images/'});
    //下载后处理
    form.parse(req, function (err, fields, files) {
        if (err) {
            console.log('parse image error: ' + err);
            res.json(result(false, err.msg, err));
        } else {
            var filesTmp = JSON.stringify(files, null, 2);
            console.log('parse files: ' + filesTmp);
            pic = files.inputFile[0].path;
            res.json(result(true, '', pic));
        }
    });
});

module.exports = router;