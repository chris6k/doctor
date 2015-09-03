var express = require('express');
var router = express.Router();
var result = require('./result');
var calc = require('../biz/calculate');
var recommend = require('../biz/recommend');
var weixin = require('../biz/weixin');
var dateFormat = require('dateformat');
var feieyun = require('../biz/print');

router.get('/test', function(req, res, next){
    var api = weixin.api;
    var templateId = "F1kjgyVBU1K3JV-Vg0iPselzU7Ox9IOrRPMoY7cxx0M";
    var url = '';
    var topcolor = '#FF0000'; // 顶部颜色
    var data = {
        "first": "用药提醒",
        "keyword1": "要你命3000",
        "keyword2": "一日1次，一次10片",
        "keyword3": dateFormat(new Date(),"yyyy/mm/dd hh:MM:ss"),
        "remarks":"感谢您的使用"
    };
    api.sendTemplate("oRL_8tggmPtwTaAiWVadJUzOe3OM", templateId, url, topcolor, data, function(err){
        res.json(result(true,'',err||'ok'));
    });
});

router.get('/info', function (req, res, next) {
    req.models.sick.get(req.param('id'), function (err, data) {
        if (err || !data) {
            console.error(err);
            res.json(result(false, '', {}));
        } else {
            req.models.doctor.get(data.doctor_id, function(err, doctor) {
                if (err) {
                    res.json(result(true, '', data));        
                } else {
                    data.title = doctor.title;
                    res.json(result(true, '', data));
                }
            });
            
        }
    });
});

router.post('/create', function (req, res, next) {
    var sick = JSON.parse(req.param('sick'));
    if (!sick.out_day && sick.in_day) {
        sick.out_day = new Date((new Date(sick.in_day)).getTime() + 18 * 24 * 3600 * 1000);
    }
    if (!sick.out_day || sick.out_day === '0000-00-00') {
        sick.out_day = null;
    }
    if (!sick.in_day || sick.in_day === '0000-00-00') {
        sick.in_day = null;
    }
    var sick_name = sick.name, bed_id = sick.bed_id, doctor_id = sick.doctor_id, sick_id = sick.id;
    if (sick_id && sick_id > 0) {
        req.models.sick.get(sick_id, function (err, item) {
            if (err) {
                res.json(result(false,err.msg,err));
            } else {

                item.save(sick, function (err) {
                    if (err) {
                        res.json(result(false, err.msg, {}));
                    } else {
                        res.json(result(true, '', item));
                    }
                });
            }
        });
    } else if (sick.name && sick.bed_id && doctor_id) {
        req.models.sick.find({name: sick_name, bed_id: bed_id, doctor_id: doctor_id}, function (err, data) {
            if (!err && data && data.length > 0) {
                //merge info
                sick.doctor_name = data[0].doctor_name;
                data[0].save(sick, function (err, item) {
                    if (err) {
                        res.json(result(false, 'save failed', {}));
                    } else {
                        res.json(result(true, '', item));
                    }
                });
            } else {
                req.models.sick.create(sick, function (err, data) {
                    if (err) {
                        res.json(result(false, 'save failed', {}));
                    } else {
                        res.json(result(true, '', data));
                    }
                });
            }
        });
    } else {
        req.models.sick.create(sick, function (err, data) {
            if (err || !data) {
                res.json(result(false, 'save failed', {}));
            } else {
                res.json(result(true, '', data));
            }
        });
    }
});

router.get('/print', function (req, res, next) {
    var id = req.param('id');
    req.models.sick.get(id, function (err, sick) {
        if (err || !sick) {
            console.error(err);
            res.json(result(false, '', {}));
        } else {
            res.json(result(true, '', sick));
        }
    })
});

router.get('/feieprint', function(req, res, next){
    var id = req.param('id');
    req.models.sick.get(id, function(err, sick){
        if (err || !sick) {
            res.json(result(false, '', err || 'no sick by id'));
        } else {
            feieyun.print(sick.name, "http://www.guanaikangfu.com/gakf/sickDetail.html?isQ=1&id=" + id, function(err,resp){
                if (!err) {
                    res.json(result(true,null,resp));
                } else {
                    res.json(result(false,null,err));
                }
            });
        }
    });
});

