var express = require('express');
var router = express.Router();
var result = require('./result');
var orm = require('orm');
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');
//Todo
var source_url = {check: '/gakf/addCheck.html', review: '/gakf/sickDetail.html'};
var target_url = {check: '/gakf/check.html', review: '/gakf/flowSick.html'};
var api = require('../biz/weixin').api;
//根据ID获取医生信息
router.get('/info', function (req, res, next) {
    var doctor_id = req.param('doctor_id');
    req.models.doctor.get(doctor_id, function (err, item) {
        if (err || !item) {
            res.json(result(false, err.msg, {}));
        } else {
            res.json(result(true, '', item));
        }
    });
});

var notifySickReview = function(sick, description) {
    var templateId = "efwRQEhVPatDcf8alBKFbSirQ2NzZOQgtDNlYyGHWbc";
    var url = '';
    var topcolor = '#FF0000'; // 顶部颜色
    /*
    {{first.DATA}}
    患者姓名：{{keyword1.DATA}}
    预约时间：{{keyword2.DATA}}
    提醒事项：{{keyword3.DATA}}
    医生信息：{{keyword4.DATA}}
    {{remark.DATA}}
    */
    var data = {
        first: {"value":"您好，您的随访预约临近"},
        keyword1: {"value":sick.name},
        keyword2: {"value":"近期"},
        keyword3: {"value":sick.doctor_name + "医生邀请您来医院参加随访"},
        remarks: {"value":description}
    };
    api.sendTemplate(sick.wx_id, templateId, url, topcolor, data, function(err){
        console.info(err || "ok");
    });
}

var findForArea = function(req, res, doctor_id, callback) {
    req.models.hospitalDoctor.find({"doctor_id":doctor_id}, function(err, doctors){
        if (err || !doctors || doctors.length == 0) {
            res.json(result(false,'no such doctor',err));
        } else {
            var name = doctors[0].name;
            var area = doctors[0].area;
            console.info("name=" + name + ", area=" + area);
            req.models.hospitalDoctor.find({"area":area, "name":name}, function(err, others){
                if (err || !others) {
                    res.json(result(false,'get data error', err));
                } else {
                    var ids = [];
                    for (var i = 0; i < others.length; i++) {
                        ids.push(others[i].doctor_id);
                    }
                    callback(ids);
                }
            });
        }
    });
}

//获取出院的病人
router.get('/out_sicks', function (req, res, next) {
    var doctor_id = req.param('doctor_id');
    if (!doctor_id) {
        res.json(result(false, 'no doctor_id', {}));
        return;
    }
    var getSick = function(ids) {
        var sick_array = [];
        req.models.sick.find({
            doctor_id: ids,
            out_day: orm.lte(new Date())
        }, function (err, data) {
            if (err || !data) {
                console.error(err);
                res.json(result(false, '', {}));
            } else {
                for (var i = 0; i< data.length; i++) {
                    data[i].out_dur = data[i].out_duration();
                    sick_array.push(data[i]);
                }
                req.models.sick.find({
                    status: 't',
                    doctor_id : ids,
                    in_day: null,
                }, function(err, data2) {
                    if (err || !data) {
                        res.json(result(true, '', sick_array));
                    } else {
                        for (var i = 0; i < data2.length; i++) {
                            data2[i].out_dur = 0;
                            sick_array.push(data2[i]);
                        }
                        res.json(result(true, '', sick_array));
                    }
                });
               
            }
        });
    };
    findForArea(req,res,doctor_id,getSick);
});

//获取入院的病人
router.get('/in_sicks', function (req, res, next) {
    var doctor_id = req.param('doctor_id');
    if (!doctor_id) {
        res.json(result(false, 'no doctor_id', {}));
        return;
    }
    findForArea(req,res,doctor_id,function(ids){
        req.models.sick.find({
            status:'t',
            doctor_id: ids,
            in_day: orm.lte(new Date()),
            out_day: orm.gte(new Date())
        }, function (err, data) {
            if (err || !data) {
                console.error(err);
                res.json(result(false, '', {}));
            } else {
                for (var i = 0; i< data.length; i++) {
                    data[i].in_dur = data[i].in_duration();
                }
                res.json(result(true, '', data));
            }
        });
    });
});

//获取该医生所有的病人
router.get('/sicks', function (req, res, next) {
    var doctor_id = req.param('doctor_id');
    if (!doctor_id) {
        res.json(result(false, 'no doctor_id', {}));
        return;
    }
    findForArea(req,res,doctor_id,function(ids){
        req.models.sick.find({status:'t', doctor_id: ids}, function (err, data) {
        if (err || !data) {
            console.error(err);
            res.json(result(false, '', {}));
        } else {
            for (var i = 0; i< data.length; i++) {
                data[i].in_dur = data[i].in_duration();
            }
            res.json(result(true, '', data));
        }
    });
    });
});

