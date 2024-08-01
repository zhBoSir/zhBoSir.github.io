(function($){
    $.fn.fosunPage = function(options){
        var defaults = {
            url:"demo.do",
			data:{pageSize: 20, pageNo: 1},
			beforeGet:function(){
			},
			success:function(){
			},
			searchBtn:"",
			searchParam:{}
        },_this=this;
		this.HPAG = $.extend(defaults, options);
        var $t=$(this);
        if(this.HPAG.data.pageNo === null || this.HPAG.data.pageNo < 1){
        	this.HPAG.data.pageNo = 1;
        }
        this.HPAG.currPage = this.HPAG.data.pageNo;
        if(this.HPAG.data.pageSize === null || this.HPAG.data.pageSize < 1){
        	this.HPAG.data.pageSize = 10;
        }
        
        //getData
		this.getData=function(){
			//$t.find(".hpg_loading").removeClass("hpg_loading_nowait").addClass("hpg_loading_wait");
			_this.beforeGet();
			var param = _this.HPAG.searchParam;
			for(var item in param){
				eval('_this.HPAG.data.'+item+' = $("#"+param[item]).val()');
			}
			_this.HPAG.data._HPAG_random = (new Date()).getTime();
			
			$.ajax({
				url: this.HPAG.url,
				type: "post",
				data: this.HPAG.data,
				dataType: "json",
				contentType: "application/x-www-form-urlencoded; charset=utf-8",
				success: function (json) {
					var jsonData = json.data;
					_this.HPAG.currPage = _this.HPAG.data.pageNo;
					var pageCount = jsonData.totalPages;
					_this.HPAG.pageCount = pageCount;
					//var dataList = jsonData.records;
					//console.log(dataList);
					_this.success(jsonData);
					
					var totalRecords = jsonData.totalRecords;
					_this.render(_this.HPAG.currPage,pageCount,totalRecords);
				}
			});
		};
		
		this.beforeGet=this.HPAG.beforeGet;
		this.success=this.HPAG.success;
		
		this.render=function(currPage,numPages,totalRecords){
			
			/**var html = "<div class='col-md-6 hidden-sm'><p class='text-muted m-t'>当前第"+currPage+"/"+numPages+"页  共"+totalRecords+"条记录</p></div>";
			html+="<div class='col-md-6 col-sm-12 text-right text-center-xs'>";
			*/
			var html="<div class='pagination' id=''>";
			if(currPage==1){
				html+="<span class='current prev disabled'>&laquo;</span>";
				html+="<span class='current prev disabled'>上一页</span>";
			}else{
				html+="<a href='javascript:;' id='goto_f'>&laquo;</a>";
				html+="<a href='javascript:;' id='goto_l'>上一页</a>";
			}
			
			if(numPages == 0 || numPages == 1){
				html+="<span class='current'>1</span>";
			}else if(numPages > 1){
				for(var l_i = currPage - 5 ; l_i < currPage ; l_i ++){
					if(l_i > 0){
						html += "<a class='np' href='javascript:;' id='go_to_"+l_i+"'>"+l_i+"</a>";
					}
				}
				
				html += "<span class='current'>"+currPage+"</span>";
				
				for(var r_i = parseInt(currPage) + 1 ; r_i < parseInt(currPage) + 5; r_i ++){
					if(r_i <= numPages){
						html += "<a class='np' href='javascript:;' id='go_to_"+r_i+"'>"+r_i+"</a>";
					}
				}
			}
			if(numPages==currPage){
				html+="<span class='current prev disabled'>下一页</span>";
				html+="<span class='current prev disabled'>&raquo;</span>";
			}else{
				html+="<a href='javascript:;' id='goto_r'>下一页</a>";
				html+="<a href='javascript:;' id='goto_e'>&raquo;</a>";
			}
			html+="</div>";
			
			if(totalRecords<=0){
				$t.html("<div style='width: 100%;text-align: center; font-size: 14px;font-weight: 700;height: 45px;line-height: 45px;'>暂无记录</div>");
			}else{
				$t.html(html);
			}
			
		};
		
		this.gotoPage=function(page){
			var strP=/^\d+$/;
			if(strP.test(page)){
  				if(page < 1){
					_this.HPAG.data.pageNo = 1;
				} else if(page > eval(_this.HPAG.pageCount)){
					_this.HPAG.data.pageNo = _this.HPAG.pageCount;
				} else {
					_this.HPAG.data.pageNo = page;
				}
				_this.getData();
  			} else {
  				_this.HPAG.data.pageNo = 1;
  				_this.getData();
  			}
		};
		
		_this.getData();
		
		$t.on("click","div.pagination a#goto_f",function(){
			if(_this.HPAG.currPage == 1){return false}
			_this.HPAG.data.pageNo = 1;
			_this.getData();
		});
		$t.on("click","div.pagination a#goto_l",function(){
			if(_this.HPAG.currPage == 1){return false}
			_this.HPAG.data.pageNo = _this.HPAG.currPage - 1;
			_this.getData();
		});
		$t.on("click","div.pagination a#goto_r",function(){
			if(_this.HPAG.currPage == _this.HPAG.pageCount){return false}
			_this.HPAG.data.pageNo = parseInt(_this.HPAG.currPage) + 1;
			_this.getData();
		});
		$t.on("click","div.pagination a#goto_e",function(){
			if(_this.HPAG.currPage == _this.HPAG.pageCount){return false}
			_this.HPAG.data.pageNo = parseInt(_this.HPAG.pageCount);
			_this.getData();
		});
		$t.on("click","div.pagination a.np",function(e){
			_this.gotoPage(parseInt($(this).html()));
			$t.blur();
		});
		if(_this.HPAG.searchBtn != null && _this.HPAG.searchBtn != ""){
			$("#"+_this.HPAG.searchBtn).on("click",function(){
				_this.HPAG.data.pageNo = 1;
	  			_this.getData();
			});
		}
		
		return this;
    };
})(jQuery);