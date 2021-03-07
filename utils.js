// JavaScript Document
//封装typeof，细分数据类型
function myTypeof(val) {
	var type = typeof(val),
	    toStr = Object.prototype.toString,
		res = {
			'[object Array]': 'array',
			'[object Object]': 'object',
			'[object Number]': 'object number',
			'[object String]': 'object string',
			'[object Boolean]': 'object boolean'
		};
	
	if(val ===null){
		return null;
	}else if(type === 'object'){
		var ret = toStr.call(val);
		return res[ret];
	}else{
		return type;//这是剩下的原始值
	}
}


//深拷贝
function deepClone(origin, target) {
	var target = target || {},
		toStr = Object.prototype.toString,
		arrType = '[object Array]';
	
	for(var key in origin) {
		if(origin.hasOwnProperty(key)){
			if(typeof(origin[key] === 'object' && origin[key] !== null)){
				if(toStr.call(origin[key] === arrType)){
					target[key] = [];
				}else{
					target[key] = {};
				}
				deepClone(origin[key], target[key]);
			}
		}else{
			target[key] = origin[key];
		}
	}
}

//获取字符串的字节数
function getBytes(str) {
	var bytes = str.length;
	
	for(var i = 0; i < str.length; i++){
		if(str.charCodeAt(i) > 255){
			bytes++;
		}
	}
	return bytes;
}

//数组去重
Array.prototype.unique = function() {
	var temp = {},
		newArr = [],
		len = this.length;
	
	for(var i = 0; i < len; i++){
		if(!temp.hasOwnProperty(this[i])){
			temp[this[i]] = this[i];
			newArr.push(this[i]);
		}
	}
	return newArr;
};

//字符串去重
String.prototype.unique = function() {
	var temp = {},
		newArr = '',
		len = this.length;
	
	for(var i = 0; i < len; i++){
		if(!temp.hasOwnProperty(this[i])){
			temp[this[i]] = this[i];
			newArr += this[i];
		}
	}
	return newArr;
};

//封装选择元素节点的方法，过滤其他节点
function elemChildren(node) {
	var arr = [],
		children = node.childNodes,
		len = children.length,
		item;
	
	for(var i = 0; i < len; i++) {
		item = children[i];
		
		if(item.nodeType === 1) {
			arr.push(item);
		}
	}
	return arr;
}

//在原型上封装一个遍历元素的子元素节点的方法，传入的参数可以去到对应的子元素节点
Element.prototype.elemChildren = function(index) {
	var childNOdes = this.childNodes,
		len = childNOdes.length,
		item,
		type = typeof(index);
	
	var temp = {
		'length': 0,
		'push': Array.prototype.push,
		'splice': Array.prototype.splice
	};
	
	for(var i = 0; i < len ; i++) {
		item = childNOdes[i];
		
		if(item.nodeType === 1) {
			temp.push(item);
		}
	}
	
	if(index !== undefined && type !== 'number'){
		return undefined;
	}
	
	return index === undefined ? temp : temp[index];
};

//封装寻找一个元素的第N级父元素的方法
Element.prototype.eleParent = function(n) {
	var type = typeof(n),
		elem = this;
	
	if(type === 'undefined' || type !== 'number'){
		return elem.parentNode;
	}else if(n < 0){
		return undefined;
	}
	
	while(n){
		if(elem.nodeName === 'HTML'){
			elem = null;
			return elem;
		}
		elem = elem.parentNode;
		n--;
	}
	return elem;
};

//封装判断一个元素是否有子元素节点的方法，因为自带的hasChildNodes方法判断的不仅仅是元素节点
Element.prototype.hasChildren = function() {
	var children = this.childNodes,
		len = children.lenght,
		item;
	
	for(var i = 0; i < len; i++) {
		item = children[i];
		
		if(item.nodeType === 1) {
			return true;
		}
	}
	
	return false;
};

