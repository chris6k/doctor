var express = require('express');
var router = express.Router();
var result = require('./result');
//TODO
var source_url = {sick: '', doctor: ''};
var target_url = {sick: '', doctor: ''};


router.post('/speak', function (req, res, next) {
    //生成multiparty对象，并配置下载目标路径
    var form = new multiparty.Form({uploadDir: './public/images/'});
    //下载后处理
    form.parse(req, function (err, fields, files) {
        var filesTmp = JSON.stringify(files, null, 2);
        var session_id, sick_id, doctor_id, name, id, content, title, type;
        try {
            session_id = fields['session_id'];
            sick_id = fields['sick_id'];
            doctor_id = fields['doctor_id'];
            name = fields['name'];
            content = fields['content'];
            title = fields['title'];
            id = sick_id || doctor_id;
            type = sick_id ? "sick" : "doctor";
        } catch (e) {
            console.error(e);
            err = e;
        }
        if (err) {
            console.log('parse image error: ' + err);
            res.redirect(source_url[type] + "?err=1");
        } else {
            console.log('parse files: ' + filesTmp);
            var pic = [];
            for (var i = 0; i < files.inputFile.length; i++) {
                pic[i] = files.inputFile[i].path;
            }

            if (!session_id) {
                req.models.message_session.create({day: new Date(), sick_id: id}, function (err, item) {
                    req.models.message.create({
                        session_id: item.id,
                        day: new Date(),
                        title: title,
                        content: content,
                        speaker: name,
                        speaker_id: id
                    }, function (err, items) {
                        if (err) {
                            res.redirect(source_url[type] + "?err=2");
                        } else {
                            res.redirect(target_url[type]);
                        }
                    });
                });
            } else {
                req.models.message.create({
                    session_id: session_id,
                    day: new Date(),
                    title: title,
                    content: content,
                    speaker: name,
                    speaker_id: id
                }, function (err, item) {
                    if (err) {
                        res.redirect(source_url[type] + "?err=2");
                    } else {
                        res.redirect(target_url[type]);
                    }
                });
            }
        }
    });

});

module.exports = router;