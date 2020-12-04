/**
* Created by ruyang on 17-06-15.
*/
(function(window, jQuery) {
	var class2type = {};
	var toString = class2type.toString;
	var hasOwn = class2type.hasOwnProperty;
	var
	document = window.document,

	version = "1.0.0",

	fomoney = function() {
		return new fomoney.fn.init();
	};


	fomoney.fn = fomoney.prototype = {
		ver: version,

		jquery: jQuery,

		constructor: fomoney
	}

	fomoney.extend = fomoney.fn.extend = function() {
		var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

		if (typeof target === "boolean") {
			deep = target;

			target = arguments[i] || {};
			i++;
		}

		if (typeof  target != "object" && !fomoney.isFunction(target)) {
			target = {};
		}

		if (i === length) {
			target = this;
			i--;
		}

		for ( ; i < length; i++) {
			if ((options = arguments[i]) != null) {
				for (name in options) {
					src = target[name];
					copy = options[name];

					if (target === copy) {
						continue;
					}

					if (deep && copy && (fomoney.isPlainObject(copy) || (copyIsArray = fomoney.isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && fomoney.isArray(src) ? src : [];
						}
						else {
							clone = src && fomoney.isPlainObject(src) ? src : {};
						}

						target[name] = fomoney.extend(deep, clone, copy);
					}
					else if (copy != undefined) {
						target[name] = copy;
					}
				}
			}
		}

		return target;
	};

	fomoney.extend({
		isFunction: function(obj) {
			return fomoney.type(obj) === "function";
		},

		isArray: Array.isArray,

		isPlainObject: function(obj) {
			if (fomoney.type(obj) != "object" || fomoney.isWindow(obj)) {
				return false;
			}

			try {
				if (obj.constructor && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
					return false;
				}
			} catch (e) {
				return false;
			}

			return true;
		},

		type: function(obj) {
			if (obj == null) {
				return obj + "";
			}

			return typeof obj === "object" || typeof obj === "function" ?
			class2type[toString.call(obj)] || "object" :
			typeof obj;
		},

		alert: function(obj) {
			alert(obj);
		}
	});

// function
init = fomoney.fn.init = function() {
	return this;
};

init.prototype = fomoney.fn;


fomoney.version = function(isalert) {

	if (typeof isalert === "undefined") {
		isalert = false;
	}

	if (isalert) {
		alert(this.prototype.ver);
	}
	else {
		console.log(this.prototype.ver);
	}
};


/*
fomoney.$ = fomoney.jquery = function() {
return fomoney.prototype.jquery;
}
*/
fomoney.$ = fomoney.jquery = fomoney.prototype.jquery;

var _fomoney = window.fomoney,

_fo = window.fo;

if (window.fo === fomoney) {
	window.fo = _fo;
}

if (window.fomoney === fomoney) {
	window.fomoney = _fomoney;
}

window.fomoney = window.fo = fomoney;

return fomoney;

})(window, jQuery);