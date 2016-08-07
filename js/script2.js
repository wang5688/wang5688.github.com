domReady(function(){
	// 作品列表展示部分
	var oShows = document.querySelector('.shows');
	var aWorks = oShows.querySelectorAll('.works');

	for(var i=0; i<aWorks.length; i++){
		aWorks[i].onclick = function(){
			this.style.width = '80%';
			this.style.transform = 'translate(10%,0)';
		}
	}

	// 我的简历
	var oMyResume = document.getElementById('my_resume');
	var oResumeBox = document.getElementById('resume_box');
	var oResumeClose = document.getElementById('resume_close');

	oMyResume.onclick = function(){
		oResumeBox.style.top = '50%';
		oResumeBox.style.opacity = 1;
	}
	oResumeClose.onclick = function(){
		oResumeBox.style.opacity = 0;
		oResumeBox.style.top = '-50%';
	}

	// my_works翻页效果
	var oMyWorks = document.querySelector('.my_works');
	var aWorLi = oMyWorks.querySelectorAll('li');
	var oMorePrev = oMyWorks.querySelector('.more_prev');
	var oMoreNext = oMyWorks.querySelector('.more_next');
	var worksArr = [];

	for(var i=0; i<aWorLi.length; i++){
		worksArr.push(aWorLi[i].className);

	}
	oMoreNext.onclick = function(){	
		worksArr.push(worksArr.shift());
		for(var i=0; i<aWorLi.length; i++){
			aWorLi[i].className = worksArr[i];
		}
	}
	oMorePrev.onclick = function(){	
		worksArr.unshift(worksArr.pop());
		for(var i=0; i<aWorLi.length; i++){
			aWorLi[i].className = worksArr[i];
		}
	}

	// 照片墙拖拽
	var oScreenBox = document.querySelector('.screen_box');
	var aScrLi = oScreenBox.querySelectorAll('li');
	var oDragBtn = document.getElementById('drag_btn');
	var dragArr = [];

	// 布局转换
	for(var i=0; i<aScrLi.length; i++){
		dragArr.push({
			left : aScrLi[i].offsetLeft,
			top : aScrLi[i].offsetTop
		});
	}
	for(var i=0; i<aScrLi.length; i++){
		aScrLi[i].style.position = 'absolute';
		aScrLi[i].style.left = dragArr[i].left + 'px';
		aScrLi[i].style.top = dragArr[i].top + 'px';
		aScrLi[i].style.margin = 0;
		var zIndex = 20;
	}
	// 随机换一下
	oDragBtn.onclick = function(){
		dragArr.sort(function(){
			return Math.random()-.5;
		});
		for(var i=0; i<dragArr.length; i++){
			move(aScrLi[i],{
				left : dragArr[i].left,
				top : dragArr[i].top
			});
		}
	}
	// 拖拽
	function drag(obj){
		obj.onmousedown = function(ev){
			var disX = ev.clientX - obj.offsetLeft;
			var disY = ev.clientY - obj.offsetTop;
			obj.style.zIndex = zIndex++;
			document.onmousemove = function(ev){
				var l = ev.clientX - disX;
				var t = ev.clientY - disY;
				var oNear = findNear(obj);
				for(var i=0; i<aScrLi.length; i++){
					aScrLi[i].style.border = '3px solid #666';
				}
				if(oNear){
					oNear.style.border = '3px dashed red';
				}

				obj.style.left = l + 'px';
				obj.style.top = t + 'px';
			}
			document.onmouseup = function(){
				document.onmousemove = null;
				document.onmouseup = null;

				var oNear = findNear(obj);
			
				if(oNear){
					move(oNear,{
						left : dragArr[obj.index].left,
						top : dragArr[obj.index].top
					});
					move(obj,{
						left : dragArr[oNear.index].left,
						top : dragArr[oNear.index].top
					});
					var car;
					car = oNear.index;
					oNear.index = obj.index;
					obj.index = car;
					oNear.style.border = '3px solid #666';
				}else{
					move(obj,{
						left : dragArr[obj.index].left,
						top : dragArr[obj.index].top
					});
				}
			}
			return false;
		}
	}
	for(var i=0; i<aScrLi.length; i++){
		drag(aScrLi[i]);
		aScrLi[i].index = i;
	}
	// 碰撞检测
	function collTest(obj,obj2){
		var l1 = obj.offsetLeft;
		var t1 = obj.offsetTop;
		var r1 = obj.offsetLeft + obj.offsetWidth;
		var b1 = obj.offsetTop + obj.offsetHeight;
		var l2 = obj2.offsetLeft;
		var t2 = obj2.offsetTop;
		var r2 = obj2.offsetLeft + obj2.offsetWidth;
		var b2 = obj2.offsetTop + obj2.offsetHeight;
		if(r1 < l2 || b1 < t2 || l1 > r2 || t1 > b2){
			return false;
		}else{
			return true;
		}
	}
	// 求两物体间距离
	function getDis(obj,obj2){
		var a = obj2.offsetLeft - obj.offsetLeft;
		var b = obj2.offsetTop - obj.offsetTop;
		return Math.sqrt(a*a+b*b);
	}
	// 找出里的最近的div
	function findNear(obj){
		var iMin = 99999999;
		var iMinIndex = -1;
		for(var i=0; i<aScrLi.length; i++){
			if(obj == aScrLi[i])continue;
			if(collTest(obj,aScrLi[i])){
				var dis = getDis(obj,aScrLi[i]);
				if(dis < iMin){
					iMin = dis;
					iMinIndex = i;
				}
			}
		}
		if(iMinIndex == -1){
			return false;
		}else{
			return aScrLi[iMinIndex];
		}
	}


	/*3D环绕图片展示*/
	var oSurroundBox = document.querySelector('.surround_box');
	var oSurrUl = oSurroundBox.querySelector('ul');
	var oSurrAli = oSurroundBox.querySelectorAll('li');
	var oSulen = oSurrAli.length;

	oSurrUl.onclick = function(){
		for(var i=0; i<oSurrAli.length; i++){
			oSurrAli[i].style.transition = '1s all ease '+200*(oSulen-i)+'ms';
			oSurrAli[i].style.transform = 'rotateY('+360/oSulen*i+'deg) translateZ(400px)';
		}
	}
	
	oSurrAli[0].addEventListener('transitionend',function(){
		var x = 150;
		var y = 0;
		var speedX = 0;
		var speedY = 0;
		var lastX = 0;
		var lastY = 0;
		var timer = null;
		// 拖拽
		oSurroundBox.onmousedown = function(ev){
			clearMove();
			var disX = ev.clientX - y;
			var disY = ev.clientY - x;
			document.onmousemove = function(ev){
				x = ev.clientY - disY;
				y = ev.clientX - disX;
				if(x > 600){
					x = 600;
				}
				if(x < -600){
					x = -600;
				}
				oSurrUl.style.transform = 'perspective(800px) rotateX('+-x/10+'deg) rotateY('+y/10+'deg)';
				// 求距离
				speedX = x - lastX;
				speedY = y - lastY;
				lastX = x;
				lastY = y;
				setOpa();
			}
			document.onmouseup = function(){
				clearInterval(timer);
				timer = setInterval(function(){
					x+=speedX;
					y+=speedY;
					speedX*=.8;
					speedY*=.8;
					if(Math.abs(speedX) < 1){
						speedX = 0;
					}
					if(Math.abs(speedY) < 1){
						speedY = 0;
					}
					if(speedX == 0 && speedY == 0){
						clearInterval(timer);
					}
					oSurrUl.style.transform = 'perspective(800px) rotateX('+-x/10+'deg) rotateY('+y/10+'deg)';
				},30);

				document.onmousemove = null;
				document.onmouseup = null;
			}
			return false;
		}
		clearMove();
		setOpa();
		function setOpa(){
			for(var i=0; i<oSulen; i++){
				var d = Math.abs(360/oSulen*i+y/10)%360;
				if(d > 180){
					d = 360 - d;
				}
				d = 1 - d/180;
				if(d < 0.3){
					d = 0.3;
				}
				oSurrAli[i].style.opacity = d;
			}
		}
		function clearMove(){
			for(var i=0; i<oSulen; i++){
				oSurrAli[i].style.transition = 'none';
			}
		}
		function setMove(){
			for(var i=0; i<oSulen; i++){
				oSurrAli[i].style.transition = '1s all ease';
			}
		}
	},false);

	// 旋转环绕照片墙
	;(function(){
		var oTurnBox = document.querySelector('.turn_box');
		var oNext = document.getElementById('turn_next');
		var oPrev = document.getElementById('turn_prev');
		var R = 6;
		var C = 4;

		for(var c=0; c<C; c++){
			for(var r=0; r<R; r++){
				var oDiv = document.createElement('div');
				oDiv.innerHTML = '<span></span>';
				oDiv.className = 'turn_lis';
				oDiv.style.position = 'absolute';
				oDiv.style.width = oTurnBox.offsetWidth/R + 'px';
				oDiv.style.height = oTurnBox.offsetHeight/C + 'px';
				oDiv.style.left = oTurnBox.offsetWidth/R*r + 'px';
				oDiv.style.top = oTurnBox.offsetHeight/C*c + 'px';
				oTurnBox.appendChild(oDiv);
				var oSpan = oDiv.children[0];
				oSpan.className = 'turn_s';
				oSpan.style.backgroundPosition = -oTurnBox.offsetWidth/R*r+'px -'+oTurnBox.offsetHeight/C*c+'px';
			}
		}

		var aDiv = oTurnBox.querySelectorAll('div');		
		var aSpan = oTurnBox.querySelectorAll('span');
		var clicked = true;

		for(var i=0; i<aDiv.length; i++){
			aDiv[i].onclick = function(){
				if(clicked){
					for(var i=0; i<aDiv.length; i++){
						// 求距离
						var x = aDiv[i].offsetLeft+aDiv[i].offsetWidth/2 - oTurnBox.offsetWidth/2;
						var y = aDiv[i].offsetTop+aDiv[i].offsetHeight/2 - oTurnBox.offsetHeight/2;
						aDiv[i].style.backgroundImage = 'url(images/works4/'+(i+1)+'.jpg)';

						aDiv[i].style.transform = 'rotateZ('+rnd(-20,20)+'deg) translate('+x/4+'px,'+y/4+'px)';
						aDiv[i].style.border = '6px solid #fff';
						oNext.style.display = oPrev.style.display = 'none';
						aSpan[i].style.transition = '1.5s all ease';
						aSpan[i].style.opacity = 0;
					}
				}else{
					for(var i=0; i<aDiv.length; i++){
						// 求距离
						var x = aDiv[i].offsetLeft+aDiv[i].offsetWidth/2 - oTurnBox.offsetWidth/2;
						var y = aDiv[i].offsetTop+aDiv[i].offsetHeight/2 - oTurnBox.offsetHeight/2;
						
						aDiv[i].style.transform = 'rotateZ(0deg) translate(0px)';
						aDiv[i].style.border = '2px solid #fff';
						oNext.style.display = oPrev.style.display = 'block';
						aSpan[i].style.transition = '1.5s all ease';
						aSpan[i].style.opacity = 1;
					}
				}
				clicked = !clicked;
			}
		}

		var iNow = 1;
		var bReady = true;
		oNext.onclick = function(){
			if(!bReady)return;
			bReady = true;
			iNow++;
			for(var i=0; i<aSpan.length; i++){
				aSpan[i].style.transition = '.7s all ease';
				aSpan[i].style.backgroundImage = 'url(images/works4/img/'+(iNow%24+1)+'.jpg)';
			}
			aSpan[0].addEventListener('transitionend',function(){
				bReady = true;
			},false);
		}
		oPrev.onclick = function(){
			iNow--;
			if(iNow == 0){
				iNow = 23;
			}
			for(var i=0; i<aSpan.length; i++){
				aSpan[i].style.transition = '.7s all ease';
				aSpan[i].style.backgroundImage = 'url(images/works4/img/'+iNow%24+'.jpg)';
			}
			aSpan[0].addEventListener('transitionend',function(){
				bReady = true;
			},false);
		}

		function rnd(n,m){
			return parseInt(Math.random()*(m-n)+n);
		}

		// 连续淡入淡出效果
		;(function(){
			var oSlideShow = document.querySelector('.slide_show');
			var aLi = oSlideShow.querySelectorAll('li');
			var aImg = oSlideShow.querySelectorAll('img');
			var oNext = document.getElementById('slide_next');
			var oPrev = document.getElementById('slide_prev');

			oNext.onclick = function(){
				for(var i=0; i<aLi.length; i++){
					aLi[i].style.transition = '1s all ease '+200*i+'ms';
					aLi[i].style.opacity = 0;
					// aImg[i].src = 'images/works4/'+i+'.jpg';
				}	

			}
		})();


		// css图片展示效果
		var oPicsShow = document.querySelector('.pics_show');
		var oBtn1 = document.getElementById('pics_btn1');
		var oBtn2 = document.getElementById('pics_btn2');
		var oBtn3 = document.getElementById('pics_btn3');
		var oBtn4 = document.getElementById('pics_btn4');
		var oBtn5 = document.getElementById('pics_btn5');
		var R = 7;
		var C = 4;
		var bReady = true;

		;(function(){
			var oPage = oPicsShow.querySelector('.page');
			var oFront = oPicsShow.querySelector('.front1');
			var oBack = oPicsShow.querySelector('.back1');
			var oPage2 = oPicsShow.querySelector('.page2');
			var iNow = 0;
			// 翻页效果
			oBtn1.onclick = function(){
				if(!bReady)return;
				bReady = false;
				iNow++;
				oPage.style.transition = '1s all ease';
				oPage.style.transform = 'perspective(800px) rotateY(-180deg)';
				
				oPage.addEventListener('transitionend',function(){
					oPage.style.transition = 'none';
					oPage.style.transform = 'perspective(800px) rotateY(0deg)';

					oPicsShow.style.backgroundImage = 'url(images/work7/'+iNow%3+'.jpg)';
					oFront.style.backgroundImage = 'url(images/work7/'+iNow%3+'.jpg)';
					oBack.style.backgroundImage = 'url(images/work7/'+(iNow+1)%3+'.jpg)';
					oPage2.style.backgroundImage = 'url(images/work7/'+(iNow+1)%3+'.jpg)';
					bReady = true;
				},false);
			}
		})();

		// 翻转
		;(function(){
			var oPics2 = document.querySelector('.pics2');
			var C = 4;
			var R = 7;

			for(var c=0; c<C; c++){
				for(var r=0; r<R; r++){
					var oPage = document.createElement('div');
					oPage.innerHTML = '<div class="front2"></div><div class="back2"></div>';
					oPage.className = 'page-2';
					oPage.style.width = oPics2.offsetWidth/R + 'px';
					oPage.style.height = oPics2.offsetHeight/C + 'px';
					oPage.style.left = oPics2.offsetWidth/R*r + 'px';
					oPage.style.top = oPics2.offsetHeight/C*c + 'px';
					oPics2.appendChild(oPage);
					oPage.r = r;
					oPage.c = c;

					var oFront = oPage.querySelector('.front2');
					var oBack = oPage.querySelector('.back2');
					oFront.style.backgroundPosition = -oPics2.offsetWidth/R*r+'px -'+oPics2.offsetHeight/C*c+'px';
					oBack.style.backgroundPosition = -oPics2.offsetWidth/R*r+'px -'+oPics2.offsetHeight/C*c+'px';
				}
			}
			var aPage = oPics2.children;
			var aFront = oPics2.querySelectorAll('.front2');
			var aBack = oPics2.querySelectorAll('.back2');
			var iNow = 0;

			oBtn2.onclick = function(){
				if(!bReady)return;
				bReady = false;
				iNow++;
				for(var i=0; i<aPage.length; i++){
					aPage[i].style.transition = '.7s all ease '+200*(aPage[i].r+aPage[i].c)+'ms';
					aPage[i].style.transform = 'perspective(800px) rotateY(-180deg)';	
				}


				oPage.addEventListener('transitionend',function(){
					for(var i=0; i<aPage.length; i++){
						aPage[i].style.transition = 'none';
						aPage[i].style.transform = 'perspective(800px) rotateY(0deg)';	

						oPics2.style.backgroundImage = 'url(images/work7/'+iNow%3+'.jpg)';
						aFront[i].style.backgroundImage = 'url(images/work7/'+iNow%3+'.jpg)';
						aBack[i].style.backgroundImage = 'url(images/work7/'+(iNow+1)%3+'.jpg)';
						aPage[i].style.backgroundImage = 'url(images/work7/'+(iNow+1)%3+'.jpg)';
					}
					
					bReady = true;
				},false);
			}
		})();

		// 爆炸效果
		;(function(){
			var oPics3 = document.querySelector('.pics3');

			for(var c=0; c<C; c++){
				for(var r=0; r<R; r++){
					var oPage = document.createElement('span');
					oPage.className = 'page-3';
					oPage.style.width = oPics3.offsetWidth/R + 'px';
					oPage.style.height = oPics3.offsetHeight/C + 'px';
					oPage.style.left = oPics3.offsetWidth/R*r + 'px';
					oPage.style.top = oPics3.offsetHeight/C*c + 'px';
					oPage.style.backgroundPosition = -oPics3.offsetWidth/R*r+'px -'+oPics3.offsetHeight/C*c+'px';
					oPics3.appendChild(oPage);
				}
			}
			var aPage = oPics3.children;
			var iNow = 0;

			oBtn3.onclick = function(){
				if(!bReady)return;
				bReady = false;
				iNow++;
				for(var i=0; i<aPage.length; i++){
					// 求距离
					var x = aPage[i].offsetLeft + aPage[i].offsetWidth/2 - oPics3.offsetWidth/2;
					var y = aPage[i].offsetTop + aPage[i].offsetHeight/2 - oPics3.offsetHeight/2;

					aPage[i].style.transition = '.7s all ease';
					aPage[i].style.transform = 'perspective(800px) translate('+x+'px,'+y+'px) rotateX('+rnd(-180,180)+'deg) rotateY('+rnd(-180,180)+'deg)';	
					aPage[i].style.opacity = 0;
				}


				oPage.addEventListener('transitionend',function(){
					for(var i=0; i<aPage.length; i++){
						aPage[i].style.transition = 'none';
						aPage[i].style.transform = 'perspective(800px) translate(0px,0px) rotateX(0deg) rotateY(0deg)';	
						aPage[i].style.opacity = 1;

						oPics3.style.backgroundImage = 'url(images/work7/'+(iNow+1)%3+'.jpg)';
						aPage[i].style.backgroundImage = 'url(images/work7/'+(iNow)%3+'.jpg)';
					}
					
					bReady = true;
				},false);
			}
		})();

		// 拼图游戏
		;(function(){
			var oPin = document.querySelector('.pin');
			var oUl = oPin.querySelector('ul');
			var aLi = oUl.querySelectorAll('li');
			var oMov = document.querySelector('.mov');
			var arr = [];

			// 布局转化
			for(var i=0; i<aLi.length; i++){
				arr.push({
					left : aLi[i].offsetLeft,
					top : aLi[i].offsetTop
				});
			}
			for(var i=0; i<aLi.length; i++){
				aLi[i].style.position = 'absolute';
				aLi[i].style.left = arr[i].left + 'px';
				aLi[i].style.top = arr[i].top + 'px';
				aLi[i].dataset.a = i;
			}

			function move(){
				for(var i=0; i<aLi.length; i++){
					if(collTest(oMov,aLi[i])){
						var n = getDis(oMov,aLi[i]);
						if(n == 120){
							aLi[i].style.background = 'green';
							var d = aLi[i].dataset.a - oMov.dataset.a;
							if(d == -3){
								change();
							}
							if(d == -1){
								change();
							}
						}	
					}
					// 换位置
					function change(){
						aLi[i].style.left = arr[oMov.dataset.a].left + 'px';
						aLi[i].style.top = arr[oMov.dataset.a].top + 'px';
						oMov.style.left = arr[aLi[i].dataset.a].left + 'px';
						oMov.style.top = arr[aLi[i].dataset.a].top + 'px';
						var car;
						car = aLi[i].dataset.a;
						aLi[i].dataset.a = oMov.dataset.a;
						oMov.dataset.a = car;
					}
				}
			}

			document.onkeydown = function(ev){
				for(var i=0; i<aLi.length; i++){
					var keyCode = ev.keyCode;
					if(keyCode == 40){
						move();
						return false;
					}
				}
			}

		})();
	})();
});


