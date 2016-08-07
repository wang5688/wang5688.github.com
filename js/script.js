domReady(function(){
	// 滚动条
	;(function(){
		var oWheel = document.getElementById('wheel_line');
		var oLineBar = oWheel.children[0];
		var oCont = document.getElementById('cont');
		var oBodyH = document.body.scrollHeight;
		var oWinH = document.documentElement.clientHeight;
		var oTopNav = document.getElementById('top_nav');
		var oTopBox = document.getElementById('top_box');
		var iNow = 0;

		function tt(t){
			if(t < 0){
				t = 0;
			}
			if(t > oWheel.offsetHeight - oLineBar.offsetHeight){
				t = oWheel.offsetHeight - oLineBar.offsetHeight;
			}
			oLineBar.style.top = t + 'px';
			// 比例
			var scale = oLineBar.offsetTop/(oWheel.offsetHeight-oLineBar.offsetHeight);
			// move(oCont,{
			// 	top : -oBodyH*scale + oWinH
			// },{
			// 	complete : function(){
			// 		if(oCont.offsetTop < 0){
			// 			oTopNav.style.position = 'fixed';
			// 			oTopBox.style.display = 'block';
			// 		}else{
			// 			oTopNav.style.position = '';
			// 			oTopBox.style.display = 'none';
			// 		}
			// 	}});
			oCont.style.top = -oBodyH*scale + oWinH +'px';
			if(oCont.offsetTop < 0){
				oTopNav.style.position = 'fixed';
				oTopBox.style.display = 'block';
			}else{
				oTopNav.style.position = '';
				oTopBox.style.display = 'none';
			}
			
		}
		// 拖拽
		oLineBar.onmousedown = function(ev){
			var oEvent = ev || event;
			var disY = oEvent.clientY - oLineBar.offsetTop;
			document.onmousemove = function(ev){
				var oEvent = ev || event;
				var t = oEvent.clientY - disY;
				if(t < 0){
					t = 0;
				}
				if(t > oWheel.offsetHeight - oLineBar.offsetHeight){
					t = oWheel.offsetHeight - oLineBar.offsetHeight;
				}
				tt(t);
				
				oLineBar.style.top = t + 'px';
			}
			document.onmouseup = function(){
				document.onmousemove = null;
				document.onmouseup = null;
				oLineBar.releaseCapture && oLineBar.releaseCapture();

				var n = oLineBar.offsetTop;

				addWheel(document,function(bDown){
					if(bDown){
						n+=10;
						if(n > oWheel.offsetHeight - oLineBar.offsetHeight){
							n = oWheel.offsetHeight - oLineBar.offsetHeight;
						}
						oLineBar.style.top = n + 'px';
						tt(n);
					}else{
						n-=10;
						if(n < 0){
							n = 0;
						}
						oLineBar.style.top = n + 'px';
						tt(n);
					}
				});
				}

				oLineBar.setCapture && oLineBar.setCapture();
				return false;
			}


		// 滚轮
		var n = oLineBar.offsetTop;

		addWheel(document,function(bDown){
			if(bDown){
				n+=10;
				if(n > oWheel.offsetHeight - oLineBar.offsetHeight){
					n = oWheel.offsetHeight - oLineBar.offsetHeight;
				}
				oLineBar.style.top = n + 'px';
				tt(n);
			}else{
				n-=10;
				if(n < 0){
					n = 0;
				}
				oLineBar.style.top = n + 'px';
				tt(n);
			}
		});
	})();

	// // banner部分
	// ;(function(){
	// 	var oBanner = document.getElementById('banner');
	// 	var oUl = oBanner.getElementsByTagName('ul')[0];
	// 	var aLi = oBanner.getElementsByTagName('li');
	// 	var oBannerTip = document.getElementById('banner_tip');
	// 	var aTip = oBannerTip.getElementsByTagName('span');
	// 	var n = 0;

		
	// 		// // 获取可视窗高度
	// 		// var oWinH = document.documentElement.clientHeight;
	// 		// var oWinW = document.documentElement.clientWidth;
	// 		// // 获取可视窗高度
	// 		// var oWinH = document.documentElement.clientHeight;
	// 		// oCont.style.top = oWinH + 'px';
	// 		// oBanner.style.height = oWinH + 'px';
	// 		// oUl.style.width = oWinW * 2 + 'px';
	// 		// console.log(oWinW + ':' + oWinH);
	// 		// for(var i=0; i<aLi.length; i++){
	// 		// 	aLi[i].style.height = oWinH + 'px';
	// 		// 	aLi[i].style.width = oWinW + 'px';
	// 		// }
		
	// 	setInterval(function(){
	// 		n++;
	// 		if(n > 1){
	// 			n = 0;
	// 		}
	// 		move(oUl,{
	// 			left : -aLi[0].offsetWidth * n
	// 		},{
	// 			easing : 'linear',
	// 			complete : function(){
	// 				for(var i=0; i<aTip.length; i++){
	// 					aTip[i].className = 'tip fl';
	// 				}
	// 				aTip[n].className = 'tip fl active';
	// 			}
	// 		});
	// 	},6000);
	// })();

	
	// // content部分
	// (function(){
	// 	var oCont = document.getElementById('cont');
	// 	var oTopNav = document.getElementById('top_nav');


	// })();
});
