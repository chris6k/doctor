[{
   "title":"创伤RAPT量表",
   "summary":"<div class="tips">* 胸部 AIS>2分<br/>**腹部 AIS>2分<br/>***头部 AIS>2分<br/>****GCS<8分<br/>RAPT评分<br/> <= 5分 DVT低风险<br/> 5-14分 DVT中风险 <br/> >14分 DVT高风险</div>",
   "items":
   [
   {
       "title":"病史",
       "summary":"", 
       "type":"checkbox", 
       "keys":[
        {"key":"肥胖","value":2},{"key":"恶性肿瘤","value":2},
        {"key":"凝血异常","value":2},{"key":"VTE病史","value":3}
        ],
       "value":"",
       "scored":true,
       "checkedStyle":"none"
   },
   {
       "title":"医源性损伤",
       "summary":"", 
       "type":"checkbox", 
       "keys":[
        {"key":"中心静脉导管>24h","value":2},{"key":"24h内输血>4 units","value":2},
        {"key":"手术时间>2h","value":2},{"key":"修复或结扎大血管","value":3}
        ],
       "value":"",
       "scored":true,
       "checkedStyle":"none"
   },
   {
       "title":"创伤程度",
       "summary":"", 
       "type":"checkbox", 
       "keys":[
        {"key":"胸部创伤是否较为严重?*","value":2},{"key":"腹部创伤是否较为严重?**","value":2},
        {"key":"头部创伤是否较为严重?***","value":3},{"key":"脊柱骨折","value":3},
        {"key":"重度昏迷持续4h以上****","value":4},{"key":"下肢复杂骨折","value":4},
        {"key":"盆骨骨折", "value":4}, {"key":"脊髓损伤 (截瘫、四肢瘫)", "value":4}
        ],
       "value":"",
       "scored":true,
       "checkedStyle":"none"
   },
   {
       "title":"年龄",
       "summary":"", 
       "type":"radio", 
       "keys":[
        {"key":"40-60岁","value":2},{"key":"60-75","value":3},
        {"key":"大于75岁","value":4}
        ],
       "value":"",
       "scored":true,
       "checkedStyle":"none"
   }
   ]
},

{
  "title": "膝关节HSS评分(左腿)",
  "summary": "",
  "items": [{
    "title": "疼痛",
    "summary": "",
    "type": "checkbox",
    "keys": [{
      "key": "行走时无疼痛",
      "value": 15
    }, {
      "key": "行走时轻度疼痛",
      "value": 10
    }, {
      "key": "行走时中度疼痛",
      "value": 5
    }, {
      "key": "行走时严重疼痛",
      "value": 0
    }],
    "value": "",
    "scored": true,
    "checkedStyle": "dot"
  }, {
    "title": "功能",
    "summary": "",
    "type": "checkbox",
    "keys": [{
      "key": "行走站立无限制",
      "value": 12
    }, {
      "key": "行走2500~5000米和站立半小时以上",
      "value": 10
    }, {
      "key": "行走500~2500米和站立可达半小时",
      "value": 5
    }, {
      "key": "行走少于500米",
      "value": 4
    }, {
      "key": "不能行走",
      "value": 0
    }],
    "value": "",
    "scored": true,
    "checkedStyle": "dot"
  }, {
    "title": "功能",
    "summary": "",
    "type": "checkbox",
    "keys": [{
      "key": "能上楼梯",
      "value": 5
    }, {
      "key": "能上楼梯,但需支具",
      "value": 2
    }, {
      "key": "无法行走",
      "value": 0
    }],
    "value": "",
    "scored": true,
    "checkedStyle": "dot"
  }, {
    "title": "功能",
    "summary": "",
    "type": "checkbox",
    "keys": [{
      "key": "屋内行走,无需支具",
      "value": 5
    }, {
      "key": "屋内行走,需要支具",
      "value": 2
    }, {
      "key": "无法行走",
      "value": 0
    }],
    "value": "",
    "scored": true,
    "checkedStyle": "dot"
  }, {
    "title": "活动度",
    "summary": "",
    "type": "input",
    "keys": [{
      "key": "每活动8度得1分",
      "value": 18
    }],
    "value": "",
    "scored": true,
    "checkedStyle": "dot"
  }, {
    "title": "肌力",
    "summary": "",
    "type": "checkbox",
    "keys": [{
      "key": "优：完全能对抗阻力",
      "value": 10
    }, {
      "key": "中：能带动关节活动",
      "value": 4
    }, {
      "key": "良：部分对抗阻力",
      "value": 8
    }, {
      "key": "差：不能带动关节活动",
      "value": 0
    }],
    "value": "",
    "scored": true,
    "checkedStyle": "dot"
  }, {
    "title": "屈曲畸形",
    "summary": "",
    "type": "checkbox",
    "keys": [{
      "key": "无畸形",
      "value": 10
    }, {
      "key": "小于5度",
      "value": 8
    }, {
      "key": "5~10度",
      "value": 5
    }, {
      "key": "大于10度",
      "value": 0
    }],
    "value": "",
    "scored": true,
    "checkedStyle": "dot"
  }, {
    "title": "稳定性",
    "summary": "",
    "type": "checkbox",
    "keys": [{
      "key": "正常",
      "value": 10
    }, {
      "key": "轻度不稳0~5度",
      "value": 8
    }, {
      "key": "中度不稳5~15度",
      "value": 5
    }, {
      "key": "严重不稳大于15度",
      "value": 0
    }],
    "value": "",
    "scored": true,
    "checkedStyle": "dot"
  }, {
    "title": "减分项目",
    "summary": "",
    "type": "checkbox",
    "keys": [{
      "key": "单手杖",
      "value": -1
    }, {
      "key": "单拐杖",
      "value": -2
    }, {
      "key": "双拐杖",
      "value": -3
    }],
    "value": "",
    "scored": true,
    "checkedStyle": "dot"
  }, {
    "title": "减分项目",
    "summary": "",
    "type": "input",
    "keys": [{
      "key": "伸直滞缺5度(-2)",
      "value": -2
    }, {
      "key": "伸直滞缺10度(-3)",
      "value": -3
    }, {
      "key": "伸直滞缺15度(-5)",
      "value": -5
    }, {
      "key": "每5度外翻(-1X)",
      "value": 0
    }, {
      "key": "每5度内翻(-1X)",
      "value": 0
    }],
    "ratio": -1,
    "value": "",
    "scored": true,
    "checkedStyle": "dot"
  }]
},


{
  "title": "膝关节HSS评分(右腿)",
  "summary": "",
  "items": [{
    "title": "疼痛",
    "summary": "",
    "type": "checkbox",
    "keys": [{
      "key": "行走时无疼痛",
      "value": 15
    }, {
      "key": "行走时轻度疼痛",
      "value": 10
    }, {
      "key": "行走时中度疼痛",
      "value": 5
    }, {
      "key": "行走时严重疼痛",
      "value": 0
    }],
    "value": "",
    "scored": true,
    "checkedStyle": "dot"
  }, {
    "title": "功能",
    "summary": "",
    "type": "checkbox",
    "keys": [{
      "key": "行走站立无限制",
      "value": 12
    }, {
      "key": "行走2500~5000米和站立半小时以上",
      "value": 10
    }, {
      "key": "行走500~2500米和站立可达半小时",
      "value": 5
    }, {
      "key": "行走少于500米",
      "value": 4
    }, {
      "key": "不能行走",
      "value": 0
    }],
    "value": "",
    "scored": true,
    "checkedStyle": "dot"
  }, {
    "title": "功能",
    "summary": "",
    "type": "checkbox",
    "keys": [{
      "key": "能上楼梯",
      "value": 5
    }, {
      "key": "能上楼梯,但需支具",
      "value": 2
    }, {
      "key": "无法行走",
      "value": 0
    }],
    "value": "",
    "scored": true,
    "checkedStyle": "dot"
  }, {
    "title": "功能",
    "summary": "",
    "type": "checkbox",
    "keys": [{
      "key": "屋内行走,无需支具",
      "value": 5
    }, {
      "key": "屋内行走,需要支具",
      "value": 2
    }, {
      "key": "无法行走",
      "value": 0
    }],
    "value": "",
    "scored": true,
    "checkedStyle": "dot"
  }, {
    "title": "活动度",
    "summary": "",
    "type": "input",
    "keys": [{
      "key": "每活动8度得1分",
      "value": 18
    }],
    "value": "",
    "scored": true,
    "checkedStyle": "dot"
  }, {
    "title": "肌力",
    "summary": "",
    "type": "checkbox",
    "keys": [{
      "key": "优：完全能对抗阻力",
      "value": 10
    }, {
      "key": "中：能带动关节活动",
      "value": 4
    }, {
      "key": "良：部分对抗阻力",
      "value": 8
    }, {
      "key": "差：不能带动关节活动",
      "value": 0
    }],
    "value": "",
    "scored": true,
    "checkedStyle": "dot"
  }, {
    "title": "屈曲畸形",
    "summary": "",
    "type": "checkbox",
    "keys": [{
      "key": "无畸形",
      "value": 10
    }, {
      "key": "小于5度",
      "value": 8
    }, {
      "key": "5~10度",
      "value": 5
    }, {
      "key": "大于10度",
      "value": 0
    }],
    "value": "",
    "scored": true,
    "checkedStyle": "dot"
  }, {
    "title": "稳定性",
    "summary": "",
    "type": "checkbox",
    "keys": [{
      "key": "正常",
      "value": 10
    }, {
      "key": "轻度不稳0~5度",
      "value": 8
    }, {
      "key": "中度不稳5~15度",
      "value": 5
    }, {
      "key": "严重不稳大于15度",
      "value": 0
    }],
    "value": "",
    "scored": true,
    "checkedStyle": "dot"
  }, {
    "title": "减分项目",
    "summary": "",
    "type": "checkbox",
    "keys": [{
      "key": "单手杖",
      "value": -1
    }, {
      "key": "单拐杖",
      "value": -2
    }, {
      "key": "双拐杖",
      "value": -3
    }],
    "value": "",
    "scored": true,
    "checkedStyle": "dot"
  }, {
    "title": "减分项目",
    "summary": "",
    "type": "input",
    "keys": [{
      "key": "伸直滞缺5度(-2)",
      "value": -2
    }, {
      "key": "伸直滞缺10度(-3)",
      "value": -3
    }, {
      "key": "伸直滞缺15度(-5)",
      "value": -5
    }, {
      "key": "每5度外翻(-1X)",
      "value": 0
    }, {
      "key": "每5度内翻(-1X)",
      "value": 0
    }],
    "ratio": -1,
    "value": "",
    "scored": true,
    "checkedStyle": "dot"
  }]
},

{
  "title":"caprini",
   "summary":"",
   "items":
   [
   {
       "title":"如果您往前一个月内发生过下面的情况，请每项计1分:",
       "summary":"", 
       "type":"checkbox", 
       "keys":[
       {"key": "正处于41-60岁（＜40或者＞60岁不打分）", "value":1},{"key":"这次住院要做个时间小于45分钟的手术", "value":1},
       {"key": "若要做的手术，时间大于2小时", "value": 1},{"key": "一个月内曾做过时间大于45分钟的其他手术", "value": 1},
       {"key": "静脉曲张", "value": 1}, {"key" : "得过炎症性肠病，如克罗恩病、溃疡性结肠炎", "value":1},
       {"key": "下肢水肿", "value":1}, {"key":"体重超标(BMI指数大于25)", "value":1},
       {"key": "急性心肌梗塞", "value":1}, {"key":"充血性心力衰竭", "value":1},
       {"key": "严重感染，例如:肺炎", "value":1}, {"key":"肺部疾病，例如:肺气肿、慢性足赛性肺疾病(老慢支)"},
       {"key":"行动不便，卧床不起，但连续卧床时间小于3天", "value":1}, {"key":"口服避孕药或激素替代疗法", "value":1},
       {"key":"怀孕中或者产褥期内(1个月)", "value":1}, {"key":"曾有过原因不明的死胎、反复自发性流产(超过3次)、早产儿合并毒血症或合并生长受限", "value":1},
       {"key":"BMI大于40", "value":1}, {"key":"吸烟","value":1},{"key":"患有糖尿病", "value":1},
       {"key":"需要使用胰岛素治疗", "value":1}, {"key":"经受化疗", "value":1}, {"key":"输血", "value":1}
       ],
       "value":"",
       "scored":true,
       "checkedStyle":"dot"
   },
   {
    "titie":"如果您往前一个月内发生过下面的情况，请每项计2分",
    "summary":"",
    "type":"checkbox",
    "keys":[{"key":"正处于61-74岁(<40或者>60岁不打分)","value":2},{"key":"得过或正患有恶性肿瘤/癌症", "value":2},
    {"key":"这次住院要做个时间大于45分钟的手术(包括腹腔镜或者关节镜手术)"}, {"key":"因为石膏或者模具固定下肢，导致过去一个月脚活动很少","value":2},
    {"key":"颈部或者胸部放置过静脉留置针或者中心静脉留置管", "value":2}, {"key":"连续卧床超过72小时", "value":2}
    ],
    "value":"",
    "scored":true,
    "checkedStyle":"dot"
   },
   {
    "titie":"如果您往前一个月内发生过下面的情况，请每项计3分",
    "summary":"",
    "type":"checkbox",
    "keys":[{"key":"正处于75岁及以上", "value":3},{"key":"曾经发生过深静脉血栓或者肺栓塞", 
    "value":3},{"key":"直系亲属发生过血栓","value":3},{"key":"自己的凝血化验指标阳性，或者直系亲属的曾阳性（抗心磷脂抗体阳性、凝血酶原20210A阳性、因子Vleiden阳性、狼疮抗凝物阳性、血清同型半胱氨酸酶升高）","value":3}],
    "value":"",
    "scored":true,
    "checkedStyle":"dot"
   },
   {
    "titie":"如果您往前一个月内发生过下面的情况，请每项计5分",
    "summary":"",
    "type":"checkbox",
    "keys":[{"key":"接受了髋关节或者膝关节置换手术", "value":5},{"key":"髋关节、骨盆、腿部骨折", 
    "value":5},{"key":"严重创伤（例如：跌倒或者车祸后全身多处骨折）","value":5},{"key":"脊髓损伤引起瘫痪","value":5},
    {"key":"脑卒中","value":5}],
    "value":"",
    "scored":true,
    "checkedStyle":"dot"
   }
   ]
},

{

  "title":"术后骨科筛查量表",
   "summary":"",
   "items":[
   {
     "title":"血常规项目",
     "summary":"",
     "type":"input",
     "keys":[
     {"key":"白细胞","value":"未见异常","tip":"3.5-9.5 10^9/L"},
     {"key":"红细胞","value":"未见异常","tip":"3.8-5.10^12/L"},
     {"key":"细胞比积","value":"未见异常","tip":"35.0-45.0%"},
     {"key":"血红蛋白","value":"未见异常","tip":"115-150 g/L"},
     {"key":"血小板","value":"未见异常","tip":"125-300 10^9/L"},
     {"key":"中性细胞绝对值","value":"未见异常","tip":"1.8-6.3"},
     {"key":"中性细胞百分比","value":"未见异常","tip":"40-75%"},
     {"key":"高敏感指标","value":"未见异常"},
     {"key":"CRP","value":"未见异常","tip":"0-10"},
     {"key":"降钙素原","value":"未见异常","tip":"< 0.1ng /ml"},
     {"key":"细菌涂片","value":"未见异常"},
     {"key":"细菌培养","value":"未见异常"},
     {"key":"切口是否红肿","value":"自己填写"},
     {"key":"切口是否渗出","value":"自己填写"},
     {"key":"渗出物颜色","value":"自己填写"},
     {"key":"渗出物性状","value":"自己填写"},
     {"key":"渗出物量","value":"自己填写"},
     {"key":"引流量","value":"自己填写"},
     {"key":"输血量","value":"自己填写"}
     ],
     "value":"",
     "scored":false,
     "checkedStyle":"none"
    }
   ]
},

{
  "title":"术前骨科筛查量表",
   "summary":"",
   "items":[
     {
     "title":"尿常规项目",
     "summary":"",
     "type":"input",
     "keys":[
     {"key":"葡萄糖","value":"未见异常","tip":"NA"},
     {"key":"胆红素","value":"未见异常","tip":"NA"},
     {"key":"酮体","value":"未见异常","tip":"NA"},
     {"key":"比重","value":"未见异常","tip":"1.005-1.03"},
     {"key":"红细胞","value":"未见异常","tip":"NA"},
     {"key":"PH值","value":"未见异常","tip":"5.5-6.5"},
     {"key":"尿蛋白","value":"未见异常","tip":"NA"},
     {"key":"亚硝酸盐","value":"未见异常","tip":"NA"},
     {"key":"白细胞","value":"未见异常","tip":"NA"}
     ],
     "value":"",
     "scored":false,
     "checkedStyle":"none"
     },
     {
     "title":"血常规项目",
     "summary":"",
     "type":"input",
     "keys":[
     {"key":"白细胞","value":"未见异常","tip":"3.5-9.5 10^9/L"},
     {"key":"红细胞","value":"未见异常","tip":"3.8-5.10^12/L"},
     {"key":"细胞比积","value":"未见异常","tip":"35.0-45.0%"},
     {"key":"血红蛋白","value":"未见异常","tip":"115-150 g/L"},
     {"key":"血小板","value":"未见异常","tip":"125-300 10^9/L"},
     {"key":"中性细胞绝对值","value":"未见异常","tip":"1.8-6.3"},
     {"key":"中性细胞百分比","value":"未见异常","tip":"40-75%"},
     {"key":"血糖","value":"未见异常","tip":"3.90-5.80mmol/L"}
     ],
     "value":"",
     "scored":false,
     "checkedStyle":"none"
    },
    {
     "title":"凝血功能",
     "summary":"",
     "type":"input",
     "keys":[
     {"key":"凝血酶原时间","value":"未见异常","tip":"11-14s"},
     {"key":"国际标准化比率","value":"未见异常","tip":"0.82-1.15"},
     {"key":"部分凝血活酶时间","value":"未见异常","tip":"20.0-40.0"},
     {"key":"纤维蛋白原","value":"未见异常","tip":"2.00-4.00"},
     {"key":"凝血酶时间","value":"未见异常","tip":"13.0-21.0"}
     ],
     "value":"",
     "scored":false,
     "checkedStyle":"none"
    },
    {
     "title":"CRP",
     "summary":"",
     "type":"input",
     "keys":[
     {"key":"CRP","value":"未见异常","tip":"0-10"}
     ],
     "value":"",
     "scored":false,
     "checkedStyle":"none"
    },
    {
     "title":"肝功能",
     "summary":"",
     "type":"input",
     "keys":[
     {"key":"总蛋白","value":"未见异常","tip":"60-80g/L"},
     {"key":"白蛋白","value":"未见异常","tip":"35-55g/L"},
     {"key":"谷丙转氨酶","value":"未见异常","tip":"0-65U/L"},
     {"key":"谷草转氨酶","value":"未见异常","tip":"8_37U/L"},
     {"key":"尿素","value":"未见异常","tip":"2.5-6.4mmol/L"},
     {"key":"肌酐","value":"未见异常","tip":"53-115umol/L"},
     {"key":"尿酸","value":"未见异常","tip":"210-430umol/L"}
     ],
     "value":"",
     "scored":false,
     "checkedStyle":"none"
    },
    {
     "title":"电解质",
     "summary":"",
     "type":"input",
     "keys":[
     {"key":"K","value":"未见异常","tip":"3.5-5.5 mmol/L"},
     {"key":"Na","value":"未见异常","tip":"135-145 mmol/L"},
     {"key":"CI","value":"未见异常","tip":"95-105 mmol/L"},
     {"key":"Ca","value":"未见异常","tip":"2.08-2.60 mmol/L"},
     {"key":"Mg","value":"未见异常","tip":"0.65-1.05 mmol/L"},
     {"key":"P","value":"未见异常","tip":"0.80-1.60 mmol/L"}
     ],
     "value":"",
     "scored":false,
     "checkedStyle":"none"
    },
    {
     "title":"艾滋",
     "summary":"",
     "type":"input",
     "keys":[
     {"key":"艾滋","value":"未见异常","tip":"阴性"}
     ],
     "value":"",
     "scored":false,
     "checkedStyle":"none"
    },
    {
     "title":"乙肝",
     "summary":"",
     "type":"input",
     "keys":[
     {"key":"乙肝","value":"未见异常","tip":"阴性"}
     ],
     "value":"",
     "scored":false,
     "checkedStyle":"none"
    },
    {
     "title":"丙肝",
     "summary":"",
     "type":"input",
     "keys":[
     {"key":"丙肝","value":"未见异常","tip":"阴性"}
     ],
     "value":"",
     "scored":false,
     "checkedStyle":"none"
    }
    
   ]
},

{
  "title":"术中骨科筛查量表",
  "summary":"",
  "items":[
   {
     "title":"术中骨科筛查量表",
     "summary":"",
     "type":"input",
     "keys":[
     {"key":"手术时间","value":""},
     {"key":"止血带时长","value":"","tip":"上肢一般60-90分钟,下肢一般90-120分钟,如果超时，休息20-30分钟再打"},
     {"key":"出血量","value":""},
     {"key":"输血量","value":""}
     ],
     "value":"",
     "scored":false,
     "checkedStyle":"none"
    }
  ]
},

{
  "title":"四类药物禁忌",
  "summary":"",
  "items":[
   {
     "title":"药物过敏",
     "summary":"",
     "type":"radio",
     "keys":[
     {"key":"药物过敏","value":"药物过敏"}
     ],
     "value":"",
     "scored":false,
     "checkedStyle":"none"
    },
    {
     "title":"性别年龄相关",
     "summary":"",
     "type":"radio",
     "keys":[
     {"key":"儿童及青少年(小于18岁)","value":"儿童及青少年(小于18岁)"},
     {"key":"青年女性(18~35岁)","value":"青年女性(18~35岁)"}
     ],
     "value":"",
     "scored":false,
     "checkedStyle":"none"
    },
    {
     "title":"您是孕妇或者在哺乳期吗",
     "summary":"",
     "type":"radio",
     "keys":[
     {"key":"孕妇或哺乳期","value":"孕妇或哺乳期"},
     {"key":"先兆流产","value":"先兆流产"}
     ],
     "value":"",
     "scored":false,
     "checkedStyle":"none"
    },
    {
     "title":"您有任何溃疡或出血症状吗",
     "summary":"",
     "type":"checkbox",
     "keys":[
     {"key":"消化道出血或溃疡","value":"消化道出血或溃疡"},
     {"key":"颅内出血","value":"颅内出血"},
     {"key":"阴道出血","value":"阴道出血"},
     {"key":"注射部位血肿", "value":"注射部位血肿"},
     {"key":"出血倾向","value":"出血倾向"},
     {"key":"应用非甾体抗炎药后发生胃肠道出血或穿孔病史","value":"应用非甾体抗炎药后发生胃肠道出血或穿孔病史"},
     {"key":"可能引起出血的器质性损伤","value":"可能引起出血的器质性损伤"},
     {"key":"活动性出血","value":"活动性出血"},
     {"key":"皮肤瘀斑，牙龈出血，鼻衄、伤口出血、月经量过多等","value":"皮肤瘀斑，牙龈出血，鼻衄、伤口出血、月经量过多等"}
     ],
     "value":"",
     "scored":false,
     "checkedStyle":"none"
    },
    {
     "title":"您有其他消化道疾患吗？",
     "summary":"",
     "type":"checkbox",
     "keys":[
     {"key":"炎症性肠病","value":"炎症性肠病"},
     {"key":"导致食管排空延迟的食管异常","value":"导致食管排空延迟的食管异常"}
     ],
     "value":"",
     "scored":false,
     "checkedStyle":"none"
    },
    {
     "title":"您的肝脏正常吗？",
     "summary":"",
     "type":"checkbox",
     "keys":[
     {"key":"肝功能不全","value":"肝功能不全"},
     {"key":"急性肝病","value":"急性肝病"},
     {"key":"慢性肝病或最近曾患肝炎者","value":"慢性肝病或最近曾患肝炎者"},
     {"key":"GGT和转氨酶升高", "value":"GGT和转氨酶升高"},
     {"key":"伴凝血异常和临床相关出血风险的肝病","value":"伴凝血异常和临床相关出血风险的肝病"},
     {"key":"肝硬化","value":"肝硬化"},
     {"key":"Child Pugh C级和转氨酶升高>5倍ULN","value":"Child Pugh C级和转氨酶升高>5倍ULN"},
     {"key":"一过性转氨酶升高","value":"一过性转氨酶升高"}
     ],
     "value":"",
     "scored":false,
     "checkedStyle":"none"
    },
     {
     "title":"您的肾脏正常吗？",
     "summary":"",
     "type":"checkbox",
     "keys":[
     {"key":"肾功能不全","value":"肾功能不全"},
     {"key":"含钙肾结石或有肾结石病史","value":"含钙肾结石或有肾结石病史"}
     ],
     "value":"",
     "scored":false,
     "checkedStyle":"none"
    },
    {
     "title":"您的心血管正常吗？",
     "summary":"",
     "type":"checkbox",
     "keys":[
     {"key":"冠状动脉搭桥手术（CABG）围手术期","value":"冠状动脉搭桥手术（CABG）围手术期"},
     {"key":"心力衰竭","value":"心力衰竭"},
     {"key":"已确定的缺血性心脏疾病，外周动脉血管和/或脑血管疾病","value":"已确定的缺血性心脏疾病，外周动脉血管和/或脑血管疾病"},
     {"key":"难以控制的动脉高压", "value":"难以控制的动脉高压"},
     {"key":"血栓栓塞性疾病","value":"血栓栓塞性疾病"},
     {"key":"心肌梗死","value":"心肌梗死"},
     {"key":"高血压","value":"高血压"},
     {"key":"活动或近期的动脉、静脉血栓性疾病","value":"活动或近期的动脉、静脉血栓性疾病"},
     {"key":"传染性心内膜炎","value":"传染性心内膜炎"},
     {"key":"不稳定心绞痛","value":"不稳定心绞痛"},
     {"key":"心包炎及心包积液","value":"心包炎及心包积液"}
     ],
     "value":"",
     "scored":false,
     "checkedStyle":"none"
    },
    {
     "title":"您近期有过外伤或接受过手术和麻醉吗？",
     "summary":"",
     "type":"checkbox",
     "keys":[
     {"key":"近期手术","value":"近期手术"},
     {"key":"蛛网膜下腔麻醉或硬膜外麻醉","value":"蛛网膜下腔麻醉或硬膜外麻醉"},
     {"key":"外伤","value":"外伤"}
     ],
     "value":"",
     "scored":false,
     "checkedStyle":"none"
    },
    {
     "title":"您有精神疾病史吗？",
     "summary":"",
     "type":"checkbox",
     "keys":[
     {"key":"未能充分控制的癫痫","value":"未能充分控制的癫痫"},
     {"key":"精神病","value":"精神病"}
     ],
     "value":"",
     "scored":false,
     "checkedStyle":"none"
    },
    {
     "title":"您有任何代谢性疾病吗？",
     "summary":"",
     "type":"checkbox",
     "keys":[
     {"key":"电解质代谢异常","value":"电解质代谢异常"},
     {"key":"低钙血症","value":"低钙血症"},
     {"key":"高钙血症","value":"高钙血症"},
     {"key":"高尿酸血症", "value":"高尿酸血症"},
     {"key":"维生素D增多症","value":"维生素D增多症"},
     {"key":"高磷血症伴肾性佝偻病","value":"高磷血症伴肾性佝偻病"},
     {"key":"卟啉症","value":"卟啉症"},
     {"key":"贫血","value":"贫血"}
     ],
     "value":"",
     "scored":false,
     "checkedStyle":"none"
    },
    {
     "title":"您有肿瘤相关疾病史吗？",
     "summary":"",
     "type":"checkbox",
     "keys":[
     {"key":"乳腺癌，与雌激素有关的肿瘤","value":"乳腺癌，与雌激素有关的肿瘤"},
     {"key":"伴有尿路阻塞的前列腺癌和前列腺腺癌","value":"伴有尿路阻塞的前列腺癌和前列腺腺癌"},
     {"key":"良性或恶性肝脏肿瘤或病史", "value":"良性或恶性肝脏肿瘤或病史"}
     ],
     "value":"",
     "scored":false,
     "checkedStyle":"none"
    },
    {
     "title":"您有其他疾患吗？",
     "summary":"",
     "type":"checkbox",
     "keys":[
     {"key":"青光眼","value":"电解质代谢异常"},
     {"key":"不能站立或坐直至少30分钟","value":"不能站立或坐直至少30分钟"},
     {"key":"未治疗的子宫内膜增生","value":"未治疗的子宫内膜增生"},
     {"key":"酒精、安眠药、镇痛剂或其它精神药物急性中毒", "value":"酒精、安眠药、镇痛剂或其它精神药物急性中毒"}
     ],
     "value":"",
     "scored":false,
     "checkedStyle":"none"
    },
    {
     "title":"是否出血高危人群",
     "summary":"",
     "type":"checkbox",
     "keys":[
     {"key":"是否有家族性出血史","value":"是否有家族性出血史"},
     {"key":"自己是否有出血史","value":"自己是否有出血史"},
     {"key":"是否手术之前使用过抗凝治疗","value":"是否手术之前使用过抗凝治疗"}
     ],
     "value":"",
     "scored":false,
     "checkedStyle":"none"
    }
  ]
}
]



