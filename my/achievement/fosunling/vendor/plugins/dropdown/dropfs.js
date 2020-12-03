function DropDown(el) {
	this.dd = el;
	this.placeholder = this.dd.children('span');
	this.defaulttext = this.placeholder.text();
	this.opts = this.dd.find('ul.dropdown > li');
	this.inpfs = this.dd.children('input');
	this.textc = '';
    this.index = -1;
    this.initEvents();
}
DropDown.prototype = {
    initEvents: function() {
        var obj = this;
        obj.dd.on('click', function(event) {
	        $(this).toggleClass('active');
	        return false;
	    });
	    obj.opts.on('click', function() {
	        var opt = $(this);
	        if(opt.attr("class")=='dropclear'||opt.attr("fs-data")==0){
	        		obj.inpfs.val(0);
	        		obj.textc = obj.defaulttext;
	        		obj.index = -1;
	        }else{
			        obj.inpfs.val(opt.attr("fs-data"));
			        obj.textc = '选用: ' + opt.text();
			        obj.index = opt.index();
	        }
	        obj.placeholder.text(obj.textc);
	        console.log(obj.inpfs.val());
        });
    }
}
$(function(){
	$(document).click(function() {
        $(".wrapper-dropdown-fs").removeClass('active');
    });
});
