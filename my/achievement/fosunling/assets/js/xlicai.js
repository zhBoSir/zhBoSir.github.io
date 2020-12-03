var xlicai = function () {
	return {
		investVlidateExt:function(caninvenstment,startpoint,incremental){
			//投资金额小于起始金额验证
			jQuery.validator.addMethod("startpoint", function(value, element) {   
			    var flag = true;
			    if(caninvenstment>=startpoint){
			    	flag = value>=startpoint?true:false;
			    }else if(caninvenstment==0){
			    	flag = false;
			    }
			    return this.optional(element) || flag;
			}, "投资金额不能小于{0}元");
			
			//投资金额整数倍验证
			jQuery.validator.addMethod("incremental", function(value, element) {   
			    var flag = true;
			    if(caninvenstment>=startpoint){
			    	flag = value%incremental==0?true:false;
			    }
			    return this.optional(element) || flag;
			}, "投资金额需{0}整数倍");
			
			//剩余金额全部投资
			jQuery.validator.addMethod("allinvest", function(value, element) {   
			    var flag = true;
			    if(startpoint>caninvenstment){
			    	flag = value==caninvenstment?true:false;
			    }
			    return this.optional(element) || flag;
			}, "剩余金额不足{0}，需全部认购");
	   },
	   investForm:function(caninvenstment,startpoint,incremental){
		   $("#investForm").validate({
				onfocusout:false,
			    rules: {
			      investAmount: {
			        required: true,
			        max:caninvenstment,
			        startpoint:startpoint,
			        incremental:incremental,
			        allinvest:startpoint
			      }
			    },
			    messages: {
			      investAmount: {
			        required: "请输入投资金额",
			        max: "投资金额不能大于{0}元"
			      }
			    },
			    errorPlacement: function(error, element) {  
			    	$("#errorMsg").html(error[0].innerText);
				},
			    submitHandler:function(form){
			    	//$.get(spath+'/',function);
			    	var index = lloadfun('提交数据请稍后...');
			    	var options = {
					 	dataType: 'json',
				        success: function(json){
				        	lclose(index);
				        	console.log(json);
				        	var btnGoText="确认";
				        	var gurl;
				        	if(json.httpCode==403001){
				        		btnGoText="设置实名认证";
				        		gurl = "/account/setrealname";
				        	}else if(json.httpCode==403005){
				        		btnGoText="设置支付密码";
				        		gurl = "/account/setsinapaypass";
				        	}else if(json.httpCode==403006){
				        		btnGoText="设置委托扣款";
				        		gurl = "/account/setwithholdauthoity";
				        	}else if(json.httpCode==500){
				        		lalert(json.message,1);
				        		return;
				        	}else{
				        		lloadfun('正在提交支付请稍后...');
				        		goUrl(json.redirectTo);
				        		return;
				        	}
				        	lconfirm(json.message,0,btnGoText,function(){ goUrl(gurl);});
				        },
				        error:function(){lclose(index);console.log('error');}
				    };
			    	lconfirm("确认购买当前产品吗？",0,"确认购买",function(){ 
			    		$(form).ajaxSubmit(options); 
			    	});
		        }
		    });
	    }
	    
	}
}();