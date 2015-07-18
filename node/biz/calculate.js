var score = function(table) {
	var result = 0;
	var items = table.items;
	if (!items || items.length === 0) return result;
	for(var i = 0;i < items.length; i++) {
		result += cal(items[i]);
	}
	table.score = result;
	return result;
};

var level = function(table_type, table) {
	if (!table.score) {
			score(table);
		}
	if (table_type == 'caprini') {
		if (table.score <= 1) {
			table.level = '低危';
		} else if (table.score == 2) {
			table.level = '中危';
		} else if (table.score >=3 && table.score <=4) {
			table.level = '高危';
		} else {
			table.level = '极高危';
		}
	} else if (table_type === 'hss_left') {
		//todo	
	} else if (table_type == 'hss_right') {
		//todo
	} else if (table_type === 'rapt') {
		if (table.score <= 5) {
			table.level='DVT低风险';
		} else if (table.score >5 && table.score <= 14) {
			table.level = 'DVT中风险';
		} else if (table.score > 14) {
			table.level = 'DVT高风险';
		}
	}
	return table.level;
};

var cal = function(item) {
	if (!item || !item.scored) return 0;
	if (!item.keys || item.keys.length === 0) return 0;
	var result = 0;
	for (var i = 0; i < item.keys.length; i++) {
		var val = item.value[i];
		var ratio = item.ratio || 1;
		if (item.type === 'input') {
			result += (val || 0) * ratio;
		} else {
			result += val ? (selectKey(val, item.keys) || 0) * ratio:0;
		}
	}
	return result;
};

var selectKey = function(key, keys) {
	for (var i=0; i<keys.length;i++) {
		var item = keys[i];
		if (item.key === key) {
			return item.value;
		}
	}
	return 0;
}



module.exports.score = score;
module.exports.level = level;