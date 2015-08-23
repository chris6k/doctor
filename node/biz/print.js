//PRINTER_SN：打印机编号9位,查看飞鹅打印机底部贴纸上面的打印机编号
//KEY：去飞鹅打印机官方网站 www.feieyun.com 注册帐号，添加打印机编号，自动生成KEY
var PRINTER_SN = "xxxxxxxxx";
var KEY = "xxxxxxxx";
var IP = "**********";
var HOSTNAME = "/FeieServer";
//-------------------------------------------------

var http = require('http');  
var qs = require('querystring');  

//**********测试时，打开下面注释掉方法的即可**********

//方法1.打印订单
//----------服务器返回的结果有如下几种：----------
//{"responseCode":0,"msg":"服务器接收订单成功","orderindex":"xxxxxxxxxxxxxxxxxx"}
//{"responseCode":1,"msg":"打印机编号错误"}
//{"responseCode":2,"msg":"服务器处理订单失败"}
//{"responseCode":3,"msg":"打印内容太长"}
//{"responseCode":4,"msg":"请求参数错误"}
// print();

//方法2.查询某订单是否打印成功
//----------服务器返回的结果有如下几种：----------
//{"responseCode":0,"msg":"已打印"}
//{"responseCode":0,"msg":"未打印"}
//{"responseCode":1,"msg":"请求参数错误"}
//{"responseCode":2,"msg":"没有找到该索引的订单"}
//var strindex = "1425703410880926118661";//填写需要查询的订单索引编号
//queryOrderState(strindex);

//方法3.查询指定打印机某天的订单详情
//----------服务器返回的结果有如下几种：----------
//print:已打印,waiting:未打印
//{"responseCode":0,"print":"xx","waiting":"xx"}
//{"responseCode":1,"msg":"请求参数错误"}
//var strdate = "2015-03-03";//注意日期格式为yyyy-MM-dd
//queryOrderInfoByDate(strdate);

//方法4.查询打印机的状态
//----------服务器返回的结果有如下几种：----------
//{"responseCode":0,"msg":"离线"}
//{"responseCode":0,"msg":"在线,工作状态正常"}
//{"responseCode":0,"msg":"在线,工作状态不正常"}
//{"responseCode":1,"msg":"请求参数错误"}
//queryPrinterStatus();





//-----------------------以下方法实现----------------------------------
function print(){
		
		//标签说明："<BR>"为换行符，"<CB></CB>"为居中放大，"<B></B>"为放大,"<QR></QR>"为二维码标签，"<L></L>"为字体变高
		
		//拼凑订单内容时可参考如下格式
		var orderInfo;
		orderInfo = "<CB>测试打印</CB><BR>";//标题字体如需居中放大,就需要用标签套上
		orderInfo += "名称　　　　　 单价  数量 金额<BR>";
		orderInfo += "--------------------------------<BR>";
		orderInfo += "番　　　　　　 1.0    1   1.0<BR>";
		orderInfo += "番茄　　　　　 10.0   10  10.0<BR>";
		orderInfo += "番茄炒　　　　 10.0   100 100.0<BR>";
		orderInfo += "番茄炒粉　　　 100.0  100 100.0<BR>";
		orderInfo += "番茄炒粉粉　　 1000.0 1   100.0<BR>";
		orderInfo += "番茄炒粉粉粉粉 100.0  100 100.0<BR>";
		orderInfo += "番茄炒粉粉粉粉 15.0   1   15.0<BR>";
		orderInfo += "备注：快点送到xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<BR>";
		orderInfo += "--------------------------------<BR>";
		orderInfo += "合计：xx.0元<BR>";
		orderInfo += "送货地点：xxxxxxxxxxxxxxxxx<BR>";
		orderInfo += "联系电话：138000000000<BR>";
		orderInfo += "订餐时间：2011-01-06 19:30:10<BR>";
		orderInfo += "----------请扫描二维码----------";
		orderInfo += "<QR>www.dzist.com</QR>";//把二维码字符串用标签套上即可自动生成二维码
		orderInfo += "<BR>";
		orderInfo += "<BR>";

	var post_data = {  
		sn:PRINTER_SN,//打印机编号
		printContent:orderInfo,//打印内容
		key:KEY,//key
		times:'1'//打印联数，默认为1
		};     
	var content = qs.stringify(post_data);  
	var options = {  
		hostname:IP,  
		port: 80,  
		path: HOSTNAME+'/printOrderAction',  
		method: 'POST',  
		headers: {  
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'  
		}  
	};  
	var req = http.request(options, function (res) {  
		res.setEncoding('utf-8');  
		res.on('data', function (response){
			//response是返回的JSON字符串
			console.log(response);  
		});  
	});
	req.on('error', function (e) {  
		console.log('error!');  
	});  
	req.write(content);    
	req.end();
}


