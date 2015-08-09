var prohibit = function(table, gender, age) {
	var prohibit_drug = {};
	for (index in reason_type_name) {
		var result = {};
		var items = table.items;
		if (!items || items.length === 0) return result;
		console.info("prohibit, gender=" + gender + ", and age = " + age);
		if (gender == "女" && age > 18 && age <= 35) {
			match(result, {value: ['青年女性(18~35岁)']}, index);
		}
		if (age < 18) {
			match(result, {value: ['儿童及青少年(小于18岁)']}, index);
		}
		for(var i = 0;i < items.length; i++) {
			match(result, items[i], index);
		}
		prohibit_drug[reason_type_name[index]] = result;
		console.info("prohibit_drug=" + JSON.stringify(prohibit_drug));
    }
    console.info("prohibit_drug=" + JSON.stringify(prohibit_drug));
    return prohibit_drug;
};
 
var recomm = function(prohibit_list) {
	var rec_drug = [];

	for (var i = 0;i<all_rec_list["抗凝药"].length;i++) {
		var rec_one = all_rec_list["抗凝药"][i];
		console.info("rec_one=>" + rec_one);
		var prohibit_item_list = prohibit_list['抗凝药'];
		console.info("prohibit_item_list=>" + JSON.stringify(prohibit_item_list));
		for (var j = 0; j < prohibit_item_list.length;j++) {
			if (prohibit_item_list[j].contains(rec_one)) {
				rec_one = null;
				break;
			}
		}
		if (rec_one) {
			rec_drug.push(rec_one);
		}
	}
	console.info("drugs=>" + JSON.stringify(rec_drug));
	return {name:"抗凝药",drugs:rec_drug};
};

module.exports.prohibit = prohibit;
module.exports.recomm = recomm;

var match = function(result, item, index) {
	if (!item) return 0;
	if (!item.value || item.value.length === 0) return 0;
	if (item.type != 'input') {
		for (var i = 0; i < item.value.length; i++) {
			
			var val = item.value[i];
			var drugs = reason_map[index][val];
			console.info("val=" + val);
			console.info("drug=" + JSON.stringify(drugs));
			if (drugs) {
				result[val] = drugs;
			}
			
		}
	}
};

var reason_type_name = {
	0:'镇痛药',
	1:'抗骨松药',
	2:'抗凝药',
	3:'抗生素'
};

var all_rec_list = {"抗骨松药":['依替膦酸二钠片','阿可达-帕米膦酸钠','福善美-阿仑膦酸钠片','凯思立D-碳酸钙D3',
'英康利-维生素D3','密盖息-鲑鱼降钙素','康美华-雌二醇','利维爱-替勃龙','安体芬-依普黄酮胶囊','苯丙酸诺龙'],"抗凝药":
['拜瑞妥-利伐沙班片','艾乐妥-阿哌沙班片','克赛-依诺肝素钠','速碧林-那屈肝素钙','华法林钠']
};

var reason_map = [];
reason_map[0] = {
	'酒精、安眠药、镇痛剂或其它精神药物急性中毒':['奇曼丁-盐酸曲马多缓释片'],
	'肝功能不全':['奇曼丁-盐酸曲马多缓释片','特耐-注射用帕瑞昔布钠','莫比可-美洛昔康胶囊','必理通-对乙酰氨基酚'],
	'未能充分控制的癫痫':['奇曼丁-盐酸曲马多缓释片'],
	'冠状动脉搭桥手术(CABG)围手术期':['西乐葆-塞来昔布胶囊','特耐-注射用帕瑞昔布钠'],
	'心力衰竭:':['西乐葆-塞来昔布胶囊','特耐-注射用帕瑞昔布钠','莫比可-美洛昔康胶囊'],
	'消化道出血或溃疡':['西乐葆-塞来昔布胶囊','特耐-注射用帕瑞昔布钠','莫比可-美洛昔康胶囊','地塞米松磷酸钠注射液'],
	'对药物过敏':['西乐葆-塞来昔布胶囊','特耐-注射用帕瑞昔布钠','莫比可-美洛昔康胶囊','必理通-对乙酰氨基酚','地塞米松磷酸钠注射液'],
	'有应用非甾体抗炎药后发生胃肠道出血或穿孔病史':['特耐-注射用帕瑞昔布钠'],
	'孕妇或哺乳期':['特耐-注射用帕瑞昔布钠','莫比可-美洛昔康胶囊'],
	'炎症性肠病':['特耐-注射用帕瑞昔布钠'],
	'已确定的缺血性心脏疾病，外周动脉血管和/或脑血管疾病':['特耐-注射用帕瑞昔布钠'],
	'肾功能不全':['莫比可-美洛昔康胶囊','必理通-对乙酰氨基酚'],
	'儿童及青少年(小于18岁)':['莫比可-美洛昔康胶囊'],
	'颅内出血':['莫比可-美洛昔康胶囊'],
	'精神病':['地塞米松磷酸钠注射液'],
	'电解质代谢异常':['地塞米松磷酸钠注射液'],
	'心肌梗死':['地塞米松磷酸钠注射液'],
	'高血压':['地塞米松磷酸钠注射液'],
	'活动或近期的动脉、静脉血栓性疾病':['地塞米松磷酸钠注射液'],
	'近期手术':['地塞米松磷酸钠注射液'],
	'青光眼':['地塞米松磷酸钠注射液']
};

