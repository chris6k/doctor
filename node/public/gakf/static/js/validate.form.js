define(["jquery","jquery.validate","store"],function($,va,store){
	return {
		userName:function(){
			$.validator.addMethod("userName", function(value, element) {
			    return this.optional(element) || /^[\u0391-\uFFE5\w]+$/.test(value);
			}, "用户名只能包括中文字、英文字母、数字和下划线");
		},
		isPhone:function(){
			$.validator.addMethod("isMobile", function(value, element) {
			  var length = value.length;
			  var mobile = /^(((13[0-9]{1})|(15[0-9]{1}))+\d{8})$/;
			  return this.optional(element) || (length == 11 && mobile.test(value));
			 }, "请正确填写您的手机号码");
		},
		format:function(){
			$.format = function (source, params) { 
				if (arguments.length == 1) 
				return function () { 
				var args = $.makeArray(arguments); 
				args.unshift(source); 
				return $.format.apply(this, args); 
				}; 
				if (arguments.length > 2 && params.constructor != Array) { 
				params = $.makeArray(arguments).slice(1); 
				} 
				if (params.constructor != Array) { 
				params = [params]; 
				} 
				$.each(params, function (i, n) { 
				source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n); 
				}); 
				return source; 
			}; 
		},
		validate:function(form){
			this.userName();
			this.isPhone();
			this.format();
			var formName = form;
			if(form == "signForm"){
				$("#signForm").validate({
					errorElement:"em",
					debug:true,
					rules:{
						username:{
							required:true,
							userName:true
						},
						password:{
							 required: true,
	                		 minlength: 6
						}

					},
					messages:{
						username:{
							required:"请输入用户名"
						},
						password: {
			                required: "请输入密码",
			                minlength: $.format("密码不能小于{0}个字符")
			            }
					},
					submitHandler:function(form){
						$.ajax({ 
							type:"post",
							url: "/user/login",
							dataType: "json", 
							data:$("#"+formName).serialize(),
							success: function(d){
								if(d.success){
									store.set('user', { type:d.msg.type,id: d.msg.id });
					        		if(d.msg.url){
					        			url =  d.msg.url;
					        		}else{
					        			if(d.msg.type == "sick"){
					        				url = "/gakf/sickDetail.html";
					        			}else if(d.msg.type == "doctor"){
					        				url = "/gakf/sick.html";
					        			}
					        		}
					        		window.location.href = url;
								}
				    		},
				    		error:function(e){
				    		}
						});
			        }    
				});
			}
			if(form == "regForm"){
				$("#regForm").validate({
					errorElement: "em",
					rules:{
						username:{
							required:true,
							userName:true
						},
						user_mobile:{
							required:true,
							isMobile:true
						},
						password:{
							 required: true,
	                		 minlength: 6
						},
						login_repwd:{
							 required: true,
	                		 minlength: 6,
	                		 equalTo: "#password"
						},
						doctor_name:{
							 required: true
						},
						bed_no:{
							required: true
						},
						hospital:{
							required: true
						}

					},
					messages:{
						username:{
							required:"请输入用户名"
						},
						user_mobile:{
							required:"请输入正确电话号码"
						},
						password: {
			                required: "请输入密码",
			                minlength: $.format("密码不能小于{0}个字符")
			            },
			            login_repwd: {
			                required: "请输入确认密码",
			                minlength: "确认密码不能小于{0}个字符",
			                equalTo: "两次输入密码不一致吆"
			            },
			            doctor_name:{
			            	required:"请输入主治医生"
			            },
			            bed_no:{
							required: "请输入床号"
						},
			            hospital:{
							required: "请输入医院"
						}
					},
					errorPlacement: function(error, element) {
				     	if (element.attr("name") == "phone_vali")
					       error.insertAfter($(element).parent());
					     else
					       error.insertAfter(element);
					   
				   },
				   submitHandler:function(form){
			            $.ajax({ 
							type:"post",
							url: "/user/reg",
							dataType: "json", 
							data:$("#"+formName).serialize(),
							success: function(d){
								if(d.success){
									var dd = d.content;
									store.set('user', { type:dd.type,id: dd.id ,doctor_id:dd.doctor_id});
					        		if(dd.url){
					        			url =  dd.url;
					        		}else{
					        			if(dd.type == "sick"){
					        				url = "/gakf/inpatientInfo.html";
					        			}
					        		}
					        		window.location.href = url;
								}
				    		},
				    		error:function(e){
				    		}
						});
			       }  
				});
			}
		}
	}
});