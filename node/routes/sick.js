var express = require('express');
var router = express.Router();
var result = require('./result');

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
                req.models.sickstatus.create({sick_id:sick_id, table_type:table_type, value:table}, function(err, item){
                    if (err) {
                        res.json(result(false, 'err', err));
                    } else {
                        //todo cal score and recommend
                        res.json(result(true,'',{}));
                    }
                });
            }
        }
    });
});

module.exports = router;