router.get('/sickdrug', function (req, res, next) {
    var sick_id = req.param('sick_id');
    var type = req.param('type');
    var query = {};
    if (sick_id) {
        query.sick_id = sick_id;
    }
    if (type) {
        query.type = type;
    }
    req.models.sickdrug.find(query, function (err, data) {
        if (err || !data) {
            console.error(err);
            res.json(result(false, '', {}));
        } else {
            res.json(result(true, '', data));
        }
    });
});


router.get('/doctor', function (req, res, next) {
    var sick_id = req.param('sick_id');
    if (!sick_id) {
        res.json(result(false, 'no sick id', {}));
    } else {
        req.models.sick.get(sick_id, function (err, sick) {
            console.info("sick=>" + sick);
            if (err || !sick || !sick.doctor_id) {
                res.json(result(false, 'get sick info err', err));
            } else {
                req.models.doctor.get(sick.doctor_id, function (err, doctor) {
                    if (err || !doctor) {
                        res.json(result(false, 'get doctor info err'), {});
                    } else {
                        res.json(result(true, '', doctor));
                    }
                });
            }
        });
    }
});

router.get('/sicktablelist', function(req, res, next) {
    req.models.sicktables.find({}, function(err, data) {
        if (err) {
            res.json(result(false, 'err', err));
        } else {
            res.json(result(true, '', data));
        }
    });
});

router.post('/savesicktable', function(req, res, next) {
    var table_type= req.param('table_type');
    var value = req.param('value');
    var target = req.param('target');
    req.models.sicktables.create({table_type: table_type, value: value, target: target}, function(err, item) {
        if (err) {
            res.json(result(false, 'err', err));
        } else {
            res.json(result(true,'',item));
        }
    });
});

router.get('/sickstatus', function(req, res, next) {
    var sick_id = req.param('sick_id');
    var table_type = req.param('table_type');
    var query = {};
    if (sick_id) {
        query.sick_id=sick_id;
    }
    if (table_type) {
        query.table_type=table_type;
    }
    req.models.sickstatus.find(query, function(err, data){
        if (err) {
            res.json(result(false, 'err', err));
        } else {
            if (!data || data.length == 0) {
                req.models.sicktables.find({table_type: table_type}, function(err, data) {
                    if (err) {
                        res.json(result(false, 'err', err));
                    } else {
                        res.json(result(true,'', data[0]));
                    }
                });
            } else {
                res.json(result(true, '', data[0]));
            }
        }
    });
});

var saveProhibitDrug = function(req, pro_drug, sick_id, table_type) {
    req.models.sickdrug.find({sick_id:sick_id, table_type:table_type, type:'f'}).remove(function(err){
    for (type in pro_drug) {
        console.info("pro_drug=" + JSON.stringify(pro_drug[type]));
        for (sickname in pro_drug[type]) {
            var drug_arr = pro_drug[type][sickname];
            
                if (err) {
                    console.error(err);
                } else {
                    for (var i = 0; i< drug_arr.length;i++) {
                        req.models.sickdrug.create({sick_id: sick_id,
                        drug_name: drug_arr[i],
                        drug_type: type,
                        table_type:table_type,
                        type: 'f',//s-建议 f-禁忌 c-慎用
                        drug_reason: sickname}, function(err, item){
                            if (err) {
                                console.error(err);
                            }
                        });
                    }
                }             
        }  
    }
    });
};

