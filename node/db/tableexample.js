{
   'title':'创伤RAPT量表',
   'summary':'',
   'items':
   [
   {
       'title':'病史',
       'summary':'', 
       'type':'checkbox', 
       'keys':[
       	{'key':'肥胖','value':2},{'key':'恶性肿瘤','value':2},
       	{'key':'凝血异常','value':2},{'key':'VTE病史','value':3}
       	],
       'value':'',
       'scored':true,
       'checkedStyle':'none'
   },
   {
       'title':'医源性损伤',
       'summary':'', 
       'type':'checkbox', 
       'keys':[
       	{'key':'中心静脉导管>24h','value':2},{'key':'24h内输血>4 units','value':2},
       	{'key':'手术时间>2h','value':2},{'key':'修复或结扎大血管','value':3}
       	],
       'value':'',
       'scored':true,
       'checkedStyle':'none'
   },
   {
       'title':'创伤程度',
       'summary':'', 
       'type':'checkbox', 
       'keys':[
       	{'key':'胸部创伤是否较为严重?','value':2},{'key':'腹部创伤是否较为严重?','value':2},
       	{'key':'头部创伤是否较为严重?','value':3},{'key':'脊柱骨折','value':3},
       	{'key',:'重度昏迷持续4h以上','value':4},{'key':'下肢复杂骨折','value':4},
       	{'key':'盆骨骨折', 'value':4}, {'key':'脊髓损伤 (截瘫、四肢瘫)', 'value':4}
       	],
       'value':'',
       'scored':true,
       'checkedStyle':'none'
   },
   {
       'title':'年龄',
       'summary':'', 
       'type':'radio', 
       'keys':[
       	{'key':'40-60岁','value':2},{'key':'60-75','value':3},
       	{'key':'>75岁','value':4}
       	],
       'value':'',
       'scored':true,
       'checkedStyle':'none'
   }
   ]
};
{"title":"膝关节HSS评分(左腿)", "summary":"", "items": [{"title":"疼痛", "summary":"", "type":"checkbox", "keys":[{"key": "行走时无疼痛", "value":15},{"key":"行走时轻度疼痛", "value":10}, {"key": "行走时中度疼痛", "value": 5},{"key": "行走时严重疼痛", "value": 0}], "value":"", "scored":true, "checkedStyle":"dot"}, {"title":"功能", "summary":"", "type":"checkbox", "keys":[{"key": "行走站立无限制", "value":12},{"key":"行走2500~5000米和站立半小时以上", "value":10}, {"key": "行走500~2500米和站立可达半小时", "value": 5},{"key": "行走少于500米", "value": 4}, {"key": "不能行走", "value" : 0}], "value":"", "scored":true, "checkedStyle":"dot"}] };