//封装一个寻找兄弟元素节点的方法，参数为+，找之后的，为-，找之前的，为0，找自己
Element.prototype.elemSibling = function(n) {
	var elem = this;
	
	while(n){
		if(n > 0){
			elem = elem.nextSibling;
			while(elem && elem.nodeType !== 1){
				elem = elem.nextSibling;
			}
			n--;
		}else if(n < 0){
			elem = elem.previousSibling;
			while(elem && elem.nodeType !== 1){
				elem = elem.previousSibling;
			}
			n++;
		}
	}
	
	return elem;
};

//遍历一个元素下所有的子元素节点
function getFullChildren(node) {
	var children = node.childNodes,
		len = children.length,
		item;
	
	if(node && node.nodeType === 1){
		console.log(node);
	}
	
	for(var i = 0; i < len; i++){
		item = children[i];
		
		if(item.nodeType === 1){
			getFullChildren(item);
		}
	}
}

//封装获取滚动条的距离的方法
function getScrollOffset() {
	if(window.pageXOffset){
		return {
			left: window.pageXOffset,
			top: window.pageYOffset
		};
	}else{
		return {
			left: document.body.scrollLeft + document.documentElement.scrollLeft,
			top: document.body.scrollTop + document.documentElement.scrollTop
		};
	}
}

//封装获取浏览器可视区域的尺寸的方法
function getViewportSize() {
	if(window.innerWidth){
		return {
			width: window.innerWidth,
			height: window.innerHeight
		};
	}else{
		if(document.compatMode === 'BackCompat'){
			return {
				width: document.body.clientWidth,
				height: document.body.clientHeight
			};
		}else{
			return {
				width: document.documentElement.clientWidth,
				height: document.documentElement.clientHeight
			};
		}
	}
}

//获取整个文档的宽高
function getScrollSize() {
	if(document.body.scrollWidth){
		return {
			width: document.body.scrollWidth,
			height: document.body.scrollHeight
		};
	}else{
		return {
			width: document.documentElement.scrollWidth,
			height: document.documentElement.scrollHeight
		};
	}
}

//获取元素在文档内的位置
function getElementPosition(el) {
	var parent = el.parentNode,
		offsetLeft = el.offsetLeft,
		offsetTop = el.offsetTop;
	
	while(parent){
		offsetLeft += parent.offsetLeft;
		offsetTop += parent.offsetTop;
		parent = parent.parentNode;
	}
	
	return {
		left: offsetLeft,
		top: offsetTop
	};
}

//封装获取样式属性的方法,其中elem代表元素，prop代表属性名称，如height
function getStyles(elem, prop) {
	if(window.getComputedStyle){
		if(prop){
			return window.getComputedStyle(elem, null)[prop];
		}else{
			return window.getComputedStyle(elem, null);
		}
	}else{
		if(prop){
			return elem.currentStyle[prop];
		}else{
			return elem.currentStyle;
		}
	}
}

//封装事件处理函数的方法，兼容
function addEvent(el, type, fn){
	if(el.addEventListener){
		el.addEventListener(type, fn, false);
	}else if(el.attachEvent){
		el.attachEvent('on' + type, function() {
			fn.call(el);
		});
	}else{
		el['on' + type] = fn;
	}
}

//取消冒泡事件兼容性写法
function cancekBubble(e) {
	var e = e || window.event;
	
	if(e.stopPropagation){
		e.stopPropagation();
	}else{
		e.cancelBubble = true;
	}
}

//取消默认事件
function preventDefaultEvent(e) {
	var e = e || window.event;
	
	if(e.preventDefault){
		e.preventDefault();
	}else{
		e.returnValue = false;
	}
}


//获取鼠标相对于文档的坐标，包含滚动条的距离
function pagePos(e) {
	var sLeft = getScrollOffset().left,
		sTop = getScrollOffset().top,
		cLeft = document.documentElement.clientLeft || 0,
		cTop = document.documentElement.clientTop || 0;
	
	return {
		X: e.clientX + sLeft - cLeft,
		Y: e.clientY + sTop - cTop
	};
}