var ZDL = function(){
	this.base_path = "http://szzdl.github.com";
	this.resources = ['/jquery/css/jquery.mobile-1.3.2.min.css',
					 '/jquery/js/jquery-1.10.1.min.js',
					 '/jquery/js/jquery.mobile-1.3.2.min.js'
					];
};


ZDL.prototype.init = function(){
	var head = document.getElementsByTagName('head')[0];
	var ele = document.createElement('meta');
	ele.setAttribute('charset', 'UTF-8');
	head.appendChild(ele);
	ele = document.createElement('meta');
	ele.setAttribute('name', 'viewport');
	ele.setAttribute('content', 'width=device-width, initial-scale=1');
	head.appendChild(ele);
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

var zdl = new ZDL();
zdl.init();
