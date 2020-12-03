// 真正的勇士,敢于写没有注释的代码,直面没有文档的项目
var fosunUtil = "0.1";
var cardRule = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/;//身份证卡号验证正则;
var nameRule = /[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*/;//姓名正则;
var pwdRule = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/;//6-20,数字,字母至少2种 正则;
var phoneRule = /(^1[3|5|7|8][0-9]{9}$)/;//手机号正则
var telRule = /(^1[3|5|7|8][0-9]{9}$)/;//电话号码 
var emailRule = /^\s*\w+(?:\.{0,1}[\w-]+)*@[a-zA-Z0-9]+(?:[-.][a-zA-Z0-9]+)*\.[a-zA-Z]+\s*$/;//邮箱正则
var codeRule = /^[0-9]*$/;//验证码
var tradePwdRule = /^[0-9]{6}$/;//交易密码
var postCodeRule = /^[1-9][0-9]{5}$/;//邮编 
var numberRule = /^-?[0-9]*\\.[0-9]*$/;//数字校验
var znumberRule = /^[1-9]\d*$/;//正整数
var amountRule=/^(([1-9]\d*)|\d)(\.\d{1,2})?$/;//金额校验

var FsValidator = { 
	// 邮箱 
	isEmail : function(s) { 
		return this.test(s, emailRule); 
	}, 

	// 手机号码 
	isMobile : function(s) { 
		return this.test(s, phoneRule); 
	}, 

	// 电话号码 
	isPhone : function(s) { 
		return this.test(s, telRule); 
	}, 

	// 邮编 
	isPostCode : function(s) { 
		return this.test(s, postCodeRule); 
	}, 

	// 数字 
	isNumber : function(s, d) { 
		return !isNaN(s.nodeType == 1 ? s.value : s) && (!d || !this.test(s, numberRule)); 
	}, 
	
	// 正整数
	isZNumber : function(s) {
		console.log(this.test(s, znumberRule));
		return !isNaN(s.nodeType == 1 ? s.value : s) && this.test(s, znumberRule); 
	}, 
	
	// 金额
	isAmount : function(s) { 
		return this.test(s, amountRule); 
	},

	// 判断是否为空 
	isEmpty : function(s) { 
		return !jQuery.isEmptyObject(s); 
	}, 

	// 正则匹配 
	test : function(s, p) { 
		s = s.nodeType == 1 ? s.value : s; 
		return new RegExp(p).test(s); 
	} 
}; 

/**对日期进行格式化*/  
function dateFormat(date, format){  
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
        if (v !== undefined) {  
            if (all.length > 1) {  
                v = '0' + v;  
                v = v.substr(v.length - 2);  
            }  
            return v;  
        }  
        else if (t === 'y') {  
                return (date.getFullYear() + '').substr(4 - all.length);  
            }  
        return all;  
    });  
    return format;  
}

/***分割银行卡号*/
function formatBankNo(BankNo){
    if (BankNo.value == "") return;
    var account = new String (BankNo.value);
    account = account.substring(0,25); /*帐号的总数, 包括空格在内 */
    if (account.match (".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}") == null){
        /* 对照格式 */
        if (account.match (".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}|" + ".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}|" +
        ".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}|" + ".[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{7}") == null){
            var accountNumeric = accountChar = "", i;
            for (i=0;i<account.length;i++){
                accountChar = account.substr (i,1);
                if (!isNaN (accountChar) && (accountChar != " ")) accountNumeric = accountNumeric + accountChar;
            }
            account = "";
            for (i=0;i<accountNumeric.length;i++){    /* 可将以下空格改为-,效果也不错 */
                if (i == 4) account = account + " "; /* 帐号第四位数后加空格 */
                if (i == 8) account = account + " "; /* 帐号第八位数后加空格 */
                if (i == 12) account = account + " ";/* 帐号第十二位后数后加空格 */
                if (i == 16) account = account + " ";/* 帐号第十二位后数后加空格 */
                account = account + accountNumeric.substr (i,1)
            }
        }
    }
    else{
        account = " " + account.substring (1,5) + " " + account.substring (6,10) + " " + account.substring (14,18) + "-" + account.substring(18,25);
    }
    if (account != BankNo.value) BankNo.value = account;
}

