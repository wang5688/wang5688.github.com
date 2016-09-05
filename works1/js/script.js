domReady(function(){
	// 页面懒加载效果
	function show(obj){
		var oHeight = obj.offsetTop;
		var winH = document.body.clientHeight;
		if(oHeight < winH){
			obj.style.transform = 'translateY(0px)';
			obj.style.transition = '1.5s all ease';
		}
	}

	var oCont = document.querySelector('.content');
	var oTit = document.querySelector('.title');

	show(oCont);
	show(oTit);

	var oUl = document.getElementById('list');
	var aLi = oUl.children;
	var oNext = document.getElementById('next');
	var oPrev = document.getElementById('prev');
	var iNow = 0;

	oUl.style.width = aLi[0].offsetWidth * aLi.length + 'px';
	oUl.style.left = -iNow * aLi[0].offsetWidth + 'px';

	oNext.onclick = function(){
		iNow++;
		if(iNow == aLi.length){
			iNow = 0;
		}
		oUl.style.left = -iNow * aLi[0].offsetWidth + 'px';
		oUl.style.transition = '1s all ease';
	}
	oPrev.onclick = function(){
		iNow--;
		if(iNow == -1){
			iNow = aLi.length-1;
		}
		oUl.style.left = -iNow * aLi[0].offsetWidth + 'px';
		oUl.style.transition = '1s all ease';
	}

	var aWorks = oCont.querySelectorAll('.works span');

	for(var i=0; i<aWorks.length; i++){
		var aWidth = aWorks[i].offsetLeft;
		if(aWorks[i].offsetLeft == 0){
			aWorks[i].style.transform = 'translateY(0px)';
			aWorks[i].style.transition = '1.5s all ease';
		}
	}

	// nav页面导航效果
	;(function(){
		var oNav = document.querySelector('.nav');
		var oIcons = oNav.querySelector('.icons');
		var aImg = oIcons.children;

		document.onmousemove = function(ev){
			for(var i=0; i<aImg.length; i++){
				// 求距离
				var a = aImg[0].offsetWidth/2 + aImg[i].offsetLeft + oIcons.offsetLeft - ev.pageX;
				var b = aImg[0].offsetHeight/2 + aImg[i].offsetTop + oIcons.offsetTop - ev.pageY;
				var L = Math.sqrt(a*a+b*b);

				// 求出比例
				var scale = 1-L/500;
				(scale <=.5) && (scale =.5);
				// // 图片根据比例变大
				aImg[i].width = 128*scale;

			}	
		}
	})();
});