reason_map[1]= {
	'对药物过敏':['依替膦酸二钠片','阿可达-帕米膦酸钠','福善美-阿仑膦酸钠片','密盖息-鲑鱼降钙素','安体芬-依普黄酮胶囊'],
	'孕妇或哺乳期':['阿可达-帕米膦酸钠','福善美-阿仑膦酸钠片','密盖息-鲑鱼降钙素','康美华-雌二醇','苯丙酸诺龙'],
	'导致食管排空延迟的食管异常':['福善美-阿仑膦酸钠片'],
	'不能站立或坐直至少30分钟':['福善美-阿仑膦酸钠片'],
	'低钙血症':['福善美-阿仑膦酸钠片','安体芬-依普黄酮胶囊'],
	'儿童及青少年(小于18岁)':['福善美-阿仑膦酸钠片','苯丙酸诺龙'],
	'高钙血症':['凯思立D-碳酸钙D3','英康利-维生素D3'],
	'高尿酸血症':['凯思立D-碳酸钙D3'],
	'含钙肾结石或有肾结石病史':['凯思立D-碳酸钙D3'],
	'维生素D增多症':['英康利-维生素D3'],
	'高磷血症伴肾性佝偻病':['英康利-维生素D3'],
	'阴道流血':['密盖息-鲑鱼降钙素','康美华-雌二醇'],
	'乳腺癌，与雌激素有关的肿瘤':['密盖息-鲑鱼降钙素','康美华-雌二醇'],
	'良性或恶性肝脏肿瘤或病史':['密盖息-鲑鱼降钙素'],
	'血栓栓塞性疾病':['密盖息-鲑鱼降钙素'],
	'活动或近期的动脉、静脉血栓性疾':['密盖息-鲑鱼降钙素','康美华-雌二醇'],
	'未治疗的子宫内膜增生':['康美华-雌二醇'],
	'急性肝病':['康美华-雌二醇'],
	'卟啉症':['康美华-雌二醇'],
	'伴有尿路阻塞的前列腺癌和前列腺腺癌':['苯丙酸诺龙'],
	'慢性肝病或最近曾患肝炎者':['苯丙酸诺龙'],
	'青年女性(18~35岁)':['苯丙酸诺龙']
};

reason_map[2] = {
	'GGT和转氨酶升高':['拜瑞妥-利伐沙班片'],
	'孕妇或哺乳期':['拜瑞妥-利伐沙班片','华法林钠'],
	'活动性出血':['拜瑞妥-利伐沙班片','艾乐妥-阿哌沙班片','克赛-依诺肝素钠','速碧林-那屈肝素钙'],
	'对药物过敏':['拜瑞妥-利伐沙班片','艾乐妥-阿哌沙班片','克赛-依诺肝素钠','速碧林-那屈肝素钙'],
	'出血倾向':['拜瑞妥-利伐沙班片','克赛-依诺肝素钠','速碧林-那屈肝素钙','华法林钠'],
	'贫血':['拜瑞妥-利伐沙班片','艾乐妥-阿哌沙班片'],
	'儿童及青少年(小于18岁)':['拜瑞妥-利伐沙班片'],
	'伴凝血异常和临床相关出血风险的肝病':['艾乐妥-阿哌沙班片'],
	'外伤':['艾乐妥-阿哌沙班片','华法林钠'],
	'消化道出血或溃疡':['克赛-依诺肝素钠','华法林钠'],
	'颅内出血':['克赛-依诺肝素钠','速碧林-那屈肝素钙'],
	'肾功能不全':['克赛-依诺肝素钠','华法林钠'],
	'蛛网膜下腔麻醉或硬膜外麻醉':['克赛-依诺肝素钠'],
	'注射部位血肿':['克赛-依诺肝素钠','速碧林-那屈肝素钙'],
	'传染性心内膜炎':['速碧林-那屈肝素钙','华法林钠'],
	'一过性转氨酶升高':['速碧林-那屈肝素钙'],
	'血栓栓塞性疾病':['速碧林-那屈肝素钙'],
	'不稳定心绞痛':['速碧林-那屈肝素钙'],
	'心肌梗死':['速碧林-那屈肝素钙'],
	'可能引起出血的器质性损伤':['速碧林-那屈肝素钙'],
	'难以控制的动脉高压':['华法林钠'],
	'高血压':['华法林钠'],
	'肝硬化':['华法林钠'],
	'近期手术':['华法林钠'],
	'皮肤瘀斑，牙龈出血，鼻衄、伤口出血、月经量过多等':['华法林钠'],
	'先兆流产':['华法林钠'],
	'心包炎及心包积液':['华法林钠']
};

reason_map[3] = {
	'对药物过敏':['头孢拉定','希刻劳-头孢克洛','汉光妥-头孢克肟','特丽仙-克林霉素','盐酸多西环素胶囊','氯霉素注射液','西普乐-乳酸环丙沙星氯化钠注射液','拜复乐-盐酸莫西沙星氯化钠注射液'],
	'儿童及青少年(小于18岁)':['盐酸多西环素胶囊','西普乐-乳酸环丙沙星氯化钠注射液','拜复乐-盐酸莫西沙星氯化钠注射液'],
	'孕妇或哺乳期':['盐酸多西环素胶囊','西普乐-乳酸环丙沙星氯化钠注射液','拜复乐-盐酸莫西沙星氯化钠注射液'],
	'肝功能不全':['氯霉素注射液'],
	'肾功能不全':['氯霉素注射液'],
	'Child Pugh C级和转氨酶升高>5倍ULN':['拜复乐-盐酸莫西沙星氯化钠注射液']
}