var saveRecommDrug = function(req, rec_drug, sick_id, table_type) {
    var recomm_drug = rec_drug.drugs;
    var recomm_name = rec_drug.name;
    console.info("recomm_name=>" + recomm_name + ", recomm_drug=>" + JSON.stringify(recomm_drug));
    req.models.sickdrug.find({sick_id:sick_id, table_type:table_type, type:'s'}).remove(function(err){
        console.info("startsaverecomm");
        if (err) {console.error(err);} else {
        for (var i = 0; i< recomm_drug.length;i++) {
            console.info("saverecomm=>" + recomm_drug[i]);
            req.models.sickdrug.create({sick_id: sick_id,
                    table_type:table_type,
                    drug_name: recomm_drug[i],
                    drug_type: recomm_name,
                    type: 's',//s-建议 f-禁忌 c-慎用
                    drug_reason: ''}, function(err, item) {
                    if (err) {
                        console.error(err);
                    }
            });
        }
    }
    });
}

router.post('/savestatus', function(req, res, next) {
    var sick_id = req.param('sick_id');
    var table_type = req.param('table_type');
    var table = req.param('table');
    
    req.models.sick.get(sick_id, function(err, sick) {
        if (err) {res.json(result(false, 'err', err));}
        else if (!sick) {res.json(result(false, 'no such sick[id=' + sick_id,null));}
        else {
            var bmi = calc.bmi(sick.weight || 0, sick.height || 0);
            var age = sick.age;
            var gender = sick.gender;
            // console.info("1, sick_id=" + sick_id + " && table_type=" + table_type);
            req.models.sickstatus.find({sick_id: sick_id, table_type: table_type}, function(err, data) {
            // console.info("2, sick_id=" + sick_id + " && table_type=" + table_type);
            if (err) {
                // console.info("5");
                res.json(result(false, 'err', err));
            } else {
                
                    if (data && data.length > 0) {
                    var tablejson = JSON.parse(table);
                    var score = calc.score(tablejson, table_type,  bmi, age);
                    var level = calc.level(table_type, tablejson);
                    var pro_drug = recommend.prohibit(tablejson, gender, age);
                    var rec_drug = recommend.recomm(pro_drug);
                    console.info("tableindex=" + table_type.indexOf('slywjj'));
                    if (table_type.indexOf('slywjj') >= 0) {
                        for (var i = 0;i < tablejson.items.length; i++) {
                        var it = tablejson.items[i];
                        it.value = it.value ? it.value : [];
                            for (var j = 0; j < it.value.length; j++) {
                                if (it.value[j] === "对药物过敏") {
                                    sick.save({irr: 1}, function(err){
                                        if (!err) {
                                            console.info("save status succ");
                                        } else {
                                            console.info("save status failed");
                                        }
                                    });
                                }
                            }
                        }
                    }
                    
                    saveProhibitDrug(req, pro_drug, sick_id, table_type);
                    saveRecommDrug(req, rec_drug, sick_id, table_type);

                    data[0].save({value: JSON.stringify(tablejson), score:score, level:level}, function(err) {
                        if (err) {
                            res.json(result(false, 'err', err));
                        } else { 
                            res.json(result(true, '',{}));
                        }
                    });
                } else {
                    try {
                        // console.info("4");
                        var tablejson = JSON.parse(table);
                        var score = calc.score(tablejson, table_type, bmi, age);
                        var level = calc.level(table_type, tablejson);
                        var pro_drug = recommend.prohibit(tablejson);
                        var rec_drug = recommend.recomm(pro_drug);

                        saveProhibitDrug(req, pro_drug, sick_id, table_type);
                        saveRecommDrug(req, rec_drug, sick_id, table_type);
                        req.models.sickstatus.create({sick_id:sick_id, table_type:table_type, value:JSON.stringify(tablejson),score:score, level:level},
                        function(err, item){
                        if (err) {
                            res.json(result(false, 'err', err));
                            } else {
                            res.json(result(true,'',{}));
                        }
                        });
                    } catch (e) {
                        console.error(e);
                        res.json(result(false,'err', e));
                    }
                    
                }
           
            }
            });
        }
    });
    
});

