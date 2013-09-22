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

ZDL.prototype.scrole_img = function(ele){
	var curr = ele.find('.item:eq(0)').show();
	var next;
	var scroll = function(){
		curr = ele.find('.item:visible');
		next = curr.next();
		if(!next.attr('src')){
			next = ele.find('.item:eq(0)');
		}
		var width = parseInt(curr.width()) + "px";
		next.css({position:"absolute", left:width, top:"0px"})
			.show()
			.animate({left:"0px"}, 1000, function(){
				next.css({position:"relative", left:"0px"});
			});
		curr.animate({left:"-" + width}, 1000, function(){
			curr.hide().css('left', '0px');
		});
	}

	setInterval(scroll, 4000);
}

var zdl = new ZDL();
//zdl.init();
