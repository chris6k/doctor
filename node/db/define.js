var defines = {};
defines.define = (function(defines){return function (db, models) {
    db.settings.set('instance.cache', false);
    //医生申请表
    models.sickRequest = db.define('sick_request', {
        sickId: {type: 'integer', required: true},
        sickName: {type: 'text', required: true},
        sickBed: {type: 'text', required: true},
        doctorId: {type: 'integer', required: true},
        lastUpdate:{type: 'date', time:true, required: true},
        status:{type: 'text', required:true, defaultValue: 'f'} //t,f
    }, {
        hook:{
            beforeSave:function(){
                this.lastUpdate = new Date();
            },
            beforeCreate:function(){
                this.lastUpdate = new Date();
            }
        }
    });
    models.sickRequest.sync();
    models.hospital = db.define('hospital', {
        name: {type: 'text', required:true, unique: true}
    });
    models.hospital.sync();
    models.hospitalDoctor = db.define('hospital_doctor', {
        name: {type: 'text', required: true},
        area: {type: 'text', required: true},//病区
        room: {type: 'text', required: true},//科室
        doctor_id: {type: 'integer', required: true},
        doctor_name: {type: 'text', required: true}
    });
    models.hospitalDoctor.sync();
    //医生表
    models.doctor = db.define('doctor', {
        name: {type: 'text'},
        username: {type: 'text', unique: true},
        password: {type: 'text'},
        hospital: {type: 'text'},
        nurse_id: {type: 'integer'},
        nurse_name: {type: 'text'},
        doctor_id: {type: 'integer'},
        doctor_name: {type: 'text'},
        type: {type: 'text'},//doctor nurse
        mobile: {type: 'text', required: false},
        wx_id: {type: 'text', required: false},
        status: {type: 'text', defaultValue: 't'},
        avatar: {type: 'text', size: 256},
        title: {type: 'text', required: false},

    });
    //病人信息表
    models.sick = db.define('sick', {
        name: {type: 'text', required: true},
        age: {type: 'text', required: false},
        gender: {type: 'text', required: false},//m,f
        username: {type: 'text', required: true, unique: true},
        password: {type: 'text', required: true},
        hospital: {type: 'text', required: false},
        bed_id: {type: 'text', required: false},
        doctor_name: {type: 'text', required: false},
        nurse_name: {type: 'text', required: false},
        doctor_id: {type: 'integer', required: false},
        nurse_id: {type: 'integer', required: false},
        qr_code: {type: 'text', required: false},
        mobile: {type: 'text', required: false},
        level: {type: 'text', required: false},
        care_level: {type: 'text', required: false},
        operate_type: {type: 'text', required: false},
        in_day: {type: 'date', required: false},
        out_day: {type: 'date', required: false},
        wx_id: {type: 'text', required: false},
        status: {type: 'text', defaultValue: 'u'},//t,f,u
        drug_s: {type: 'integer', defaultValue: 0, required: false},
        drug_f: {type: 'integer', defaultValue: 0, required: false},
        height: {type: 'text', required: false},
        weight:{type: 'text', required: false},
        irr : {type : 'integer', defaultValue: 0, required: false} //0-normal 1-irr
    }, {
        methods: {
            in_duration: function () {
                if (!this.in_day) {
                    return 0;
                }
                var today = new Date();
                var date3 = today.getTime() - this.in_day.getTime();
                return Math.floor(date3 / (24 * 3600 * 1000))
            },
            out_duration: function () {
                if (!this.out_day) {
                    return 0;
                }
                var today = new Date();
                var data3 = today.getTime() - this.out_day.getTime();
                return Math.floor(data3 / (24 * 3600 * 1000));
            }
        }
    });

    //病人用药表
    models.sickdrug = db.define('sickdrug', {
        sick_id: {type: 'integer'},
        drug_name: {type: 'text'},
        drug_type: {type: 'text'},
        type: {type: 'text'},//s-建议 f-禁忌 c-慎用
        drug_reason: {type: 'text', required: false},
        table_type: {type: 'text', required: true}
    });
    models.sickdrug.sync();

    //病人量表信息
    models.sickstatus = db.define('sickstatus', {
        sick_id: {type: 'integer', required:true},
        table_type: {type: 'text', required:true},
        value: {type: 'text',required:true, size:6000},
        score:{type: 'integer'},
        level:{type: 'text'}
    });
    models.sickstatus.sync();
    //量表表
    models.sicktables = db.define('sicktable', {
        table_type: {type: 'text', required: true, unique: true},
        value: {type: 'text', required: true, size:6000},
        target: {type:'text', required:true}, //doctor, sick,
        status:{type:'text', required:true, defaultValue:'t'} //t|f
    });
    models.sicktables.sync();
    models.sicktablerule = db.define('sicktable_rule', {
        table_type: {type: 'text', required: true, unique:true},
        rule: {type: 'text', required: true}
    });
    models.sicktablerule.sync();
    //查房信息
    models.sickcheck = db.define('sickcheck', {
        sick_id: {type: 'integer'},
        doctor_id: {type: 'text'},
        day: {type: 'date'},
        title: {type: 'text'},
        description: {type: 'text'},
        pics: {type: 'object'}
    });
    //病人回访表
    models.sickreview = db.define('sickreview', {
        sick_id: {type: 'integer'},
        doctor_id: {type: 'text'},
        day: {type: 'date'},
        title: {type: 'text'},
        description: {type: 'text'},
        pics: {type: 'object'}
    });
    //会话表
    models.message_session = db.define('message_session', {
        day: {type: 'date'},
        status: {type: 'text', defaultValue: 'n'},//d-- 删除 n-- 正常
        doctor_id: {type: 'integer'},
        sick_id: {type: 'integer'},
        message: {type: 'object'},
        type: {type: 'text'}
    });
    //提问表
    models.message = db.define('message', {
        session_id: {type: 'integer'},
        day: {type: 'date'},
        title: {type: 'text'},
        content: {type: 'text'},
        pics: {type: 'object'},
        speaker: {type: 'text'},
        speaker_id: {type: 'integer'},
        type: {type: 'text'}
    });
    //药物表
    models.drug = db.define('drug', {
        name: {type: 'text'},
        type: {type: 'text'},
        description: {type: 'text'}
    });
    models.rebot = db.define('rebot', {
        step: {type: 'text'},
        keyword: {type: 'text'},
        type: {type: 'text'},
        value: {type: 'text'},
        content: {type: 'text'}
    });

    defines.cachedModels = models;
    console.info("init defines.cachedModels=" + defines.cachedModels + ",doctor=" + defines.cachedModels);
};


})(defines);

module.exports = defines;
