domReady(function(){function a(a){a.onmousedown=function(b){var c=b.clientX-a.offsetLeft,e=b.clientY-a.offsetTop;return a.style.zIndex=w++,document.onmousemove=function(b){for(var f=b.clientX-c,g=b.clientY-e,h=d(a),i=0;i<t.length;i++)t[i].style.border="3px solid #666";h&&(h.style.border="3px dashed red"),a.style.left=f+"px",a.style.top=g+"px"},document.onmouseup=function(){document.onmousemove=null,document.onmouseup=null;var b=d(a);if(b){move(b,{left:v[a.index].left,top:v[a.index].top}),move(a,{left:v[b.index].left,top:v[b.index].top});var c;c=b.index,b.index=a.index,a.index=c,b.style.border="3px solid #666"}else move(a,{left:v[a.index].left,top:v[a.index].top})},!1}}function b(a,b){var c=a.offsetLeft,d=a.offsetTop,e=a.offsetLeft+a.offsetWidth,f=a.offsetTop+a.offsetHeight,g=b.offsetLeft,h=b.offsetTop,i=b.offsetLeft+b.offsetWidth,j=b.offsetTop+b.offsetHeight;return!(e<g||f<h||c>i||d>j)}function c(a,b){var c=b.offsetLeft-a.offsetLeft,d=b.offsetTop-a.offsetTop;return Math.sqrt(c*c+d*d)}function d(a){for(var d=99999999,e=-1,f=0;f<t.length;f++)if(a!=t[f]&&b(a,t[f])){var g=c(a,t[f]);g<d&&(d=g,e=f)}return e!=-1&&t[e]}var e=document.querySelector(".nav");e.onmouseenter=function(){e.style.transition="1s all ease",e.style.opacity=1},e.onmouseleave=function(){e.style.transition="1s all ease",e.style.opacity=0};var f=document.getElementById("to_top"),g=null;f.onclick=function(){console.log(document.body.scrollTop);var a=parseInt(document.body.scrollTop);clearInterval(g),g=setInterval(function(){a-=a<3400?100:200,document.body.scrollTop=a,a<=0&&clearInterval(g)},30)};for(var h=document.querySelector(".shows"),i=h.querySelectorAll(".works"),j=0;j<i.length;j++)i[j].onclick=function(){this.style.width="80%",this.style.transform="translate(10%,0)"};var k=document.getElementById("my_resume"),l=document.getElementById("resume_box"),m=document.getElementById("resume_close");k.onclick=function(){l.style.top="50%",l.style.opacity=1},m.onclick=function(){l.style.opacity=0,l.style.top="-50%"};for(var n=document.querySelector(".my_works"),o=n.querySelectorAll("li"),p=n.querySelector(".more_prev"),q=n.querySelector(".more_next"),r=[],j=0;j<o.length;j++)r.push(o[j].className);q.onclick=function(){r.push(r.shift());for(var a=0;a<o.length;a++)o[a].className=r[a]},p.onclick=function(){r.unshift(r.pop());for(var a=0;a<o.length;a++)o[a].className=r[a]};for(var s=document.querySelector(".screen_box"),t=s.querySelectorAll("li"),u=document.getElementById("drag_btn"),v=[],j=0;j<t.length;j++)v.push({left:t[j].offsetLeft,top:t[j].offsetTop});for(var j=0;j<t.length;j++){t[j].style.position="absolute",t[j].style.left=v[j].left+"px",t[j].style.top=v[j].top+"px",t[j].style.margin=0;var w=20}u.onclick=function(){v.sort(function(){return Math.random()-.5});for(var a=0;a<v.length;a++)move(t[a],{left:v[a].left,top:v[a].top})};for(var j=0;j<t.length;j++)a(t[j]),t[j].index=j;var x=document.querySelector(".surround_box"),y=x.querySelector("ul"),z=x.querySelectorAll("li"),A=z.length;y.onclick=function(){for(var a=0;a<z.length;a++)z[a].style.transition="1s all ease "+200*(A-a)+"ms",z[a].style.transform="rotateY("+360/A*a+"deg) translateZ(400px)"},z[0].addEventListener("transitionend",function(){function a(){for(var a=0;a<A;a++){var b=Math.abs(360/A*a+d/10)%360;b>180&&(b=360-b),b=1-b/180,b<.3&&(b=.3),z[a].style.opacity=b}}function b(){for(var a=0;a<A;a++)z[a].style.transition="none"}var c=150,d=0,e=0,f=0,g=0,h=0,i=null;x.onmousedown=function(j){b();var k=j.clientX-d,l=j.clientY-c;return document.onmousemove=function(b){c=b.clientY-l,d=b.clientX-k,c>600&&(c=600),c<-600&&(c=-600),y.style.transform="perspective(800px) rotateX("+-c/10+"deg) rotateY("+d/10+"deg)",e=c-g,f=d-h,g=c,h=d,a()},document.onmouseup=function(){clearInterval(i),i=setInterval(function(){c+=e,d+=f,e*=.8,f*=.8,Math.abs(e)<1&&(e=0),Math.abs(f)<1&&(f=0),0==e&&0==f&&clearInterval(i),y.style.transform="perspective(800px) rotateX("+-c/10+"deg) rotateY("+d/10+"deg)"},30),document.onmousemove=null,document.onmouseup=null},!1},b(),a()},!1),function(){function a(a,b){return parseInt(Math.random()*(b-a)+a)}for(var b=document.querySelector(".turn_box"),c=document.getElementById("turn_next"),d=document.getElementById("turn_prev"),e=6,f=4,g=0;g<f;g++)for(var h=0;h<e;h++){var i=document.createElement("div");i.innerHTML="<span></span>",i.className="turn_lis",i.style.position="absolute",i.style.width=b.offsetWidth/e+"px",i.style.height=b.offsetHeight/f+"px",i.style.left=b.offsetWidth/e*h+"px",i.style.top=b.offsetHeight/f*g+"px",b.appendChild(i);var j=i.children[0];j.className="turn_s",j.style.backgroundPosition=-b.offsetWidth/e*h+"px -"+b.offsetHeight/f*g+"px"}for(var k=b.querySelectorAll("div"),l=b.querySelectorAll("span"),m=!0,n=0;n<k.length;n++)k[n].onclick=function(){if(m)for(var e=0;e<k.length;e++){var f=k[e].offsetLeft+k[e].offsetWidth/2-b.offsetWidth/2,g=k[e].offsetTop+k[e].offsetHeight/2-b.offsetHeight/2;k[e].style.backgroundImage="url(images/works4/"+(e+1)+".jpg)",k[e].style.transform="rotateZ("+a(-20,20)+"deg) translate("+f/4+"px,"+g/4+"px)",k[e].style.border="6px solid #fff",c.style.display=d.style.display="none",l[e].style.transition="1.5s all ease",l[e].style.opacity=0}else for(var e=0;e<k.length;e++){var f=k[e].offsetLeft+k[e].offsetWidth/2-b.offsetWidth/2,g=k[e].offsetTop+k[e].offsetHeight/2-b.offsetHeight/2;k[e].style.transform="rotateZ(0deg) translate(0px)",k[e].style.border="2px solid #fff",c.style.display=d.style.display="block",l[e].style.transition="1.5s all ease",l[e].style.opacity=1}m=!m};var o=1,p=!0;c.onclick=function(){if(p){p=!0,o++;for(var a=0;a<l.length;a++)l[a].style.transition=".7s all ease",l[a].style.backgroundImage="url(images/works4/img/"+(o%24+1)+".jpg)";l[0].addEventListener("transitionend",function(){p=!0},!1)}},d.onclick=function(){o--,0==o&&(o=23);for(var a=0;a<l.length;a++)l[a].style.transition=".7s all ease",l[a].style.backgroundImage="url(images/works4/img/"+o%24+".jpg)";l[0].addEventListener("transitionend",function(){p=!0},!1)};var q=document.querySelector(".pics_show"),r=document.getElementById("pics_btn1"),s=document.getElementById("pics_btn2"),t=document.getElementById("pics_btn3"),e=(document.getElementById("pics_btn4"),document.getElementById("pics_btn5"),7),f=4,p=!0;!function(){var a=q.querySelector(".page"),b=q.querySelector(".front1"),c=q.querySelector(".back1"),d=q.querySelector(".page2"),e=0;r.onclick=function(){p&&(p=!1,e++,a.style.transition="1s all ease",a.style.transform="perspective(800px) rotateY(-180deg)",a.addEventListener("transitionend",function(){a.style.transition="none",a.style.transform="perspective(800px) rotateY(0deg)",q.style.backgroundImage="url(images/work7/"+e%3+".jpg)",b.style.backgroundImage="url(images/work7/"+e%3+".jpg)",c.style.backgroundImage="url(images/work7/"+(e+1)%3+".jpg)",d.style.backgroundImage="url(images/work7/"+(e+1)%3+".jpg)",p=!0},!1))}}(),function(){for(var a=document.querySelector(".pics2"),b=4,c=7,d=0;d<b;d++)for(var e=0;e<c;e++){var f=document.createElement("div");f.innerHTML='<div class="front2"></div><div class="back2"></div>',f.className="page-2",f.style.width=a.offsetWidth/c+"px",f.style.height=a.offsetHeight/b+"px",f.style.left=a.offsetWidth/c*e+"px",f.style.top=a.offsetHeight/b*d+"px",a.appendChild(f),f.r=e,f.c=d;var g=f.querySelector(".front2"),h=f.querySelector(".back2");g.style.backgroundPosition=-a.offsetWidth/c*e+"px -"+a.offsetHeight/b*d+"px",h.style.backgroundPosition=-a.offsetWidth/c*e+"px -"+a.offsetHeight/b*d+"px"}var i=a.children,j=a.querySelectorAll(".front2"),k=a.querySelectorAll(".back2"),l=0;s.onclick=function(){if(p){p=!1,l++;for(var b=0;b<i.length;b++)i[b].style.transition=".7s all ease "+200*(i[b].r+i[b].c)+"ms",i[b].style.transform="perspective(800px) rotateY(-180deg)";f.addEventListener("transitionend",function(){for(var b=0;b<i.length;b++)i[b].style.transition="none",i[b].style.transform="perspective(800px) rotateY(0deg)",a.style.backgroundImage="url(images/work7/"+l%3+".jpg)",j[b].style.backgroundImage="url(images/work7/"+l%3+".jpg)",k[b].style.backgroundImage="url(images/work7/"+(l+1)%3+".jpg)",i[b].style.backgroundImage="url(images/work7/"+(l+1)%3+".jpg)";p=!0},!1)}}}(),function(){for(var b=document.querySelector(".pics3"),c=0;c<f;c++)for(var d=0;d<e;d++){var g=document.createElement("span");g.className="page-3",g.style.width=b.offsetWidth/e+"px",g.style.height=b.offsetHeight/f+"px",g.style.left=b.offsetWidth/e*d+"px",g.style.top=b.offsetHeight/f*c+"px",g.style.backgroundPosition=-b.offsetWidth/e*d+"px -"+b.offsetHeight/f*c+"px",b.appendChild(g)}var h=b.children,i=0;t.onclick=function(){if(p){p=!1,i++;for(var c=0;c<h.length;c++){var d=h[c].offsetLeft+h[c].offsetWidth/2-b.offsetWidth/2,e=h[c].offsetTop+h[c].offsetHeight/2-b.offsetHeight/2;h[c].style.transition=".7s all ease",h[c].style.transform="perspective(800px) translate("+d+"px,"+e+"px) rotateX("+a(-180,180)+"deg) rotateY("+a(-180,180)+"deg)",h[c].style.opacity=0}g.addEventListener("transitionend",function(){for(var a=0;a<h.length;a++)h[a].style.transition="none",h[a].style.transform="perspective(800px) translate(0px,0px) rotateX(0deg) rotateY(0deg)",h[a].style.opacity=1,b.style.backgroundImage="url(images/work7/"+(i+1)%3+".jpg)",h[a].style.backgroundImage="url(images/work7/"+i%3+".jpg)";p=!0},!1)}}}()}()});