router.get('/sickscore', function(req, res, next) {
    var sick_id = req.param('sick_id');
    req.models.sickstatus.find({sick_id:sick_id}, function(err, data){
        if (err) {
            res.json(result(false,'err', err));
        } else {
        var re = {caprini:'', caprini_score:0,hss_left:'', hss_right:'',rapt:'',rapt_score:0,cxpg:0, harris: ''};
        for(var i=0;i<data.length;i++) {
            var item = data[i];
            // console.info("item.table_type=" + item.table_type + ", score=" + item.score);
            if (item.table_type === 'caprini') {
                re.caprini = item.level||'';
                re.caprini_score = item.score || 0;
            } 
            if (item.table_type === 'hss_left') {
                re.hss_left = item.level||'';
            }
            if (item.table_type === 'hss_right') {
                re.hss_right = item.level||'';
            }
            if (item.table_type === 'rapt') {
                re.rapt = item.level||'';
                re.rapt_score = item.score || 0;
            }
            if (item.table_type === 'cxgwpg') {
                var table = JSON.parse(item.value);
                re.cxpg = table.items[0] ? table.items[0].value.length : 0;
            }
            if (item.table_type === 'harris') {
                re.harris = item.level || '';
            }
        }
        res.json(result(true, '', re));
    }
    });
});

router.get('/sickdrugcount', function(req, res, next){
    var sick_id = req.param('sick_id');

    req.models.sickdrug.find({sick_id:sick_id}, function(err, data){
        if (err) {
            res.json(result(false, 'err', err));
        } else {
            var sick_name = {};
            var f_name={};
            var reason = {};
            for (var i = 0;i < data.length;i++) {

                sick_name[data[i].drug_name] = 1;
                //统计禁忌药物总数和禁忌理由
                if (data[i].type==='f') {
                    f_name[data[i].drug_name] = 1
                    reason[data[i].drug_reason] = 1;
                }
            }
            res.json(result(true, '', {"drug_count":Object.keys(sick_name).length,"f_drug_count":Object.keys(f_name).length, "select_count" : Object.keys(reason).length}));

        }
    });
});

router.post('/setnotify', function(req, res, next) {
    var sick_id = req.param('sick_id');
    var drug_name = req.param('drug_name');
    var times = req.param('times');
    var days = req.param('days') || 0;
    var count = times * days;
    var drug_per = req.param('drug_count') || 0;
    var id = req.param('id');
    if (id) {
        req.models.drugnotify.get(id, function(err, notify){
            if (err) {
                res.json(result(false, 'err', err));
            } else if (notify) {
                notify.save({sick_id: sick_id, times: times, days: days,
             count: count, drug_per: drug_per, drug_name: drug_name}, function(err){
                if (err) {
                    res.json(result(false, 'err', err));
                } else {
                    res.json(result(true,null,null));
                }
             });
            }
        });
    } else {
        req.models.drugnotify.create({sick_id: sick_id, times: times, days: days,
         count: count, drug_per: drug_per, drug_name: drug_name}, function(err, data) {
            if (err) {
                res.json(result(false, 'err', err));
            } else {
                res.json(result(true, 'success', null));
            }
        });
    }
});

router.get('/getnotify', function(req, res, next){
    var sick_id = req.param('sick_id');
    var id = req.param('id');
    if(!id){
        req.models.drugnotify.find({sick_id: sick_id}, function(err, data){
            if (!err) {
                res.json(result(true, '', data));
            } else {
                res.json(result(false,"err",err));
            }
        });
    }else{
        req.models.drugnotify.find({sick_id: sick_id,id:id}, function(err, data){
            if (!err) {
                res.json(result(true, '', data));
            } else {
                res.json(result(false,"err",err));
            }
        });
    }
});

router.post('/delnotify',function(req,res,next){
    var sick_id = req.param('sick_id');
    var id = req.param('id');
    req.models.drugnotify.find({sick_id: sick_id,id:id}).remove(function (err) {
        if (!err) {
            res.json(result(true, '', 'del'));
        } else {
            res.json(result(false,"err",err));
        }
    });
});

module.exports = router;
