var ZDL = function(){
	this.base_path = "szzdl.github.com";
	this.resources = ['/jquery/css/jquery.mobile-1.3.2.min.css',
					 '/jquery/js/jquery-1.10.1.min.js',
					 'jquery/js/mobile-1.3.2.min.js'
					];
}

ZDL.prototype.init = function(){
	for(var key in this.resources){
		var path = this.base_path + this.resources[key];
		var end = path.substr(path.length - 3, 3);
		var ele;
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
	}
}
