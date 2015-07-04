window.RC={};
RC["parseOptions"]=function  (src) {
	 var options = {}, g, f, c, a, e;
    g = /\?(.*)|#(.*)/.exec(src);
    if (g) {
        g = g[0].slice(1).replace("+", " ").split(/[&;]/g);
        for (f = 0; f < g.length; f++) {
            c = g[f].split("=");
            a = decodeURIComponent(c[0]);
            e = "";
            if (c.length != 1) e = decodeURIComponent(c[1]);
            options[a] = e;
        }
    }
	return options;// body...
};
RC["dateFormat"] = function (date, format) {

    date = new Date(date);

    var map = {
        "M": date.getMonth() + 1, //月份 
        "d": date.getDate(), //日 
        "h": date.getHours(), //小时 
        "m": date.getMinutes(), //分 
        "s": date.getSeconds(), //秒 
        "q": Math.floor((date.getMonth() + 3) / 3), //季度 
        "S": date.getMilliseconds() //毫秒 
    };
    format = format.replace(/([yMdhmsqS])+/g, function(all, t){
        var v = map[t];
        if(v !== undefined){
            if(all.length > 1){
                v = '0' + v;
                v = v.substr(v.length-2);
            }
            return v;
        }
        else if(t === 'y'){
            return (date.getFullYear() + '').substr(4 - all.length);
        }
        return all;
    });
    return format;
};