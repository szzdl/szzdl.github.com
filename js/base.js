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
    //ele.find('.item:eq(0)').show();
    ele.find('.icon span:eq(0)').addClass('curr');
    var speed = 3000;
    var timer;

    var scroll = function (next) {
        var curr = ele.find('.item:visible');
        if (curr.is(":animated")) {
            return;
        }
        var width = parseInt(curr.width()) + "px";
        var _width = "-=" + width;
        if (next === undefined) {
            next = curr.next();
            if (next.attr('src') === undefined) {
                next = ele.find('.item:eq(0)');
            }
        }
        else if (next.index() < curr.index()) {
            _width = "+=" + width;
            width = "-" + width;
        }
        else if (next.index() == curr.index()) {
            return;
        }
        clearTimeout(timer);
        ele.find('.icon span').removeClass('curr');
        ele.find('.icon span:eq(' + next.index() + ')').addClass('curr');
        next.css({ position: "absolute", left: width, display: "block" })
        	.animate({ left: "-=" + width}, 200);
        curr.animate({ left: "-=" + width }, 200, function () {
            next.css({ position: "relative" });
            curr.css({ left: "0px", display: "none", position: "relative" });
            timer = setTimeout(scroll, speed);
        });
    }

    timer = setTimeout(scroll, speed);

    ele.delegate('.icon span', 'mouseenter', function () {
	    var index = $(this).index();
	    var item = ele.find('.item:eq(' + index + ')');
	    scroll(item);
	});

    var len = ele.find('img').length;

    ele.delegate('img', 'swipeleft', function(event) {
        var index = $(this).index();
        if(index == 0){
            index = len - 1;
        }
        else{
            index++;
        }
        var item = ele.find('.item:eq(' + index + ')');
        scroll(item);
    });

    ele.delegate('img', 'swiperight', function(event) {
        var index = $(this).index();
        if(index == len - 1){
            index = 0;
        }
        else{
            index--;
        }
        var item = ele.find('.item:eq(' + index + ')');
        scroll(item);
        event.preventDefault();
    });
}

ZDL.prototype.scrole_new = function (ele) {
    var timer;
    ele.find("li:lt(2)").show();

    var scroll = function () {
        ele.find("li:lt(2)").show();
        ele.find("ul").animate({ top: "-30px" }, 200, function () {
            ele.find("li:eq(0)").hide().appendTo($(this));
            $(this).css('top', '0px');
            timer = setTimeout(scroll, 4000);
        });
    }

    ele.delegate('li', 'mouseover', function () {
        clearTimeout(timer);
    }).delegate('li', 'mouseout', function () {
        timer = setTimeout(scroll, 4000);
    });
    
    var timer = setTimeout(scroll, 4000);

}

var zdl = new ZDL();
