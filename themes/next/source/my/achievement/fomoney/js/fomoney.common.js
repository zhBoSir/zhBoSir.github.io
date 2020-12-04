/**
 * fomoney.common 基础js
 */
;(function(fomoney, $) {
	
	fomoney.iBase64 = {
		encode: function(a) {
			var b = "",
				d, c, f, g, h, e, k, l = 0;
			do d = a.charCodeAt(l++), c = a.charCodeAt(l++), f = a.charCodeAt(l++), g = d >> 2, h = (d & 3) << 4 | c >> 4, e = (c & 15) << 2 | f >> 6, k = f & 63, isNaN(c) ? (h = (d & 3) << 4, e = k = 64) : isNaN(f) && (k = 64), b = b + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\x3d".charAt(g) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\x3d".charAt(h) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\x3d".charAt(e) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\x3d".charAt(k); while (l < a.length);
			return b
		},
		decode: function(a) {
			var b = "",
				d, c, f, g, h, e = 0;
			a = a.replace(/[^A-Za-z0-9\+\/\=]/g, "");
			do d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\x3d".indexOf(a.charAt(e++)), c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\x3d".indexOf(a.charAt(e++)), g = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\x3d".indexOf(a.charAt(e++)), h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\x3d".indexOf(a.charAt(e++)), d = d << 2 | c >> 4, c = (c & 15) << 4 | g >> 2, f = (g & 3) << 6 | h, b += String.fromCharCode(d), 64 != g && (b += String.fromCharCode(c)), 64 != h && (b += String.fromCharCode(f)); while (e < a.length);
			return b
		}
	}
	
	//地址栏参数
	fomoney.queryString = function(val) {
		var uri = window.location.search;
		uri = uri.substr(1);
		// if(CF.iBase64.encode(CF.iBase64.decode(uri))==uri){
		// 	uri=CF.iBase64.decode(uri);
		// };
		var re = new RegExp("" + val + "=([^&?]*)", "ig");
		return ((uri.match(re)) ? (uri.match(re)[0].substr(val.length + 1)) : null);
	}
	
	//取来源页文件名
	fomoney.getReferPage = function() {
		var referFile = document.referrer;
		referFile = referFile.replace(/\?.*$/, '');
		referFile = referFile.replace(/^.*\//, '');
		return referFile;
	}
	//取当前页文件名
	fomoney.getCurrentPage = function() {
		var curFile = window.location.href;
		curFile = curFile.replace(/\?.*$/, '');
		curFile = curFile.replace(/^.*\//, '');
		return curFile;
	}
	//取文件的本地路径
	fomoney.getObjectURL = function(file) {
		var url = null;
		if (window.createObjectURL != undefined) { // basic
			url = window.createObjectURL(file);
		} else if (window.URL != undefined) { // mozilla(firefox)
			url = window.URL.createObjectURL(file);
		} else if (window.webkitURL != undefined) { // webkit or chrome
			url = window.webkitURL.createObjectURL(file);
		}
		return url;
	}
	// 截取字符串带...
	fomoney.subStrDot = function (str, len, hasDot) {
		if (!str) return "";
		var newLength = 0;
		var newStr = "";
		var chineseRegex = /[^\x00-\xff]/g;
		var singleChar = "";
		var strLength = str.replace(chineseRegex, "**").length;
		for (var i = 0; i < strLength; i++) {
			singleChar = str.charAt(i).toString();
			if (singleChar.match(chineseRegex) != null) {
				newLength += 2;
			} else {
				newLength++;
			}
			if (newLength > len) {
				break;
			}
			newStr += singleChar;
		}
		if (hasDot && strLength > len) {
			newStr += "...";
		}
		return newStr;
	}
	
	//跳转到Obj位置中间
	fomoney.scrollToObjCenter = function (elm) {
		setTimeout(function() {
			var scroll_offset = $(elm).offset();
			console.log((scroll_offset.top - $(window).height() / 2));
			$(document.body).stop().animate({
				scrollTop: (scroll_offset.top - $(window).height() / 2)
			}, 100);
		}, 100);
	}
	
	//本地存储
	fomoney.setLocalData = function(skey, svalue) {
		if (window.localStorage) {
			window.localStorage.setItem(skey, svalue);
		} else {
			var exdate = new Date();
			exdate.setYear(exdate.getYear() + 6);
			document.cookie = skey + "=" + escape(svalue) + ";expires=" + exdate.toGMTString();
		};
	}
	fomoney.setSessionData = function(skey, svalue) {
		if (window.sessionStorage) {
			window.sessionStorage.setItem(skey, svalue);
		};
	}
	//本地读取
	fomoney.getLocalData = function(skey) {
		var result_val = "";
		if (window.localStorage) {
			result_val = window.localStorage.getItem(skey);
		} else {
			var re = new RegExp(skey + "=([^;$]*)", "i");
			result_val = re.test(unescape(document.cookie)) ? RegExp["$1"] : "";
		};
		return result_val;
	}
	fomoney.getSessionData = function(skey) {
		var result_val = "";
		if (window.sessionStorage) {
			result_val = window.sessionStorage.getItem(skey);
		};
		return result_val;
	}
	//本地清除
	fomoney.clearLocalData = function(skey) {
		if (window.localStorage) {
			window.localStorage.setItem(skey, "");
			window.localStorage.removeItem(skey);
		} else {
			document.cookie = skey + "=" + escape("") + ";expires=1";
		};
	}
	fomoney.clearSessionData = function(skey) {
		if (window.sessionStorage) {
			window.sessionStorage.setItem(skey, "");
			window.sessionStorage.removeItem(skey);
		} else {
			document.cookie = skey + "=" + escape("") + ";expires=1";
		};
	}
	// 统一调用接口
	fomoney.callInterface = function(options, Refunc , err_Refunc, err_callback_all) {
		if (options) {
			var url = fomoney.apiUrl+options.url;
			var method = options.method;
			if(!method)method="get";
			var dataType = options.dataType;
			if(!dataType)dataType = "JSON";
			
			$.ajax({
				timeout: 600000,
				url: url,
				type: method,
				dataType: dataType,
				data: options.data,
				header:{
					'Access-Control-Allow-Origin': '*'
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					console.error("发生点小问题，请检查网络或者稍后再试！..");
					if (err_Refunc) err_Refunc(null);
				},
				success: function(response) {
					console.log(response);
					if(response.code==200){
						Refunc(response.data);
					} else {
						if (err_Refunc){
							if (err_callback_all) {
								err_Refunc(response);
							}else {
								err_Refunc(response.code);
							};
						}
					};
				}
			});
		};
	}

})(fomoney, jQuery);