function queryOrderState(strindex){
		
	var post_data = {  
		sn:PRINTER_SN,//打印机编号
		key:KEY,//key
		index:strindex//订单索引，调用方法1会返回，
		};     
	var content = qs.stringify(post_data);  
	var options = {  
		hostname:IP,  
		port: 80,  
		path: HOSTNAME+'/queryOrderStateAction',  
		method: 'POST',  
		headers: {  
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'  
		}  
	};  
	var req = http.request(options, function (res) {  
		res.setEncoding('utf-8');  
		res.on('data', function (response){
			//response是返回的JSON字符串
			console.log(response);  
		});  
	});
	req.on('error', function (e) {  
		console.log('error!');  
	});  
	req.write(content);    
	req.end();
}

function queryOrderInfoByDate(strdate){
		
	var post_data = {  
		sn:PRINTER_SN,//打印机编号
		key:KEY,//key
		date:strdate//日期
		};     
	var content = qs.stringify(post_data);  
	var options = {  
		hostname:IP,  
		port: 80,  
		path: HOSTNAME+'/queryOrderInfoAction',  
		method: 'POST',  
		headers: {  
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'  
		}  
	};  
	var req = http.request(options, function (res) {  
		res.setEncoding('utf-8');  
		res.on('data', function (response){
			//response是返回的JSON字符串
			console.log(response);  
		});  
	});
	req.on('error', function (e) {  
		console.log('error!');  
	});  
	req.write(content);    
	req.end();
}


function queryPrinterStatus(){
		
	var post_data = {  
		sn:PRINTER_SN,//打印机编号
		key:KEY,//key
		};     
	var content = qs.stringify(post_data);  
	var options = {  
		hostname:IP,  
		port: 80,  
		path: HOSTNAME+'/queryPrinterStatusAction',  
		method: 'POST',  
		headers: {  
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'  
		}  
	};  
	var req = http.request(options, function (res) {  
		res.setEncoding('utf-8');  
		res.on('data', function (response){
			//response是返回的JSON字符串
			console.log(response);  
		});  
	});
	req.on('error', function (e) {  
		console.log('error!');  
	});  
	req.write(content);    
	req.end();
}

function printQRCode(name, url, callback){
		
	//标签说明："<BR>"为换行符，"<CB></CB>"为居中放大，"<B></B>"为放大,"<QR></QR>"为二维码标签，"<L></L>"为字体变高
	
	//拼凑订单内容时可参考如下格式
	var orderInfo;
	orderInfo = "<CB>" + name + "</CB><BR>";//标题字体如需居中放大,就需要用标签套上
	orderInfo += "----------请扫描二维码----------";
	orderInfo += "<QR>" + url + "</QR>";//把二维码字符串用标签套上即可自动生成二维码
	orderInfo += "<BR>";

	var post_data = {  
		sn:PRINTER_SN,//打印机编号
		printContent:orderInfo,//打印内容
		key:KEY,//key
		times:'1'//打印联数，默认为1
		};     
	var content = qs.stringify(post_data);  
	var options = {  
		hostname:IP,  
		port: 80,  
		path: HOSTNAME+'/printOrderAction',  
		method: 'POST',  
		headers: {  
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'  
		}  
	};  
	var req = http.request(options, function (res) {  
		res.setEncoding('utf-8');  
		res.on('data', function (response){
			//response是返回的JSON字符串
			console.log(response);  
			callback(null, response);
		});  
	});
	req.on('error', function (e) {  
		console.log('error!'); 
		callback(e); 
	});  
	req.write(content);    
	req.end();
}

module.exports.print = printQRCode;
