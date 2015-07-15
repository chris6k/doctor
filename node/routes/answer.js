var express = require('express');
var router = express.Router();
var result = require('./result');
//TODO
var source_url = {sick: '/gakf/askDoctor.html', doctor: '/gakf/question.html'};
var target_url = {sick: '/gakf/communicate.html', doctor: '/gakf/communicate.html'};

router.get('/message', function (req, res, next) {
    var session_id = req.param('session_id');
    var pageNo = req.param('page_no') || 0;
    var pageSize = req.param('page_no') || 10;
    req.models.message.find({session_id: session_id}).order("-id")
        .limit(pageSize).offset(pageNo * pageSize).run(function (err, data) {
            if (err) {
                res.json(result(false, '', err));
            } else {
                res.json(result(true, '', data));
            }
        });
});

router.get('/session', function (req, res, next) {
    var sick_id = req.param('sick_id');
    var doctor_id = req.param('doctor_id');
    var pageNo = req.param('page_no') || 0, pageSize = req.param('page_size') || 10;
    console.info('sick_id=' + sick_id + ",doctor_id=" + doctor_id
        + ",page_no=" + pageNo + ",pageSize=" + pageSize);
    var query = {};
    if (sick_id) {
        query.sick_id = sick_id;
    }
    if (doctor_id) {
        query.doctor_id = doctor_id;
    }
    req.models.message_session.find(query).order("-id").limit(pageSize).offset(pageNo * pageSize)
        .run(function (err, data) {
            if (err) {
                res.json(result(false, '', {}));
            } else {
                res.json(result(true, '', data));
            }
        });
});

router.post('/speak', function (req, res, next) {
    var session_id, sick_id, doctor_id, name, id, content, title, type, err, pic;
    try {
        session_id = req.param('session_id');
        sick_id = req.param('sick_id');
        doctor_id = req.param('doctor_id');
        name = req.param('name');
        content = req.param('content');
        title = req.param('title');
        pic = req.param('pics');
        if (!(pic instanceof Array)) {
            var temp = [];
            temp = pic.split(",");
            pic=temp;
        }
        id = doctor_id || sick_id;
        type = doctor_id ? "doctor" : "sick";
    } catch (e) {
        console.error(e);
        err = e;
    }
    if (err) {
        console.log('parse image error: ' + err);
        res.redirect(source_url[type] + "?err=1&id=" + id);
    } else {

        req.models[type].get(id, function(err, info){
            name = name || info.name;
            doctor_id = doctor_id || info.doctor_id || info.id;
        if (!session_id) {
            var msg = {
                day: new Date(),
                title: title,
                content: content,
                speaker: name,
                speaker_id: id,
                pics: pic,
                type:type
            };

            req.models.message_session.create({
                day: new Date(),
                sick_id: sick_id||'',
                doctor_id: doctor_id,
                message: msg,
                type:type
            }, function (err, item) {
                if (err) {
                    console.error(err);
                    res.redirect(source_url[type] + "?err=3&id=" + id);
                    return;
                }
                msg.session_id = item.id;
                req.models.message.create(msg, function (err) {
                    if (err) {
                        res.redirect(source_url[type] + "?err=2&id=" + id);
                    } else {
                        res.redirect(target_url[type] + "?id=" + id);
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
                speaker_id: id,
                pics: pic
            }, function (err, item) {
                if (err) {
                    res.redirect(source_url[type] + "?err=2&id=" + id);
                } else {
                    res.redirect(target_url[type] + "?id=" + id);
                }
            });
        }  
        });

        
    }


});

module.exports = router;