/**验证数字格式 */
function formatMoney(s) {
	if (/[^0-9\.\-]/.test(s) || s == null || s == "")
		return "0";
	s = s.toString();
	var after_tmp = '';
	var pos = s.indexOf(".");
	if (pos > 0) {
		var before = s.substr(0, pos);
		var after = s.substr(pos + 1, 2).replace(/\./, "");
		var len = after.length;
		for (i = 0; i < (2 - len); i++) {
			after = len <= 1 ? after + '0' : '0' + after;
		}
		before = /^\-?\d+$/.test(before) ? before : '0';
		s = (before + '.' + after);
	} else {
		s = /^\-?\d+$/.test(s) ? s + '.00' : '0.00';
	}
	return s;
}

/** 将数值四舍五入(保留2位小数)后格式化成金额形式 */  
function formatCurrency(num) {  
    num = num.toString().replace(/\$|\,/g,'');  
    if(isNaN(num))  
    num = "0";  
    sign = (num == (num = Math.abs(num)));  
    num = Math.floor(num*100+0.50000000001);  
    cents = num%100;  
    num = Math.floor(num/100).toString();  
    if(cents<10)  
    cents = "0" + cents;  
    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)  
    num = num.substring(0,num.length-(4*i+3))+','+  
    num.substring(num.length-(4*i+3));  
    return (((sign)?'':'-') + num + '.' + cents);  
}

//跳转地址
function goUrl(rurl){
	window.location.href = rurl;
}

//地址 参数 正确函数  
function callInterface(i_Url, i_Data, Refunc , i_Type , i_Async , err_Refunc) {
	var posttype, pdata, pasync;
	if (i_Url) {
		posttype = i_Type ? i_Type : "post";
		pdata = i_Data;
		pasync = i_Async ? false : true;
		$.ajax({
			timeout: 600000,
			url: i_Url,
			type: posttype,
			dataType: "json",
			async:pasync,
			data: pdata,
			complete:function(XMLHttpRequest, textStatus){
				//console.log('readyState=' + XMLHttpRequest.readyState + ' status=' + XMLHttpRequest.status + ' responseText=' + XMLHttpRequest.responseText + ' textStatus=' + textStatus);
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				console.log('readyState=' + XMLHttpRequest.readyState + ' status=' + XMLHttpRequest.status + ' responseText=' + XMLHttpRequest.responseText + ' textStatus=' + textStatus);
				lalert("发生点小问题，请检查网络或者稍后再试！..");
				if (err_Refunc) err_Refunc(null);
			},
			success: function(result) {
				//console.log(JSON.stringify(result));
				Refunc(result);
			}
		});
	};
};

/**form表单转换为json字符串*/
function getFormJson(form) {
	var o = {};
	var a = $(form).serializeArray();
	$.each(a, function () {
		if (o[this.name] !== undefined) {
			if (!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
}

/**layer alert 封装*/
//不带图标的
function lalert(text){
	layer.alert(text,{shade: [0.1,'#c5c5c5']});
}
//带图标的
function lalert(text,i){
	layer.alert(text,{icon:i,shade: [0.1,'#c5c5c5']});
}
//带回调函数的确认框
function lconfirm(text,btnn,FunYes){
	layer.confirm(text,{
		shade: [0.1,'#c5c5c5']
		,btn: [btnn,'关闭'] //按钮
	    ,yes:function(index){
			FunYes(index);
		},no:function(index){
			layer.close(index);
		}
	});
}
//带回调函数的确认框
function lconfirm(text,i,btnn,FunYes){
	layer.confirm(text,{
		icon:i
		,shade: [0.1,'#c5c5c5']
		,btn: [btnn,'关闭'] //按钮
	    ,yes:function(index){
			FunYes(index);
		},no:function(index){
			lclose(index);
		}
	});
}
//loading 指定时间后关闭
function lloading(text,time){
	var index = layer.msg(text, {
		time:time
		  ,icon:16
		  ,shade: [0.1,'#c5c5c5'] //0.1透明度的白色背景
	});
}
//loading 手动关闭加载层
function lloadfun(text){
	return layer.msg(text, {
		time:0
		  ,icon:16
		  ,shade: [0.1,'#c5c5c5'] //0.1透明度的白色背景
	});
}
//关闭指定层
function lclose(index){
	layer.close(index);
}
//关闭所有层
function lcloseAll(){
	layer.closeAll();
}



	
