var ZDL = function(){};

ZDL.prototype.init = function(){
	var head = document.getElementsByTagName('head')[0];
	for(var key in this.resources){
		var path = this.base_path + this.resources[key];
		var end = path.substr(path.length - 3, 3);
		if(end == '.js'){
			ele = document.createElement('script');
			ele.setAttribute('type', 'text/javascript');
			ele.setAttribute('src', path);
		}
		else if(end == 'css'){
			ele = document.createElement('link');
			ele.setAttribute('rel', 'stylesheet');
			ele.setAttribute('type', 'text/css');
			ele.setAttribute('href', path);
		}
		head.appendChild(ele);
	}
}

ZDL.prototype.scrole_img = function (ele) {
    var curr = ele.find('.item:eq(0)').show();
    ele.find('.icon span:eq(0)').addClass('curr');
    
    var scroll = function (next) {
        ele.find('.item').stop();
        curr = ele.find('.item:visible');
        if(!next){
            next = curr.next();
            if(next.attr('src') === undefined){
                next = ele.find('.item:eq(0)');
            }
        }
        ele.find('.icon span').removeClass('curr');
        ele.find('.icon span:eq(' + next.index() + ')').addClass('curr');

        var width = parseInt(curr.width()) + "px";
        next.css({position:"absolute", left:width, top:"0px"})
        	.show()
        	.animate({left:"0px"}, 9000, function(){
        	    next.css({ position: "relative", left: "0px" });
        	});
        curr.animate({left:"-" + width}, 9000, function(){
        	curr.hide().css('left', '0px');
        });
    }

	setInterval(scroll, 10000);

	ele.delegate('.icon span', 'mouseover', function () {
	    scroll($(this));
	});
}

var zdl = new ZDL();
//zdl.init();
