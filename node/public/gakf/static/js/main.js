//chart type
require.config({
    baseUrl:"./static/js",
    map: {
        '*': {
            'css': 'css'
        }
    },
    shim:{
    	'jquery.validate': ['jquery'],
	    'bootstrap':['jquery'],
        'question':['template'],
        'zyUpload':['jquery'],
        'zyFile':['jquery'],
        'upload':['css!../css/zyUpload.css','jquery','zyUpload','zyFile'],
        'avalon':["jquery"],
        'template':['jquery'],
        'validate.form':['store'],
        "qrcode":["jquery","jquery.qrcode"],
        "cookie":["jquery"],
        "store":["cookie","resource"]
    },
	paths: {
		"jquery": "jquery-1.11.1.min",
		"jquery.validate":"jquery.validate.min",
        "bootstrap":"bootstrap.min",
        "validate.form":"validate.form",
        "template":"template",
        "question":"question",
        "upload":"upload",
        "zyFile":"zyFile",
        "zyUpload":"zyUpload",
        "avalon":"avalon",
        "resource":"resource",
        "store":"store.min",
        'index':'index',
        "jquery.qrcode":"jquery.qrcode",
        "qrcode":"qrcode",
        "wx":"jweixin-1.0.0",
        "cookie":"jquery.cookie"
	}
});

require(["jquery","bootstrap"],function ($,bt) {

});
