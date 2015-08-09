[{
   "title":"创伤RAPT量表",
   "summary":"<div class='tips'>* 胸部 AIS>2分<br/>**腹部 AIS>2分<br/>***头部 AIS>2分<br/>****GCS<8分<br/>免责声明 <br/> 本量表参考《创伤骨科患者深静脉血栓形成筛查与治疗的专家共识 中华创伤骨科杂志 2013,15(12)》<br/> 请患者在医务工作者指导下进行填写，本量表最终结果仅供专业医务工作者参考</div>",
   "items":
   [
   {
       "title":"病史",
       "summary":"", 
       "type":"checkbox",
       "keys":[
        {"key":"恶性肿瘤","value":2},
        {"key":"凝血异常","value":2},
        {"key":"VTE病史","value":3}
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
   }
   ]
},

{
  "title": "膝关节HSS评分(左腿)",
  "summary": "<div class='tips'>免责声明:<br/>本量表参考http://www.haodf.com/zhuanjiaguandian/zhuyuchang_733246266.htm <br/>请患者在医务工作者指导下进行填写，本量表最终结果仅供专业医务工作者参考</div>",
  "items": [{
    "title": "疼痛",
    "summary": "",
    "type": "radio",
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
    "type": "radio",
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
    "type": "radio",
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
    "type": "radio",
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
    "type": "radio",
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
    "type": "radio",
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
    "type": "radio",
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
    "type": "radio",
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
  },{
    "title": "减分项目",
    "summary": "",
    "type": "radio",
    "keys": [{
      "key": "伸直滞缺5度",
      "value": -2
    }, {
      "key": "伸直滞缺10度",
      "value": -3
    }, {
      "key": "伸直滞缺15度",
      "value": -5
    }],
    "value": "",
    "scored": true,
    "checkedStyle": "dot"
  },{
    "title": "减分项目",
    "summary": "",
    "type": "radio",
    "keys": [{
      "key": "每5度外翻",
      "value": -1
    }, {
      "key": "每10度外翻",
      "value": -2
    }, {
      "key": "每15度外翻",
      "value": -3
    }],
    "value": "",
    "scored": true,
    "checkedStyle": "dot"
  },{
    "title": "减分项目",
    "summary": "",
    "type": "radio",
    "keys": [{
      "key": "每5度内翻",
      "value": -1
    }, {
      "key": "每10度内翻",
      "value": -2
    }, {
      "key": "每15度内翻",
      "value": -3
    }],
    "value": "",
    "scored": true,
    "checkedStyle": "dot"
  }]
},


{
  "title": "膝关节HSS评分(右腿)",
  "summary": "<div class='tips'>免责声明:<br/>本量表参考http://www.haodf.com/zhuanjiaguandian/zhuyuchang_733246266.htm <br/>请患者在医务工作者指导下进行填写，本量表最终结果仅供专业医务工作者参考</div>",
  "items": [{
    "title": "疼痛",
    "summary": "",
    "type": "radio",
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
    "type": "radio",
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
    "type": "radio",
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
    "type": "radio",
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
    "type": "radio",
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
    "type": "radio",
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
    "type": "radio",
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
    "type": "radio",
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
  },{
    "title": "减分项目",
    "summary": "",
    "type": "radio",
    "keys": [{
      "key": "伸直滞缺5度",
      "value": -2
    }, {
      "key": "伸直滞缺10度",
      "value": -3
    }, {
      "key": "伸直滞缺15度",
      "value": -5
    }],
    "value": "",
    "scored": true,
    "checkedStyle": "dot"
  },{
    "title": "减分项目",
    "summary": "",
    "type": "radio",
    "keys": [{
      "key": "每5度外翻",
      "value": -1
    }, {
      "key": "每10度外翻",
      "value": -2
    }, {
      "key": "每15度外翻",
      "value": -3
    }],
    "value": "",
    "scored": true,
    "checkedStyle": "dot"
  },{
    "title": "减分项目",
    "summary": "",
    "type": "radio",
    "keys": [{
      "key": "每5度内翻",
      "value": -1
    }, {
      "key": "每10度内翻",
      "value": -2
    }, {
      "key": "每15度内翻",
      "value": -3
    }],
    "value": "",
    "scored": true,
    "checkedStyle": "dot"
  }]
},

{
  "title":"caprini",
   "summary":"<div class='tips'>免责声明:<br/>本量表参考A Validation Study of a Retrospective Venous Thromboembolism Risk Scoring Method. Annals of Surgery Volume 251, Number 2, February 2010.<br/>请患者在医务工作者指导下进行填写，本量表最终结果仅供专业医务工作者参考</div>",
   "items":
   [
   {
       "title":"如果患者在既往一个月内发生过下面的情况，请选择对应项目:",
       "summary":"", 
       "type":"checkbox", 
       "keys":[
       {"key": "住院准备做个时间小于45分钟的手术（例如腕关节腱鞘炎、腱鞘囊肿、体表肿物切除手术，肌腱修补手术等）", "value":1},
       {"key": "一个月内曾经做过时间大于45分钟的其他手术", "value":1},
       {"key": "患有静脉曲张", "value": 1}, 
       {"key" : "患过炎症性肠病，如克罗恩病、溃疡性结肠炎", "value":1},
       {"key": "一个月内下肢会时常出现水肿", "value":1}, 
       {"key": "一个月内发生过急性心肌梗塞", "value":1},
       {"key":"一个月内发生过充血性心力衰竭", "value":1},
       {"key": "一个月内曾经发生严重感染，例如：肺炎、手术后感染等、败血症、脏器穿孔引起的急性腹膜炎、急性心内膜炎、心包炎、蜂窝织炎等", "value":1},
       {"key":"患有一些肺部疾病，例如：肺气肿、慢性阻塞性肺疾病（老慢支）、肺心病", "value":1},
       {"key":"行动不便，卧床不起，但连续卧床时间小于3天", "value":1}, 
       {"key":"有吸烟的习惯", "value":1},
       {"key":"患有糖尿病，需要使用胰岛素治疗，或者我因甲状腺切除，现在正在口服甲状腺激素", "value":1}, 
       {"key":"过去一个月经受化疗", "value":1},
       {"key":"过去一个月曾输过血", "value":1}
       ],
       "value":"",
       "scored":true,
       "checkedStyle":"dot"
   },
   {
    "title":"如果患者在既往一个月内发生过下面的情况，请选择对应项目",
    "summary":"",
    "type":"checkbox",
    "keys":[
    {"key":"患过或正患有恶性肿瘤/癌症（不限一个月）","value":2},
    {"key":"这次住院要做个时间大于45分钟的手术（多数住院手术都大于45分钟，包括关节置换、骨折复位内固定术、外固定支架术，关节镜手术等）","value":2}, {"key":"因为石膏或者模具固定下肢，导致过去一个月脚活动很少","value":2},
    {"key":"颈部或者胸部放置过静脉留置针或者中心静脉留置管", "value":2}, {"key":"过去一个月曾连续卧床超过3天（72小时）", "value":2}
    ],
    "value":"",
    "scored":true,
    "checkedStyle":"dot"
   },
   {
    "title":"如果患者在既往一个月内发生过下面的情况，请选择对应项目",
    "summary":"",
    "type":"checkbox",
    "keys":[
    {"key":"曾经发生过深静脉血栓或者肺栓塞（不限一个月内）","value":3},
    {"key":"直系亲属发生过血栓（不限一个月内）","value":3},
    {"key":"曾被告知自己的凝血化验指标异常，或者直系亲属的凝血指标异常（抗心磷脂抗体阳性、凝血酶原20210A阳性、凝血因子Vleiden阳性、狼疮抗凝物阳性、血清同型半胱氨酸酶升高）（如果不知道请跳过）","value":3}],
    "value":"",
    "scored":true,
    "checkedStyle":"dot"
   },
   {
    "title":"如果患者在既往一个月内发生过下面的情况，请选择对应项目",
    "summary":"",
    "type":"checkbox",
    "keys":[
    {"key":"接受了髋关节或者膝关节置换手术", "value":5},
    {"key":"发生过髋关节、骨盆、腿部骨折", "value":5},
    {"key":"发生过严重创伤（例如：跌倒或者车祸后全身多处骨折）","value":5},
    {"key":"因为脊髓损伤引起瘫痪","value":5},
    {"key":"发生过脑卒中（脑出血或脑梗）","value":5}],
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
     {"key":"手术时间","value":"","tip":"<span style='text-align:right;display: inline-block;'>上肢60-90分<br/>下肢90-120分</span>"},
     {"key":"止血带时长","value":"","tip":"<span style='text-align:right;display: inline-block;'>如果超时休息20-30分钟再打</span>"},
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
  "label":"请根据患者实际自身情况选择对应项目，如有任何不清楚地方，请向专业医务人员询问",
  "title":"四类药物禁忌(女性)",
  "summary":"<div class='tips'>免责声明:<br/>本量表由对应的药品与MIMS网站内容整理而成<br/>请患者在医务工作者指导下进行填写，本量表最终结果仅供专业医务工作者参考</div>",
  "items":[
   {
     "title":"对药物过敏",
     "summary":"",
     "type":"checkbox",
     "keys":[
     {"key":"对药物过敏","value":""}
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
     {"key":"孕妇或哺乳期","value":""},
     {"key":"先兆流产","value":""}
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
     {"key":"消化道出血或溃疡","value":""},
     {"key":"脑出血","value":""},
     {"key":"阴道出血","value":""},
     {"key":"注射部位血肿", "value":""},
     {"key":"凝血异常伴出血倾向","value":""},
     {"key":"应用非甾体抗炎药后发生胃肠道出血或穿孔病史","value":""},
     {"key":"可能引起出血的器质性损伤","value":""},
     {"key":"活动性出血","value":""},
     {"key":"皮肤瘀斑，牙龈出血，鼻衄、伤口出血等","value":""},
     {"key":"月经量过多","value":""}
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
     {"key":"炎症性肠病，如克罗恩病、溃疡性结肠炎","value":"炎症性肠病"},
     {"key":"导致食管排空延迟的食管异常","value":""}
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
     {"key":"肝功能不全","value":""},
     {"key":"急性肝病","value":""},
     {"key":"慢性肝病或最近曾患肝炎者","value":""},
     {"key":"GGT和转氨酶升高", "value":""},
     {"key":"伴凝血异常和临床相关出血风险的肝病","value":""},
     {"key":"肝硬化","value":"肝硬化"},
     {"key":"一过性转氨酶升高","value":""}
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
     {"key":"肾功能不全","value":""},
     {"key":"肾结石","value":""}
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
     {"key":"冠状动脉搭桥手术（CABG）围手术期","value":""},
     {"key":"充血性心力衰竭","value":""},
     {"key":"已确定的缺血性心脏疾病，外周动脉血管和/或脑血管疾病","value":""},
     {"key":"急性心肌梗塞", "value":""},
     {"key":"高血压","value":""},
     {"key":"活动或近期的动脉、静脉血栓性疾病","value":""},
     {"key":"急性心内膜炎","value":""},
     {"key":"不稳定心绞痛","value":""}
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
     {"key":"近期手术","value":""},
     {"key":"蛛网膜下腔麻醉或硬膜外麻醉","value":""},
     {"key":"外伤","value":""}
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
     {"key":"未能充分控制的癫痫","value":""},
     {"key":"精神病","value":""}
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
     {"key":"电解质代谢异常","value":""},
     {"key":"低钙血症","value":""},
     {"key":"高钙血症","value":""},
     {"key":"高尿酸血症", "value":""},
     {"key":"维生素D增多症","value":""},
     {"key":"高磷血症伴肾性佝偻病","value":""},
     {"key":"卟啉症","value":""},
     {"key":"贫血","value":""}
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
     {"key":"与雌激素有关的肿瘤","value":""},
     {"key":"乳腺癌","value":""},
     {"key":"良性或恶性肝脏肿瘤", "value":""}
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
     {"key":"青光眼","value":""},
     {"key":"不能站立或坐直至少30分钟","value":""},
     {"key":"未治疗的子宫内膜增生","value":""},
     {"key":"酒精、安眠药、镇痛剂或其它精神药物急性中毒", "value":""}
     ],
     "value":"",
     "scored":false,
     "checkedStyle":"none"
    }
  ]
},{
  "label":"请根据患者实际自身情况选择对应项目，如有任何不清楚地方，请向专业医务人员询问",
  "title":"四类药物禁忌(男性)",
  "summary":"<div class='tips'>免责声明:<br/>本量表由对应的药品与MIMS网站内容整理而成<br/>请患者在医务工作者指导下进行填写，本量表最终结果仅供专业医务工作者参考</div>",
  "items":[
   {
     "title":"对药物过敏",
     "summary":"",
     "type":"checkbox",
     "keys":[
     {"key":"对药物过敏","value":""}
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
     {"key":"消化道出血或溃疡","value":""},
     {"key":"脑出血","value":""},
     {"key":"注射部位血肿", "value":""},
     {"key":"凝血异常伴出血倾向","value":""},
     {"key":"应用非甾体抗炎药后发生胃肠道出血或穿孔病史","value":""},
     {"key":"可能引起出血的器质性损伤","value":""},
     {"key":"活动性出血","value":""},
     {"key":"皮肤瘀斑，牙龈出血，鼻衄、伤口出血等","value":""}
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
     {"key":"炎症性肠病，如克罗恩病、溃疡性结肠炎","value":""},
     {"key":"导致食管排空延迟的食管异常","value":""}
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
     {"key":"肝功能不全","value":""},
     {"key":"急性肝病","value":""},
     {"key":"慢性肝病或最近曾患肝炎者","value":""},
     {"key":"GGT和转氨酶升高", "value":""},
     {"key":"伴凝血异常和临床相关出血风险的肝病","value":""},
     {"key":"肝硬化","value":"肝硬化"},
     {"key":"一过性转氨酶升高","value":""}
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
     {"key":"肾功能不全","value":""},
     {"key":"肾结石","value":""}
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
     {"key":"冠状动脉搭桥手术（CABG）围手术期","value":""},
     {"key":"充血性心力衰竭","value":""},
     {"key":"已确定的缺血性心脏疾病，外周动脉血管和/或脑血管疾病","value":""},
     {"key":"急性心肌梗塞", "value":""},
     {"key":"高血压","value":""},
     {"key":"活动或近期的动脉、静脉血栓性疾病","value":""},
     {"key":"急性心内膜炎","value":""},
     {"key":"不稳定心绞痛","value":""}
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
     {"key":"近期手术","value":""},
     {"key":"蛛网膜下腔麻醉或硬膜外麻醉","value":""},
     {"key":"外伤","value":""}
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
     {"key":"未能充分控制的癫痫","value":""},
     {"key":"精神病","value":""}
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
     {"key":"电解质代谢异常","value":""},
     {"key":"低钙血症","value":""},
     {"key":"高钙血症","value":""},
     {"key":"高尿酸血症", "value":""},
     {"key":"维生素D增多症","value":""},
     {"key":"高磷血症伴肾性佝偻病","value":""},
     {"key":"卟啉症","value":""},
     {"key":"贫血","value":""}
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
     {"key":"与雌激素有关的肿瘤","value":""},
     {"key":"前列腺腺癌","value":""},
     {"key":"良性或恶性肝脏肿瘤", "value":""}
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
     {"key":"青光眼","value":""},
     {"key":"不能站立或坐直至少30分钟","value":""},
     {"key":"酒精、安眠药、镇痛剂或其它精神药物急性中毒", "value":""}
     ],
     "value":"",
     "scored":false,
     "checkedStyle":"none"
    }
  ]
}
]



