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
RC['setvmodel'] = function(data,tempobj){
    vmodel = avalon.define({
          $id: "test",
          d:data,
          click:function(e){
            var list = $(this).parent().find(".selected .qtitle"),value = $(this).parent().parent().find(".keys"),temp=[],index = $(this).parent().parent().attr("alt");
            for(var i=0;i<list.length;i++){
                temp.push($(list[i]).html());
            }
            vmodel.d.items[index].value = temp;
            console.log(vmodel.d.$model);
          },
          blur:function(){
            var temp = [],index = $(this).parent().parent().parent().parent().attr("alt"),list=$(this).parent().parent().parent().find("input");
            for(var i=0;i<list.length;i++){
                temp.push($($(list).get(i)).val());
            }
            vmodel.d.items[index].value = temp;
            console.log(vmodel.d.$model);
          },
          save:function(){
            var tempd ={
                table_type:tempobj.table_type,
                sick_id:data.id,
                table:JSON.stringify(vmodel.d.$model)
            };
                $.ajax({ 
                    type:"post",
                    url: "/sick/savestatus",
                    dataType: "json", 
                    data:tempd,
                    success: function(d){
                        if(d.success){
                            window.location.href = "/gakf/sickDetail.html";
                        }else{
                            alert(d.msg);
                        }
                    },
                    error:function(e){
                    }
                });
          }
    });
    avalon.scan();
    return vmodel;
};


RC['setItem'] = function (d){
    for(var i=0;i<d.items.length;i++){
            var temp = d.items[i];
            if(temp.type == "checkbox"|| temp.type == "radio"){
                for(var j = 0;j<temp.value.length;j++){
                    $("span:contains("+temp.value[j]+")").parent().parent().trigger("touchstart");
                }
            }else if(temp.type == "input"){
                for(var j = 0;j<temp.keys.length;j++){
                    $("span:contains("+temp.keys[j].key+")").parent().parent().find(".inputvalue").val(temp.value[j]);
                }
            }
        }
}
RC['selected'] = function (obj,type){
        var t = "yellowtag",type = !type?0:type,unit="";
        if(!$(obj).data("isSelected")){
            $(obj).addClass("selected");
            $(obj).find(".tag").addClass(t);
            if(+type>0){
                unit = "+";
            }else {
                unit = "";
            }
            $(obj).find(".tagcon").html(unit+type+"分");
            $(obj).data("isSelected",true);
        }else{
            $(obj).removeClass("selected");
            $(obj).find(".tag").removeClass(t);
            $(obj).data("isSelected",false);
            $(obj).find(".tagcon").html("");
        }   
    }
RC['remove'] = function (obj){
    var t = "yellowtag";
    $(obj).removeClass("selected");
    $(obj).find(".tag").removeClass(t);
    $(obj).data("isSelected",false);
    $(obj).find(".tagcon").html("");
}