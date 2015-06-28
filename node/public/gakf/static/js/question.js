define(["jquery","template"],function($,template){
	return {
		createItem:function(data){
			this.resetBtn();
			var tpl = $("#test").html();
			var render = template.compile(tpl);
			
			//匹配json内容
		    var html = render(data);
		    //输入模板
		    $("#questionCon").html(html);
		    $('input:radio[name="answer"]').on("change",function(){
		    	$("#next")[0].disabled = false;
		    	$("#next").addClass("btn-danger");
		    })
		},
		getAnser:function(){
			var answer = $('input:radio[name="answer"]:checked').attr("alt"),
			key = $("#itemTitle").attr("alt"),
			list = $("#answerList").val(),
			temp = {};
			temp[key] = answer;
			return temp;
		},
		resetBtn:function(){
			$("#next")[0].disabled = true;
		    $("#next").removeClass("btn-danger");
		}
	}
});