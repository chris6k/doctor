var define = function (db, models) {

    //医生表
    models.doctor = db.define('doctor', {
        name: {type: 'string'},
        username: {type: 'string'},
        password: {type: 'string'},
        hospital: {type: 'string'},
        nurse_id: {type: 'integer'},
        nurse_name: {type: 'string'},
        doctor_id: {type: 'integer'},
        doctor_name: {type: 'string'},
        type: {type: 'string'},//doctor nurse
        mobile: {type: 'string', required: false},
        wx_id: {type: 'string', required: false},
        status: {type: 'string', defaultValue: 't'}
    });
    //病人信息表
    models.sick = db.define('sick', {
        name: {type: 'string', required: false},
        age: {type: 'string', required: false},
        gender: {type: 'string', required: false},//m,f
        username: {type: 'string', required: false},
        password: {type: 'string', required: false},
        hospital: {type: 'string', required: false},
        bed_id: {type: 'string', required: false},
        doctor_name: {type: 'string', required: false},
        nurse_name: {type: 'string', required: false},
        doctor_id: {type: 'integer', required: false},
        nurse_id: {type: 'integer', required: false},
        qr_code: {type: 'string', required: false},
        mobile: {type: 'string', required: false},
        level: {type: 'string', required: false},
        care_level: {type: 'string', required: false},
        operate_type: {type: 'string', required: false},
        in_day: {type: 'date', required: false},
        out_day: {type: 'date', required: false},
        wx_id: {type: 'string', required: false},
        status: {type: 'string', defaultValue: 't'},
        drug_s: {type: 'integer', defaultValue: 0, required: false},
        drug_f: {type: 'integer', defaultValue: 0, required: false}
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
                var data3 = today.getTime - this.out_day.getTime;
                return Math.floor(data3 / (24 * 3600 * 1000));
            }
        }
    });

    //病人用药表
    models.sickdrug = db.define('sickdrug', {
        sick_id: {type: 'integer'},
        drug_name: {type: 'string'},
        drug_type: {type: 'string'},
        type: {type: 'string'},//s-建议 f-禁忌 c-慎用
        drug_reason: {type: 'object', required: false}
    });

    //病人量表信息
    models.sickstatus = db.define('sickstatus', {
        sick_id: {type: 'integer'},
        table_type: {type: 'string'},
        value: {type: 'object'}
    });
    //量表表
    models.sicktables = db.define('sicktable', {
        table_type: {type: 'string', required: false, unique: true},
        value: {type: 'string', required: false}
    });
    //查房信息
    models.sickcheck = db.define('sickcheck', {
        sick_id: {type: 'integer'},
        doctor_id: {type: 'string'},
        day: {type: 'date'},
        title: {type: 'title'},
        description: {type: 'object'},
        pics: {type: 'object'}
    });
    //病人回访表
    models.sickreview = db.define('sickreview', {
        sick_id: {type: 'integer'},
        doctor_id: {type: 'string'},
        day: {type: 'date'},
        title: {type: 'title'},
        description: {type: 'object'},
        pics: {type: 'object'}
    });

    models.message_session = db.define('message_session', {
        day: {type: 'date'},
        status: {type: 'string', defaultValue: 'n'},//d-- 删除 n-- 正常
        sick_id: {type: 'integer'}
    });
    //提问表
    models.message = db.define('message', {
        session_id: {type: 'integer'},
        day: {type: 'date'},
        title: {type: 'string'},
        content: {type: 'string'},
        pics: {type: 'object'},
        speaker: {type: 'string'},
        speaker_id: {type: 'integer'}
    });
    //药物表
    models.drug = db.define('drug', {
        name: {type: 'string'},
        type: {type: 'string'},
        description: {type: 'string'}
    });
    models.rebot = db.define('rebot', {
        step: {type: 'string'},
        keyword: {type: 'string'},
        type: {type: 'string'},
        value: {type: 'string'},
        content: {type: 'string'}
    });
};
module.exports = define;