{
'title':'膝关节HSS评分(左腿)',
   'summary':'',
   'items':
   [
   {
       'title':'疼痛',
       'summary':'', 
       'type':'radio', 
       'keys':[
       {'key': '行走时无疼痛', 'value':15},{'key':'行走时轻度疼痛', 'value':10},
       {'key': '行走时中度疼痛', 'value': 5},{'key': '行走时严重疼痛', 'value': 0}],
       'value':'',
       'scored':true,
       'checkedStyle':'dot'
   },
   {
       'title':'功能',
       'summary':'', 
       'type':'radio', 
       'keys':[
       {'key': '行走站立无限制', 'value':12},{'key':'行走2500~5000米和站立半小时以上', 'value':10},
       {'key': '行走500~2500米和站立可达半小时', 'value': 5},{'key': '行走少于500米', 'value': 4},
       {'key': '不能行走', 'value' : 0}],
       'value':'',
       'scored':true,
       'checkedStyle':'dot'
   },
   {
       'title':'功能',
       'summary':'', 
       'type':'radio', 
       'keys':[
       {'key': '能上楼梯', 'value':5},{'key':'能上楼梯,但需支具', 'value':2},
       {'key': '无法行走', 'value': 0}],
       'value':'',
       'scored':true,
       'checkedStyle':'dot'
   },
   {
       'title':'功能',
       'summary':'', 
       'type':'radio', 
       'keys':[
       {'key': '屋内行走,无需支具', 'value':5},{'key':'屋内行走,需要支具', 'value':2},
       {'key': '无法行走', 'value': 0}],
       'value':'',
       'scored':true,
       'checkedStyle':'dot'
   },
   {
       'title':'活动度',
       'summary':'', 
       'type':'input', 
       'keys':[{'key':'每活动8度得1分', 'value':18}],
       'value':'',
       'scored':true,
       'checkedStyle':'dot'
   },
   {
       'title':'肌力',
       'summary':'', 
       'type':'radio', 
       'keys':[
       {'key': '优：完全能对抗阻力', 'value':10},{'key':'中：能带动关节活动', 'value':4},
       {'key': '良：部分对抗阻力', 'value': 8}, {'key': '差：不能带动关节活动', 'value' : 0}],
       'value':'',
       'scored':true,
       'checkedStyle':'dot'
   },
   {
       'title':'屈曲畸形',
       'summary':'', 
       'type':'radio', 
       'keys':[
       {'key': '无畸形', 'value':10},{'key':'小于5度', 'value':8},
       {'key': '5~10度', 'value': 5}, {'key': '大于10度', 'value' : 0}],
       'value':'',
       'scored':true,
       'checkedStyle':'dot'
   },
   {
       'title':'稳定性',
       'summary':'', 
       'type':'radio', 
       'keys':[
       {'key': '正常', 'value':10},{'key':'轻度不稳0~5度', 'value':8},
       {'key': '中度不稳5~15度', 'value': 5}, {'key': '严重不稳大于15度', 'value' : 0}],
       'value':'',
       'scored':true,
       'checkedStyle':'dot'
   },
   {
       'title':'减分项目',
       'summary':'', 
       'type':'checkbox', 
       'keys':[
          {'key': '单手杖', 'value': -1},
          {'key': '单拐杖', 'value': -2},
          {'key': '双拐杖', 'value' : -3}
       ],
       'value':'',
       'scored':true,
       'checkedStyle':'dot'
   },
   {
       'title':'减分项目',
       'summary':'', 
       'type':'input', 
       'keys':[
          {'key': '伸直滞缺5度(-2)', 'value': -2},
          {'key': '伸直滞缺10度(-3)', 'value': -3},
          {'key': '伸直滞缺15度(-5)', 'value' : -5},
          {'key': '每5度外翻(-1X)', 'value' : 0},
          {'key': '每5度内翻(-1X)', 'value' : 0}
       ],
       'ratio': -1,
       'value':'',
       'scored':true,
       'checkedStyle':'dot'
   }]
};


