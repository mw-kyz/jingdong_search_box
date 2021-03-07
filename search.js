// JavaScript Document
window.onload = function() {
	'use strict';
	init();
};
function init() {
	'use strict';
	keySearch();
}
var keySearch = (function() {
	'use strict';
	var searchKw = document.getElementById('J_search_kw'),
		autoKw = document.getElementById('J_autoKw'),
		recomKw = JSON.parse(document.getElementById("J_recomKw").innerHTML),
		kwOrder = 0,
		t = null;
	//添加获取焦点事件
	addEvent(searchKw, 'focus', function() {
		clearInterval(t);
		autoKw.style.color = '#ccc';
		}
	);
	
	//添加失去焦点事件
	addEvent(searchKw, 'blur', function(){
		autoKwShow(this.value, true);
		t = setInterval(autoKwChange, 3000);
	});
	
	addEvent(searchKw, 'input', function() {
		autoKwShow(this.value, false);
	});
			 
	addEvent(searchKw, 'propertychange', function() {
		autoKwShow(this.value, false);
	});
			 
	//添加定时器，并初始化输入框的显示内容
	function setAutoKws() {
		autoKwChange();//初始化一下，否则刚出来是推荐词这三个字
		t = setInterval(autoKwChange, 3000);
	}
	
	//在输入框内循环显示一组内容
	function autoKwChange() {
		var len = recomKw.length;
		autoKw.innerHTML = recomKw[kwOrder];
		kwOrder = kwOrder >= len - 1 ? 0 : kwOrder + 1;
	}
	
	
	//封装事件处理函数的方法，兼容
    function addEvent(el, type, fn){
		if(el.addEventListener){
			el.addEventListener(type, fn, false);
		}else if(el.attachEvent){
			el.attachEvent('on' + type, function(){
			fn.call(el);
			});			 
		}else{
			el['on' + type] = fn;
	    }
	}
	
	function autoKwShow(val,isBlur) {
		if(val.length <= 0){
			autoKw.className = 'auto-kw show';
			autoKw.style.color = isBlur ? '#989898' : '#ccc';
		}else{
			autoKw.className = 'auto-kw hide';
		}
	}
	
	return function() {
		setAutoKws();
	};
})();