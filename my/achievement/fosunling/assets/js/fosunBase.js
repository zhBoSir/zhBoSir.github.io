// 真正的勇士,敢于写没有注释的代码,直面没有文档的项目
var fosunBase = function () {
	return {
		init:function(){
			fosunBase.scrollDownFixed();
			fosunBase.menuDropbox();
		},
		scrollDownFixed:function(){//导航菜单显示始终在顶部
			$(window).bind("scroll",fn = function(){
				var scrollTop = $(window).scrollTop();
				if (scrollTop > 100){
					$(".header-nav-wrap").addClass("hn-fixed");
					//$(".header-nav-wrap-inner").sticky({topSpacing:0});
					$(".header-nav-wrap-inner").animate({top:0},"slow");
				}else{
					//$(".header-nav-wrap-inner").stop();
					//$(".header-nav-wrap-inner").unstick();
					$(".header-nav-wrap").removeClass("hn-fixed");
				}
	
			})
		},
		menuDropbox:function(){//鼠标移上显示二维码
			//$(".dropdown").toggle('data-hover');
			$(".dropdown").mouseover(function(){
				$(this).addClass($(this).attr("data-hover"));
			});
			$(".dropdown").mouseout(function(){
				$(this).removeClass($(this).attr("data-hover"));
			});
		},
		eyeBtn:function(){
			$("#eyes_btn").on("click",function(){
				if($(this).attr("class").indexOf("icon-bukejian")>0){
					$(this).removeClass("icon-bukejian");
					$(this).addClass("icon-eye");
					$(this).prev().attr("type","text");
				}else{
					$(this).addClass("icon-bukejian");
					$(this).removeClass("icon-eye");
					$(this).prev().attr("type","password");
				}
			});
		},
		tblsBind:function(){
			$(".tabs li").bind("click", function () {
			 	$(this).parent().children("li").removeClass("active");
			 	$(this).addClass("active");
		       	$(".tab-context div.tab-fade").hide();
		       	$(".tab-context div.tab-fade#"+$(this).find("a").attr("fs-data")).show();
		    });
		},
		chartsBind:function(){
			$('.easypiechart').each(function() {
		        var $this = $(this), $data = $this.data(), $step = $this.find('.step'), $target_value = parseInt($($data.target).text()), $value = 0;
		        $data.barColor || ($data.barColor = function($percent) {
		            $percent /= 100;
		            return "rgb(" + Math.round(200 * $percent) + ", 200, " + Math.round(200 * (1 - $percent)) + ")";
		        });
		        $data.onStep = function(value) {
		            $value = value;
		            $step.text(parseInt(value));
		            $data.target && $($data.target).text(parseInt(value) + $target_value);
		        }
		        $data.onStop = function() {
		            $target_value = parseInt($($data.target).text());
		            $data.update && setTimeout(function() {
		                $this.data('easyPieChart').update(100 - $value);
		            }, $data.update);
		        }
		        $(this).easyPieChart($data);
		    });
		},
		dropDownBind:function(obj){
			new DropDown(obj);
		},
		laytipBind:function(){
			var $laytip = $(".laytip");
			var laydata = $($laytip.attr("fs-laytip-data")).html();
			var layx = $laytip.attr("fs-laytip-x");
			$laytip.on("mouseover",function(){
				layer.tips(laydata, this, {
				  time:0,
				  area : ['310px' , 'auto'],
				  tips: [layx, '#9F9F9F']
				});
			});
			$laytip.on("mouseout",function(){
				layer.closeAll();
			});
		}
	}
}();
