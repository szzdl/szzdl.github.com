
var image_path = "../image/guess/";
var data = ["名侦探柯南","张无忌","海贼王","七龙珠","火影","妖精的尾巴","杨过","哆啦a梦","熊出没","海绵宝宝","诺基亚","聪明的一休","段誉","圣斗士星矢","机器猫","魔神英雄传","摩托罗拉","灌篮高手","足球小将","宠物小精灵","中华小当家","变形金刚","忍者神龟","大力水手","蓝精灵","猫和老鼠","葫芦兄弟","小龙女","微软","苹果"];
var data_copy = [];
//console.log(words);
var true_name;
var answer = '';
var ele_words = $(".main-words");
var ele_answer = $(".main-answer");
var img = $("#main_img");

var next = function(){
	var index = parseInt(img.attr('current'));
	if(index == data.length - 1){
		index = -1;
	}
	index++;
	init(index);
}

var rand_words = function(){
	var words = [];
	data_copy.sort(function(){return 0.5 - Math.random()});
	for(var c in true_name){
		words.push("<b>" + true_name[c] + "</b>");
	}
	console.log("正确答案：" + true_name);
	while(words.length < 30){
		var one_name = data_copy.pop();
		for(var c in one_name){
			words.push("<b>" + one_name[c] + "</b>");
			if(words.length == 30){
				break;
			}
		}
	}
	words.sort(function(){return 0.5 - Math.random()});
	ele_words.html(words);
	ele_words.delegate('b', 'click', add_answer);
}

var add_answer = function(){
	if(!$(this).html()){
		return;
	}
	var target = ele_answer.find('b:empty').get(0);
	if(!target){
		return;
	}
	ele = $(this);
	$(target).html(ele.html()).data('target', ele);
	ele.html('');

	var target = ele_answer.find('b:empty').get(0);
	if(target){
		return;
	}
	if(check_answer()){
		next();
	}
	else{
		ele_answer.find('b').css('color', 'red');
	}
}


var remove_answer = function(){
	var ele = $(this);
	var c = ele.html();
	if(!c){
		return;
	}
	ele.data('target').html(c);
	ele.data('target','').html('');
	ele_answer.find('b').css('color', '#F3F3F3');
}

var random_num = function(){
	return Math.floor(Math.random() * data.length);
}

var check_answer = function(){
	var bs = ele_answer.find('b');
	var name = '';
	for(var i = 0; i < bs.length; i++){
		name += bs[i].innerHTML;
	}
	return name == true_name;
}

var init = function(index){
	if(!index){
		index = random_num();
	}
	true_name = data[index];
	img.attr('src', image_path + true_name + '.jpg').attr('current', index);
	data_copy = data.concat();
	data_copy.splice(index, 1);
	ele_answer.html('');
	answer.data = [];
	answer.ele = [];
	for(var i = 0; i<true_name.length; i++){
		ele_answer.append('<b></b>');
	}
	rand_words();
	ele_answer.delegate('b', 'click', remove_answer);
}


$(function(){
	$("#btn_skip").click(next);
	init();
});