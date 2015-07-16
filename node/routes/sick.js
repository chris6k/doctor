var express = require('express');
var router = express.Router();
var result = require('./result');
var calc = require('../biz/calculate');
var recommend = require('../biz/recommend');
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

router.get('/sickdrug', function (req, res, next) {
    var sick_id = req.param('sick_id');
    req.models.sickdrug.find({sick_id: sick_id}, function (err, data) {
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

var saveProhibitDrug(pro_drug, sick_id) {
    for (type in pro_drug) {
            for (sickname in pro_drug[type]) {
            var drug_arr = pro_drug[type][sickname];
            for (var i = 0; i< ]drug_arr.length;i++) {
                req.models.sickdrug.create({sick_id: sick_id,
                    drug_name: drug_arr[i],
                    drug_type: type,
                    type: 'f',//s-建议 f-禁忌 c-慎用
                    drug_reason: sickname}, function(err, item){
                        if (err) {
                            console.error(err);
                        }
                });
            }
         }
    }
};

var saveRecommDrug(recomm_drug, id) {
    for (var i = 0; i< recomm_drug.length;i++) {
        req.models.sickdrug.create({sick_id: sick_id,
                    drug_name: recomm_drug[i],
                    drug_type: '抗骨松药',
                    type: 's',//s-建议 f-禁忌 c-慎用
                    drug_reason: ‘’}, function(err, item){
                        if (err) {
                            console.error(err);
                        }
    });
    }
}

router.post('/savestatus', function(req, res, next) {
    var sick_id = req.param('sick_id');
    var table_type = req.param('table_type');
    var table = req.param('table');
    req.models.sickstatus.find({sick_id: sick_id, table_type: table_type}, function(err, data) {
        if (err) {
            res.json(result(false, 'err', err));
        } else {
            if (data && data.length > 0) {
                data[0].save({value: table}, function(err) {
                    if (err) {
                        res.json(result(false, 'err', err));
                    } else {
                        //todo cal score and recommend
                        res.json(result(true, '',{}));
                    }
                });
            } else {
                try {
                    var tablejson = JSON.parse(table);
                    calc.score(tablejson);
                    calc.level(table_type, tablejson);
                    var pro_drug = recommend.prohibit(tablejson);
                    var rec_drug = recommend.recomm(pro_drug);

                    saveProhibitDrug(rec_drug, sick_status);
                    saveRecommDrug(rec_drug, sick_status);
                    req.models.sickstatus.create({sick_id:sick_id, table_type:table_type, value:JSON.stringify(tablejson)},
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
});

router.get('/sickscore', function(req, res, next) {
    var sick_id = req.param('sick_id');
    req.models.sickstatus.find({sick_id:sick_id}, function(err, data){
        if (err) {
            res.json(result(false,'err', err));
        } else {
        var re = {};
        for(var i=0;i<data.length;i++) {
            var item = data[i];
            if (item.table_type === 'caprini') {
                re.caprini = item.level;
            } 
            if (item.table_type === 'hss_left') {
                re.hss += item.score;
            }
            if (item.table_type === 'hss_right') {
                re.hss += item.score;
            }
            if (item.table_type === 'rapt') {
                re.rapt = item.level;
            }
        }
        res.json(result(true, '', re));
    }
    });
});

module.exports = router;