//查房
router.post('/check', function (req, res, next) {
    
        
        var sick_id, doctor_id, description, title, pic, hasErr;
        try {
            sick_id = req.param('sick_id');
            doctor_id = req.param('doctor_id');
            title = req.param('title');
            description = req.param('description');
            pic = req.param('pics');
            if (!(pic instanceof Array)) {
                var temp = [];
                temp = pic.split(",");
                pic=temp;
            }
            console.log('description=' + description + ', pics=' + pic);
        } catch (e) {
            console.error(e);
            hasErr = e;
        }
        if (hasErr) {
            console.log('parse param error: ' + hasErr);
            res.redirect(source_url.check + '?err=1sick_id=' + sick_id + '&doctor_id=' + doctor_id);
        } else {
            var sc = {
                title: title,
                sick_id: sick_id, doctor_id: doctor_id, day: new Date(), description: description, pics: pic
            };
            console.log('sc=' + JSON.stringify(sc));
            req.models.sickcheck.create(sc, function (err, item) {
                if (err) {
                    console.error(err);
                    res.redirect(source_url.check + '?err=1&sick_id=' + sick_id + '&doctor_id=' + doctor_id);
                } else {
                    res.redirect(target_url.check + '?sick_id=' + sick_id + '&doctor_id=' + doctor_id);
                }
            });

        }
    
});

//随访
router.post('/out_check', function (req, res, next) {
    var sick_id, doctor_id, description, title, pic, hasErr;
        try {
            sick_id = req.param('sick_id');
            doctor_id = req.param('doctor_id');
            title = req.param('title');
            description = req.param('description');
            pic = req.param('pics');
            if (!(pic instanceof Array)) {
                var temp = [];
                temp = pic.split(",");
                pic=temp;
            }
            console.log('description=' + description + ', pics=' + pic);
        } catch (e) {
            console.error(e);
            hasErr = e;
        }
        if (hasErr) {
            console.log('parse param error: ' + hasErr);
            res.redirect(source_url.review + '?err=1sick_id=' + sick_id + '&doctor_id=' + doctor_id);
        } else {
            var sc = {
                title: title,
                sick_id: sick_id, doctor_id: doctor_id, day: new Date(), description: description, pics: pic
            };
            console.log('sc=' + JSON.stringify(sc));
            req.models.sickreview.create(sc, function (err, item) {
                if (err) {
                    console.error(err);
                    res.redirect(source_url.review + '?err=1&sick_id=' + sick_id + '&doctor_id=' + doctor_id);
                } else {
                    req.models.sick.get(sick_id, function(err, sick){
                        if (!err && sick) {
                            notifySickReview(sick,description);
                        }
                    });             
                    res.redirect(target_url.review + '?sick_id=' + sick_id + '&doctor_id=' + doctor_id);
                }
            });

        }
});

router.get('/checkList', function(req, res, next){
    var sick_id = req.param('sick_id');
    var doctor_id = req.param('doctor_id');
    var pageNo = req.param('pageNo') || 0, pageSize = req.param('pageSize') || 10;
    var query = {};
    if (sick_id) {
        query.sick_id = sick_id;
    } 
    if (doctor_id) {
        query.doctor_id = doctor_id;
    }
    req.models.sickcheck.find(query).order('-id').limit(pageSize).offset(pageSize*pageNo).run(function(err, data) {
        if (err) {
            res.json(result(false,'get sickcheck err', err));
        } else {
            res.json(result(true,'',data));
        }
    });
});

router.get('/outCheckList', function(req, res, next){
    var sick_id = req.param('sick_id');
    var doctor_id = req.param('doctor_id');
    var pageNo = req.param('pageNo') || 0, pageSize = req.param('pageSize') || 10;
    var query = {};
    if (sick_id) {
        query.sick_id = sick_id;
} 
    if (doctor_id) {
        query.doctor_id = doctor_id;
    }
    req.models.sickreview.find(query).order('-id').limit(pageSize).offset(pageSize*pageNo).run(function(err, data) {
        if (err) {
            res.json(result(false,'get sickcheck err', err));
        } else {
            res.json(result(true,'',data));
        }
    });
});

router.get('/hospital', function(req, res, next){
    req.models.hospital.find({}, function(err, data){
        if (err) {
            res.json(result(false, 'err', err));
        } else {
            res.json(result(true, '', data));
        }
    });
});

router.get('/hospitalDoctor', function(req, res, next) {
    var name = req.param('name');
    if (!name) {
        console.info('empty name');
        res.json(result(false, 'empty name', {}));
    } else {
        req.models.hospitalDoctor.find({'name': name}).order('area').order('room').run(function(err, data) {
            if (err) {
                res.json(result(false, 'err', err));
            } else {
                res.json(result(true, '', data));
            }
        });
    }
});

router.get('/requestList', function(req, res, next){
    var doctor_id = req.param('doctor_id');
    req.models.sickRequest.find({'doctor_id': doctor_id}, function(err, items){
        if (err) {
            res.json(result(false, 'err', err));
        } else {
            res.json(result(true,'',items));
        }
    });
});

router.get('/verify', function(req, res, next) {
    var sick_id = req.param('sick_id');
    var doctor_id = req.param('doctor_id');
    var isok = req.param('isok')?'t':'f';
    
    req.models.sick.get(sick_id, function(err, sick) {
        sick.save({status:isok}, function(err) {
        if (err) {
            res.json(result(false,'err', err));
        } else {
            req.models.sickRequest.find({'doctor_id':doctor_id, 'sick_id':sick_id}, function(err, data){
                if (err) {
                    res.json(result(false, 'err', err));
                } else {
                    if (data && data.length > 0) {
                        data[0].save({'status': 't'}, function(err) {
                            if (err) {
                                res.json(result(false,'err',err));
                            } else {
                                res.json(result(true, '', {}));
                            }
                        })
                    } else {
                        res.json(result(false, 'sick request not found', {}));
                    }
                }
            });
        }
        });
    });
   
});

module.exports = router;