{
'title':'膝关节HSS评分(右腿)',
   'summary':'',
   'items':
   [
   {
       'title':'疼痛',
       'summary':'', 
       'type':'radio', 
       'keys':[
       {'key': '行走时无疼痛', 'value':15},{'key':'行走时轻度疼痛', 'value':10},
       {'key': '行走时中度疼痛', 'value': 5},{'key': '行走时严重疼痛', 'value': 0}],
       'value':'',
       'scored':true,
       'checkedStyle':'dot'
   },
   {
       'title':'功能',
       'summary':'', 
       'type':'radio', 
       'keys':[
       {'key': '行走站立无限制', 'value':12},{'key':'行走2500~5000米和站立半小时以上', 'value':10},
       {'key': '行走500~2500米和站立可达半小时', 'value': 5},{'key': '行走少于500米', 'value': 4},
       {'key': '不能行走', 'value' : 0}],
       'value':'',
       'scored':true,
       'checkedStyle':'dot'
   },
   {
       'title':'功能',
       'summary':'', 
       'type':'radio', 
       'keys':[
       {'key': '能上楼梯', 'value':5},{'key':'能上楼梯,但需支具', 'value':2},
       {'key': '无法行走', 'value': 0}],
       'value':'',
       'scored':true,
       'checkedStyle':'dot'
   },
   {
       'title':'功能',
       'summary':'', 
       'type':'radio', 
       'keys':[
       {'key': '屋内行走,无需支具', 'value':5},{'key':'屋内行走,需要支具', 'value':2},
       {'key': '无法行走', 'value': 0}],
       'value':'',
       'scored':true,
       'checkedStyle':'dot'
   },
   {
       'title':'活动度',
       'summary':'', 
       'type':'input', 
       'keys':[{'key':'每活动8度得1分', 'value':18}],
       'value':'',
       'scored':true,
       'checkedStyle':'dot'
   },
   {
       'title':'肌力',
       'summary':'', 
       'type':'radio', 
       'keys':[
       {'key': '优：完全能对抗阻力', 'value':10},{'key':'中：能带动关节活动', 'value':4},
       {'key': '良：部分对抗阻力', 'value': 8}, {'key': '差：不能带动关节活动', 'value' : 0}],
       'value':'',
       'scored':true,
       'checkedStyle':'dot'
   },
   {
       'title':'屈曲畸形',
       'summary':'', 
       'type':'radio', 
       'keys':[
       {'key': '无畸形', 'value':10},{'key':'小于5度', 'value':8},
       {'key': '5~10度', 'value': 5}, {'key': '大于10度', 'value' : 0}],
       'value':'',
       'scored':true,
       'checkedStyle':'dot'
   },
   {
       'title':'稳定性',
       'summary':'', 
       'type':'radio', 
       'keys':[
       {'key': '正常', 'value':10},{'key':'轻度不稳0~5度', 'value':8},
       {'key': '中度不稳5~15度', 'value': 5}, {'key': '严重不稳大于15度', 'value' : 0}],
       'value':'',
       'scored':true,
       'checkedStyle':'dot'
   },
   {
       'title':'减分项目',
       'summary':'', 
       'type':'checkbox', 
       'keys':[
          {'key': '单手杖', 'value': -1},
          {'key': '单拐杖', 'value': -2},
          {'key': '双拐杖', 'value' : -3}
       ],
       'value':'',
       'scored':true,
       'checkedStyle':'dot'
   },
   {
       'title':'减分项目',
       'summary':'', 
       'type':'input', 
       'keys':[
          {'key': '伸直滞缺5度(-2)', 'value': -2},
          {'key': '伸直滞缺10度(-3)', 'value': -3},
          {'key': '伸直滞缺15度(-5)', 'value' : -5},
          {'key': '每5度外翻(-1X)', 'value' : 0},
          {'key': '每5度内翻(-1X)', 'value' : 0}
       ],
       'ratio': -1,
       'value':'',
       'scored':true,
       'checkedStyle':'dot'
   }

};

{
  'title':'caprini',
   'summary':'',
   'items':
   [
   {
       'title':'如果您往前一个月内发生过下面的情况,请每项计1分:',
       'summary':'', 
       'type':'checkbox', 
       'keys':[
       {'key': '正处于41-60岁（＜40或者＞60岁不打分）', 'value':1},{'key':'这次住院要做个时间小于45分钟的手术', 'value':1},
       {'key': '若要做的手术,时间大于2小时', 'value': 1},{'key': '一个月内曾做过时间大于45分钟的其他手术', 'value': 1},
       {'key': '静脉曲张', 'value': 1}, {'key' : '得过炎症性肠病,如克罗恩病、溃疡性结肠炎', 'value':1},
       {'key': '下肢水肿', 'value':1}, {'key':'体重超标(BMI指数大于25)', 'value':1},
       {'key': '急性心肌梗塞', 'value':1}, {'key':'充血性心力衰竭', 'value':1},
       {'key': '严重感染,例如:肺炎', 'value':1}, {'key':'肺部疾病,例如:肺气肿、慢性足赛性肺疾病(老慢支)'},
       {'key':'行动不便,卧床不起,但连续卧床时间小于3天', 'value':1}, {'key':'口服避孕药或激素替代疗法', 'value':1},
       {'key':'怀孕中或者产褥期内(1个月)', 'value':1}, {'key':'曾有过原因不明的死胎、反复自发性流产(超过3次)、早产儿合并毒血症或合并生长受限', 'value':1},
       {'key':'BMI大于40', value:1}, {'key':'吸烟','value':1},{'key':'患有糖尿病', 'value':1},
       {'key':'需要使用胰岛素治疗', 'value':1}, {'key':'经受化疗', 'value':1}, {'key':'输血', 'value':1}],
       'value':'',
       'scored':true,
       'checkedStyle':'dot'
   },
   {
    'titie':'如果您往前一个月内发生过下面的情况,请每项计2分',
    'summary':'',
    'type':'checkbox',
    'keys':[{'key':'正处于61-74岁(<40或者>60岁不打分)','value':2},{'key':'得过或正患有恶性肿瘤/癌症', 'value':2},
    {'key':'这次住院要做个时间大于45分钟的手术(包括腹腔镜或者关节镜手术)'}, {'key':'因为石膏或者模具固定下肢,导致过去一个月脚活动很少','value':2},
    {'key':'颈部或者胸部放置过静脉留置针或者中心静脉留置管', 'value':2}, {'key':'连续卧床超过72小时', 'value':2}
    ],
    'value':'',
    'scored':true,
    'checkedStyle':'dot'
   },
   {
    'titie':'如果您往前一个月内发生过下面的情况,请每项计3分',
    'summary':'',
    'type':'checkbox',
    'keys':[{'key':'正处于75岁及以上', 'value':3},{'key':'曾经发生过深静脉血栓或者肺栓塞', 
    'value':3},{'key':'直系亲属发生过血栓','value':3},{'key':'自己的凝血化验指标阳性,或者直系亲属的曾阳性（抗心磷脂抗体阳性、凝血酶原20210A阳性、因子Vleiden阳性、狼疮抗凝物阳性、血清同型半胱氨酸酶升高）','value':3}],
    'value':'',
    'scored':true,
    'checkedStyle':'dot'
   },
   {
    'titie':'如果您往前一个月内发生过下面的情况,请每项计5分',
    'summary':'',
    'type':'checkbox',
    'keys':[{'key':'接受了髋关节或者膝关节置换手术', 'value':5},{'key':'髋关节、骨盆、腿部骨折', 
    'value':5},{'key':'严重创伤（例如：跌倒或者车祸后全身多处骨折）','value':5},{'key':'脊髓损伤引起瘫痪','value':5},
    {'key':'脑卒中':'value':5}],
    'value':'',
    'scored':true,
    'checkedStyle':'dot'
   }
   ]
};

{
  'title':'术后骨科筛查量表',
   'summary':'',
   'items':[
   {
     'title':'血常规项目',
     'summary':'',
     'type':'input',
     'keys':[
     {'key':'白细胞','value':'未见异常','tip':'3.5-9.5 10^9/L'},
     {'key':'红细胞','value':'未见异常','tip':'3.8-5.10^12/L'},
     {'key':'细胞比积','value':'未见异常','tip':'35.0-45.0%'},
     {'key':'血红蛋白','value':'未见异常','tip':'115-150 g/L'},
     {'key':'血小板','value':'未见异常','tip':'125-300 10^9/L'},
     {'key':'中性细胞绝对值','value':'未见异常','tip':'1.8-6.3'},
     {'key':'中性细胞百分比','value':'未见异常','tip':'40-75%'},
     {'key':'高敏感指标','value':'未见异常'},
     {'key':'CRP','value':'未见异常','tip':'0-10'},
     {'key':'降钙素原','value':'未见异常','< 0.1ng /ml'},
     {'key':'细菌涂片','value':'未见异常'},
     {'key':'细菌培养','value':'未见异常'},
     {'key':'切口是否红肿','value':'自己填写'},
     {'key':'切口是否渗出','value':'自己填写'},
     {'key':'渗出物颜色','value':'自己填写'},
     {'key':'渗出物性状','value':'自己填写'},
     {'key':'渗出物量','value':'自己填写'},
     {'key':'引流量','value':'自己填写'},
     {'key':'输血量','value':'自己填写'},
     ],
     'value':'',
     'scored':false,
     'checkedStyle':'none'
    }
   ]
};







