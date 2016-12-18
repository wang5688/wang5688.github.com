!function(){var t={},n={},e={},r={};t=function(t){function n(){}function e(t,e){var r;return Object.create?r=Object.create(t):(n.prototype=t,r=new n),r.constructor=e,r}function r(t,n){if(t){if(t.nodeType)return[t];var n=n&&n.nodeType?n:document;return t&&"string"==typeof t?n.querySelectorAll(t):void 0}}for(var i=/\\?\{([^{}]+)\}/g,s="",o=/^[\s\xa0]+|[\s\xa0]+$/g,l=String.prototype.trim,u=l?function(t){return null==t?s:l.call(t)}:function(t){return null==t?s:(t+"").replace(o,s)},a=0,c=function(t){var n=t.offsetTop;return null!=t.offsetParent&&(n+=c(t.offsetParent)),n},f=function(t){var n=t.offsetLeft;return null!=t.offsetParent&&(n+=f(t.offsetParent)),n},p=({isObject:function(t){return t===Object(t)},isArray:Array.isArray||function(t){return"[object Array]"==toString.call(t)},isEmpty:function(t){if(null==t)return!0;if(this.isArray(t)||this.isString(t))return 0===t.length;for(var n in t)if(this.has(t,n))return!1;return!0},mix:function(t,n,e){for(var r in n)t[r]=n[r];return t},extend:function(t,n,r,i){if(!n||!t)return t;var s,o=n.prototype;return s=e(o,t),t.prototype=this.mix(s,t.prototype),t.superclass=e(o,n),r&&this.mix(s,r),i&&this.mix(t,i),t},startsWith:function(t,n){return 0===t.lastIndexOf(n,0)},endsWith:function(t,n){var e=t.length-n.length;return e>=0&&t.indexOf(n,e)===e},trim:u,substitute:function(t,n,e){return"string"==typeof t&&n?t.replace(e||i,function(t,e){return"\\"===t.charAt(0)?t.slice(1):void 0===n[e]?s:n[e]}):t},vendor:function(){for(var t,n=document.createElement("div").style,e=["t","webkitT","MozT","msT","OT"],r=0,i=e.length;i>r;r++)if(t=e[r]+"ransform",t in n)return e[r].substr(0,e[r].length-1);return!1}(),prefixStyle:function(t){return this.vendor===!1?!1:""===this.vendor?t:this.vendor+t.charAt(0).toUpperCase()+t.substr(1)},hasClass:function(t,n){return t&&t.className&&n&&-1!=t.className.indexOf(n)},addClass:function(t,n){t&&n&&!this.hasClass(t,n)&&(t.className+=" "+n)},removeClass:function(t,n){t&&t.className&&n&&(t.className=t.className.replace(n,""))},remove:function(t){t&&t.parentNode&&t.parentNode.removeChild(t)},getOffsetTop:c,getOffsetLeft:f,findParentEl:function(t,n,e){var r=null,i=null,s=/^#/.test(n)?"id":/^\./.test(n)?"class":"tag",o=n.replace(/\.|#/g,"");if(e&&"string"==typeof e&&(e=document.querySelector(e)),e=e||document.body,t&&n){if("class"==s&&t.className&&t.className.match(o))return t;if("id"==s&&t.id&&u(t.id)==o)return t;if("tag"==s&&t.tagName.toLowerCase()==o)return t;for(;!r&&i!=e&&(i=t.parentNode);){if("class"==s&&i.className&&i.className.match(o)||"id"==s&&i.id&&u(i.id)==o||"tag"==s&&i.tagName&&i.tagName.toLowerCase()==o)return r=i;t=i}return null}},guid:function(t){var n=++a+"";return t?t+n:n},isAndroid:function(){return/Android /.test(window.navigator.appVersion)},isBadAndroid:function(){return/Android /.test(window.navigator.appVersion)&&!/Chrome\/\d/.test(window.navigator.appVersion)},px2Num:function(t){return Number(t.replace(/px/,""))},getNodes:r,getNode:function(t,n){var e=r(t,n);return e&&e[0]},stringifyStyle:function(t){var n="";for(var e in t)n+=[e,":",t[e],";"].join("");return n}}),d=["Arguments","Function","String","Number","Date","RegExp"],h=0;h<d.length;h++)p["is"+d[h]]=function(t){return toString.call(t)=="[object "+d[h]+"]"};return"object"==typeof module&&module.exports?t=p:p}(t),n=function(n){var e=t,r=function(t){var n,e=!1;return function(){return e?n:(e=!0,n=t.apply(this,arguments),t=null,n)}},i={on:function(t,n,e){if(!o(this,"on",t,[n,e])||!n)return this;this._events||(this._events={});var r=this._events[t]||(this._events[t]=[]);return r.push({callback:n,context:e,ctx:e||this}),this},once:function(t,n,e){if(!o(this,"once",t,[n,e])||!n)return this;var i=this,s=r(function(){i.off(t,s),n.apply(this,arguments)});return s._callback=n,this.on(t,s,e)},off:function(t,n,e){if(!this._events||!o(this,"off",t,[n,e]))return this;if(!t&&!n&&!e)return this._events=void 0,this;for(var r=t?[t]:Object.keys(this._events),i=0,s=r.length;s>i;i++){t=r[i];var l=this._events[t];if(l)if(n||e){for(var u=[],a=0,c=l.length;c>a;a++){var f=l[a];(n&&n!==f.callback&&n!==f.callback._callback||e&&e!==f.context)&&u.push(f)}u.length?this._events[t]=u:delete this._events[t]}else delete this._events[t]}return this},trigger:function(t){if(!this._events)return this;var n=Array.prototype.slice.call(arguments,1);if(!o(this,"trigger",t,n))return this;var e=this._events[t],r=this._events.all;return e&&l(e,n),r&&l(r,arguments),this},listenTo:function(t,n,r){var i=this._listeningTo||(this._listeningTo={}),s=t._listenId||(t._listenId=e.guid("l"));return i[s]=t,r||"object"!=typeof n||(r=this),t.on(n,r,this),this},listenToOnce:function(t,n,e){if("object"==typeof n){for(var i in n)this.listenToOnce(t,i,n[i]);return this}var s=r(function(){this.stopListening(t,n,s),e.apply(this,arguments)});return s._callback=e,this.listenTo(t,n,s)},stopListening:function(t,n,r){var i=this._listeningTo;if(!i)return this;var s=!n&&!r;r||"object"!=typeof n||(r=this),t&&((i={})[t._listenId]=t);for(var o in i)t=i[o],t.off(n,r,this),(s||e.isEmpty(t._events))&&delete this._listeningTo[o];return this}},s=/\s+/,o=function(t,n,e,r){if(!e)return!0;if("object"==typeof e){for(var i in e)t[n].apply(t,[i,e[i]].concat(r));return!1}if(s.test(e)){for(var o=e.split(s),l=0,u=o.length;u>l;l++)t[n].apply(t,[o[l]].concat(r));return!1}return!0},l=function(t,n){var e,r=-1,i=t.length,s=n[0],o=n[1],l=n[2];switch(n.length){case 0:for(;++r<i;)(e=t[r]).callback.call(e.ctx);return;case 1:for(;++r<i;)(e=t[r]).callback.call(e.ctx,s);return;case 2:for(;++r<i;)(e=t[r]).callback.call(e.ctx,s,o);return;case 3:for(;++r<i;)(e=t[r]).callback.call(e.ctx,s,o,l);return;default:for(;++r<i;)(e=t[r]).callback.apply(e.ctx,n);return}};return i.bind=i.on,i.unbind=i.off,"object"==typeof module&&module.exports?n=i:i}(n),e=function(e){var r=t,i=n,s=function(){};return r.mix(s.prototype,i),r.mix(s.prototype,{plug:function(t){var n=this;if(t&&t.pluginId){n.__plugins||(n.__plugins=[]);var e=n.getPlugin(t.pluginId);return e&&n.unplug(t.pluginId),t.pluginInitializer(n),n.__plugins.push(t),n}},unplug:function(t){var n=this;if(t&&n.__plugins){var e="string"==typeof t?n.getPlugin(t):t;e.pluginDestructor(n);for(var r=0,i=n.__plugins.length;i>r;r++)if(n.__plugins[r]==e)return n.__plugins.splice(r,1)}},getPlugin:function(t){var n=this,e=[];if(n.__plugins){for(var r=0,i=n.__plugins.length;i>r;r++)n.__plugins[r]&&n.__plugins[r].pluginId==t&&e.push(n.__plugins[r]);return e.length>1?e:e[0]||null}}}),"object"==typeof module&&module.exports?e=s:s}(e),r=function(n){var r,i=t,s=e,o="Pull Down To Refresh",l="Loading...",u=function(t){u.superclass.constructor.call(this,t),this.userConfig=i.mix({content:o,height:60,autoRefresh:!0,downContent:"Pull Down To Refresh",upContent:"Release To Refresh",loadingContent:l,clsPrefix:"xs-plugin-pulldown-"},t)};if(i.extend(u,s,{pluginId:"pulldown",pluginInitializer:function(t){var n=this;return n.xscroll=t.render(),r=n.userConfig.clsPrefix,n.render(),n},pluginDestructor:function(){var t=this;i.remove(t.pulldown),t.xscroll.off("panstart",t._panStartHandler,t),t.xscroll.off("pan",t._panHandler,t),t.xscroll.off("panend",t._panEndHandler,t),t.__isRender=!1,t._evtBinded=!1},render:function(){var t=this;if(!t.__isRender){t.__isRender=!0;var n=r+"container",e=t.userConfig.height||60,s=t.pulldown=document.createElement("div");return s.className=n,s.style.position="absolute",s.style.width="100%",s.style.height=e+"px",s.style.lineHeight=e+"px",s.style.top=-e+"px",s.style.textAlign="center",t.xscroll.container.appendChild(s),t.status="up",i.addClass(s,r+t.status),s.innerHTML=t.userConfig[t.status+"Content"]||t.userConfig.content,t._bindEvt(),t}},_bindEvt:function(){var t=this;if(!t._evtBinded){t._evtBinded=!0;var n=(t.pulldown,t.xscroll);n.on("pan",t._panHandler,t),n.on("panstart",t._panStartHandler,t),n.on("panend",t._panEndHandler,t)}},_changeStatus:function(t){var n=this.status;this.status=t,i.removeClass(this.pulldown,r+n),i.addClass(this.pulldown,r+t),this.userConfig[t+"Content"]&&(this.pulldown.innerHTML=this.userConfig[t+"Content"]),n!=t&&(this.trigger("statuschange",{prevVal:n,newVal:t}),"loading"==t&&this.trigger("loading"))},reset:function(t){return this.xscroll.boundry.resetTop(),this.xscroll.boundryCheckY(t),this._expanded=!1,this},_panStartHandler:function(t){clearTimeout(this.loadingItv)},_panHandler:function(t){var n=this,e=n.xscroll.getScrollTop();e>0||n._changeStatus(Math.abs(e)<n.userConfig.height?"down":"up")},_panEndHandler:function(t){var n=this,e=n.xscroll,r=n.userConfig.height||60,i=e.getScrollTop();-r>i&&(t.preventDefault(),e.boundry.resetTop(),e.boundry.expandTop(r),e.boundryCheckY(function(){n._changeStatus("loading")}),n.userConfig.autoRefresh&&(clearTimeout(n.loadingItv),n.loadingItv=setTimeout(function(){e.boundry.resetTop(),e.boundryCheckY(function(){window.location.reload()})},800)))}}),"object"==typeof module&&module.exports)n=u;else if(window.XScroll&&window.XScroll.Plugins)return XScroll.Plugins.PullDown=u;return n}(r)}();
