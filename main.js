/*!
 * Tools.js
 * jQuery Tools v1.2.6 - The missing UI library for the Web
 * 
 * tabs/tabs.js
 * tabs/tabs.slideshow.js
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * http://flowplayer.org/tools/
 * 
 */
(function(a){a.tools=a.tools||{version:"v1.2.6"},a.tools.tabs={conf:{tabs:"a",current:"current",onBeforeClick:null,onClick:null,effect:"default",initialIndex:0,event:"click",rotate:!1,slideUpSpeed:400,slideDownSpeed:400,history:!1},addEffect:function(a,c){b[a]=c}};var b={"default":function(a,b){this.getPanes().hide().eq(a).show(),b.call()},fade:function(a,b){var c=this.getConf(),d=c.fadeOutSpeed,e=this.getPanes();d?e.fadeOut(d):e.hide(),e.eq(a).fadeIn(c.fadeInSpeed,b)},slide:function(a,b){var c=this.getConf();this.getPanes().slideUp(c.slideUpSpeed),this.getPanes().eq(a).slideDown(c.slideDownSpeed,b)},ajax:function(a,b){this.getPanes().eq(0).load(this.getTabs().eq(a).attr("href"),b)}},c,d;a.tools.tabs.addEffect("horizontal",function(b,e){if(!c){var f=this.getPanes().eq(b),g=this.getCurrentPane();d||(d=this.getPanes().eq(0).width()),c=!0,f.show(),g.animate({width:0},{step:function(a){f.css("width",d-a)},complete:function(){a(this).hide(),e.call(),c=!1}}),g.length||(e.call(),c=!1)}});function e(c,d,e){var f=this,g=c.add(this),h=c.find(e.tabs),i=d.jquery?d:c.children(d),j;h.length||(h=c.children()),i.length||(i=c.parent().find(d)),i.length||(i=a(d)),a.extend(this,{click:function(c,d){var i=h.eq(c);typeof c=="string"&&c.replace("#","")&&(i=h.filter("[href*="+c.replace("#","")+"]"),c=Math.max(h.index(i),0));if(e.rotate){var k=h.length-1;if(c<0)return f.click(k,d);if(c>k)return f.click(0,d)}if(!i.length){if(j>=0)return f;c=e.initialIndex,i=h.eq(c)}if(c===j)return f;d=d||a.Event(),d.type="onBeforeClick",g.trigger(d,[c]);if(!d.isDefaultPrevented()){b[e.effect].call(f,c,function(){j=c,d.type="onClick",g.trigger(d,[c])}),h.removeClass(e.current),i.addClass(e.current);return f}},getConf:function(){return e},getTabs:function(){return h},getPanes:function(){return i},getCurrentPane:function(){return i.eq(j)},getCurrentTab:function(){return h.eq(j)},getIndex:function(){return j},next:function(){return f.click(j+1)},prev:function(){return f.click(j-1)},destroy:function(){h.unbind(e.event).removeClass(e.current),i.find("a[href^=#]").unbind("click.T");return f}}),a.each("onBeforeClick,onClick".split(","),function(b,c){a.isFunction(e[c])&&a(f).bind(c,e[c]),f[c]=function(b){b&&a(f).bind(c,b);return f}}),e.history&&a.fn.history&&(a.tools.history.init(h),e.event="history"),h.each(function(b){a(this).bind(e.event,function(a){f.click(b,a);return a.preventDefault()})}),i.find("a[href^=#]").bind("click.T",function(b){f.click(a(this).attr("href"),b)}),location.hash&&e.tabs=="a"&&c.find("[href="+location.hash+"]").length?f.click(location.hash):(e.initialIndex===0||e.initialIndex>0)&&f.click(e.initialIndex)}a.fn.tabs=function(b,c){var d=this.data("tabs");d&&(d.destroy(),this.removeData("tabs")),a.isFunction(c)&&(c={onBeforeClick:c}),c=a.extend({},a.tools.tabs.conf,c),this.each(function(){d=new e(a(this),b,c),a(this).data("tabs",d)});return c.api?d:this}})(jQuery);
(function(a){var b;b=a.tools.tabs.slideshow={conf:{next:".forward",prev:".backward",disabledClass:"disabled",autoplay:!1,autopause:!0,interval:3e3,clickable:!0,api:!1}};function c(b,c){var d=this,e=b.add(this),f=b.data("tabs"),g,h=!0;function i(c){var d=a(c);return d.length<2?d:b.parent().find(c)}var j=i(c.next).click(function(){f.next()}),k=i(c.prev).click(function(){f.prev()});function l(){g=setTimeout(function(){f.next()},c.interval)}a.extend(d,{getTabs:function(){return f},getConf:function(){return c},play:function(){if(g)return d;var b=a.Event("onBeforePlay");e.trigger(b);if(b.isDefaultPrevented())return d;h=!1,e.trigger("onPlay"),e.bind("onClick",l),l();return d},pause:function(){if(!g)return d;var b=a.Event("onBeforePause");e.trigger(b);if(b.isDefaultPrevented())return d;g=clearTimeout(g),e.trigger("onPause"),e.unbind("onClick",l);return d},resume:function(){h||d.play()},stop:function(){d.pause(),h=!0}}),a.each("onBeforePlay,onPlay,onBeforePause,onPause".split(","),function(b,e){a.isFunction(c[e])&&a(d).bind(e,c[e]),d[e]=function(b){return a(d).bind(e,b)}}),c.autopause&&f.getTabs().add(j).add(k).add(f.getPanes()).hover(d.pause,d.resume),c.autoplay&&d.play(),c.clickable&&f.getPanes().click(function(){f.next()});if(!f.getConf().rotate){var m=c.disabledClass;f.getIndex()||k.addClass(m),f.onBeforeClick(function(a,b){k.toggleClass(m,!b),j.toggleClass(m,b==f.getTabs().length-1)})}}a.fn.slideshow=function(d){var e=this.data("slideshow");if(e)return e;d=a.extend({},b.conf,d),this.each(function(){e=new c(a(this),d),a(this).data("slideshow",e)});return d.api?e:this}})(jQuery);

/*! ===========================================================
 * tooltip.js
 * bootstrap-tooltip.js v2.0.2
 * http://twitter.github.com/bootstrap/javascript.html#tooltips
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

!function(a){"use strict";var b=function(a,b){this.init("tooltip",a,b)};b.prototype={constructor:b,init:function(b,c,d){var e,f;this.type=b;this.$element=a(c);this.options=this.getOptions(d);this.enabled=true;if(this.options.trigger!="manual"){e=this.options.trigger=="hover"?"mouseenter":"focus";f=this.options.trigger=="hover"?"mouseleave":"blur";this.$element.on(e,this.options.selector,a.proxy(this.enter,this));this.$element.on(f,this.options.selector,a.proxy(this.leave,this))}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},getOptions:function(b){b=a.extend({},a.fn[this.type].defaults,b,this.$element.data());if(b.delay&&typeof b.delay=="number"){b.delay={show:b.delay,hide:b.delay}}return b},enter:function(b){var c=a(b.currentTarget)[this.type](this._options).data(this.type);if(!c.options.delay||!c.options.delay.show){c.show()}else{c.hoverState="in";setTimeout(function(){if(c.hoverState=="in"){c.show()}},c.options.delay.show)}},leave:function(b){var c=a(b.currentTarget)[this.type](this._options).data(this.type);if(!c.options.delay||!c.options.delay.hide){c.hide()}else{c.hoverState="out";setTimeout(function(){if(c.hoverState=="out"){c.hide()}},c.options.delay.hide)}},show:function(){var a,b,c,d,e,f,g;if(this.hasContent()&&this.enabled){a=this.tip();this.setContent();if(this.options.animation){a.addClass("fade")}f=typeof this.options.placement=="function"?this.options.placement.call(this,a[0],this.$element[0]):this.options.placement;b=/in/.test(f);a.remove().css({top:0,left:0,display:"block"}).appendTo(b?this.$element:document.body);c=this.getPosition(b);d=a[0].offsetWidth;e=a[0].offsetHeight;switch(b?f.split(" ")[1]:f){case"bottom":g={top:c.top+c.height,left:c.left+c.width/2-d/2};break;case"top":g={top:c.top-e,left:c.left+c.width/2-d/2};break;case"left":g={top:c.top+c.height/2-e/2,left:c.left-d};break;case"right":g={top:c.top+c.height/2-e/2,left:c.left+c.width};break}a.css(g).addClass(f).addClass("in")}},setContent:function(){var a=this.tip();a.find(".tooltip-inner").html(this.getTitle());a.removeClass("fade in top bottom left right")},hide:function(){function d(){var b=setTimeout(function(){c.off(a.support.transition.end).remove()},500);c.one(a.support.transition.end,function(){clearTimeout(b);c.remove()})}var b=this,c=this.tip();c.removeClass("in");a.support.transition&&this.$tip.hasClass("fade")?d():c.remove()},fixTitle:function(){var a=this.$element;if(a.attr("title")||typeof a.attr("data-original-title")!="string"){a.attr("data-original-title",a.attr("title")||"").removeAttr("title")}},hasContent:function(){return this.getTitle()},getPosition:function(b){return a.extend({},b?{top:0,left:0}:this.$element.offset(),{width:this.$element[0].offsetWidth,height:this.$element[0].offsetHeight})},getTitle:function(){var a,b=this.$element,c=this.options;a=b.attr("data-original-title")||(typeof c.title=="function"?c.title.call(b[0]):c.title);a=(a||"").toString().replace(/(^\s*|\s*$)/,"");return a},tip:function(){return this.$tip=this.$tip||a(this.options.template)},validate:function(){if(!this.$element[0].parentNode){this.hide();this.$element=null;this.options=null}},enable:function(){this.enabled=true},disable:function(){this.enabled=false},toggleEnabled:function(){this.enabled=!this.enabled},toggle:function(){this[this.tip().hasClass("in")?"hide":"show"]()}};a.fn.tooltip=function(c){return this.each(function(){var d=a(this),e=d.data("tooltip"),f=typeof c=="object"&&c;if(!e)d.data("tooltip",e=new b(this,f));if(typeof c=="string")e[c]()})};a.fn.tooltip.Constructor=b;a.fn.tooltip.defaults={animation:true,delay:0,selector:false,placement:"top",trigger:"hover",title:"",template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'}}(window.jQuery);!function(a){"use strict";var b=function(a,b){this.init("popover",a,b)};b.prototype=a.extend({},a.fn.tooltip.Constructor.prototype,{constructor:b,setContent:function(){var b=this.tip(),c=this.getTitle(),d=this.getContent();b.find(".popover-title")[a.type(c)=="object"?"append":"html"](c);b.find(".popover-content > *")[a.type(d)=="object"?"append":"html"](d);b.removeClass("fade top bottom left right in")},hasContent:function(){return this.getTitle()||this.getContent()},getContent:function(){var a,b=this.$element,c=this.options;a=b.attr("data-content")||(typeof c.content=="function"?c.content.call(b[0]):c.content);a=a.toString().replace(/(^\s*|\s*$)/,"");return a},tip:function(){if(!this.$tip){this.$tip=a(this.options.template)}return this.$tip}});a.fn.popover=function(c){return this.each(function(){var d=a(this),e=d.data("popover"),f=typeof c=="object"&&c;if(!e)d.data("popover",e=new b(this,f));if(typeof c=="string")e[c]()})};a.fn.popover.Constructor=b;a.fn.popover.defaults=a.extend({},a.fn.tooltip.defaults,{placement:"right",content:"",template:'<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'})}(window.jQuery);


var storage = chrome.storage.local;

var $menuatas = $(".meta-header-bar.mobile-hide ul")
,	$menukiri = $(".meta-header-bar.log-bar > ul")
,	login = $("#after-login .tools").html();


/**
 * Global Variable
 * AUTO | MANUAL
 */

 var jsfiddle = 'manual'
 ,	 codepen  = 'manual'
 ,	 jsbin	  = 'manual';


if(login) {
	login = login.split("Hi, ")[1];
} else {
	login = null;
}


var lmenu	= [{'name':'Settings','url':'#'},{'name':'Kulkas','url':'#'},{'name':'My Post','url':'#'}, {'name':'Subsribe Thread','url':'#'}]

if(login) {
	/*$menuatas.append("<li><a href='#' id='op-kulkas'>Kulkas</a></li>");*/
	$menukiri.append("<li id='op-more' class='shortcut dropdown tools-panel'><a href='#'><i class='icon-plus header-icon'></i></a><ul class='sub-menu dropdown-menu'></ul></li>");
	$.each(lmenu, function(a,b){
		$(".meta-header-bar.log-bar > ul #op-more > ul.sub-menu").append("<li><a href='"+b.url+"'>"+b.name+"</a></li>");
	});

	//CLick event
	$("#op-more").click(function(event){
		var $menuini = $(this);
		$(".dropdown").removeClass("open").find("ul.sub-menu.dropdown-menu").hide();
		if($menuini.hasClass('open'))
		{
			$('#op-more > ul.sub-menu.dropdown-menu').hide();
			$menuini.removeClass('open');	
			return false;
		}
		$menuini.addClass('open');
		$('#op-more > ul.sub-menu.dropdown-menu').show();

		$(document).one('click', function(){			
			$menuini.removeClass('open');							
			$('#op-more > ul.sub-menu.dropdown-menu').hide();
		});
		return false;
	});
}

$(".dropdown > a.tools").click(function(){
	$('#op-more > ul.sub-menu.dropdown-menu').hide();
	$("#op-more").removeClass('open');
	return false;
});

$("body").append("<div id='modal-sc'></div>");
$("#modal-sc").html("cendol");

$("#modal-sc").css({
				'position': 'fixed',
				'top': '10%',
				'background': '#FFF',
				'left': '13%',
				'right': '13%',
				'z-index': '9999',
				'padding': '15px',
				'box-shadow': '0px 2px 3px rgba(0, 0, 0, 0.2)',
				'display': 'none'
			});

//=====
//

$("#op-kulkas").click(function(){
	$("#modal-sc").fadeIn();
	$("#modal-sc").html("<h1 style='text-align:center;font-size:20px;font-weight:bold;margin:50px;'>Loading...</h1>");
	$.ajax({
		type: "GET",
		url: '/myforum',
		dataType: "html"
	}).done(function(data) {
		var jadi = $(data).find(".reputation-table").html();
		$("#modal-sc").html('<h1>Reputation List</h1>' + jadi + '<a href="#" id="close-md">[Close]</a>');

		$("#modal-sc > h1").css({
			'font-size': '15px',
			'font-weight': 'bold',
			'margin-bottom': '10px'
		});

		$("#close-md").click(function(){
			$("#modal-sc").fadeOut(500, function(){
				$("#modal-sc").html('');
			});
			return false;
		});

	});
	return false;
});

//Codepen Selector
$("a[href^='http://codepen.io/'][href*='/pen/']").each(function(){
	var $ini = $(this)
	,	data = $ini.attr("href").split("/");

	storage.get("codepen", function(option) {
	
		if(option.codepen.tipe)
		{
			if(option.codepen.auto == false) {
				$ini.after("<a href='javascript://' class='open-manual embed-open' data-tipe='codepen' data-t1='"+data[5]+"' data-t2='"+data[3]+"'>View Codepen</a>");
			} else {
				$ini.after('<p data-height="545" data-theme-id="0" data-slug-hash="'+data[5]+'" data-user="'+data[3]+'" data-default-tab="result" class="codepen"> <script async src="//codepen.io/assets/embed/ei.js"></script>');
			}
		}

	});
});

//Pretty Print
storage.get("syntax", function(option) {
	if(option.syntax.tipe) {
		$("pre").addClass("prettyprint linenums").css({'background-color':'#333','border':'none'});
		var pretty_css = 'pre ol.linenums {list-style-type: decimal;margin-left: 30px;} pre ol.linenums li {list-style-type: decimal;}';
		$("body").append('<script async src="https://google-code-prettify.googlecode.com/svn/loader/run_prettify.js?skin=desert"></script><style>'+pretty_css+'</style><link rel="stylesheet" type="text/css" href="http://jmblog.github.io/color-themes-for-google-code-prettify/css/themes/tomorrow-night.css">');
	}
});


//JSFiddle
$("a[href^='http://jsfiddle.net/']").each(function(a,b){	
	var $ini = $(this);
	var ini_href = $ini.attr('href');
	var reg = /\bjsfiddle\.net\/user\/([^&\b\?]+)/i;
	if (!ini_href.match(reg)) {
	storage.get("jsfiddle", function(option) {

		if(option.jsfiddle.tipe)
		{
			if(option.jsfiddle.auto == false) {
				if (jsfiddle_url.toLowerCase().indexOf("embedded") >= 0) {
					var fiddle_url = jsfiddle_url.replace('jsfiddle', 'fiddle.jshell');
					$.ajax({
			            'url': fiddle_url,
			            data: {},
			            complete: function(xhr, data) {
			            if (xhr.status == 404)
			               $ini.after('<span class="not-found">this fiddle not found</span>');
			            else
			               $ini.after("<a href='javascript://' class='open-manual embed-open' data-tipe='jsfiddle' data-url='" + $ini.attr("href") + "'>View Jsfiddle</a>");
			            }
			        });
				} else {
	                jsfiddle_url = jsfiddle_url.replace(/\/$/, '');
			        var else_fiddle_url = jsfiddle_url.replace('jsfiddle', 'fiddle.jshell');
			        $.ajax({
			            'url': else_fiddle_url + '/embedded',
			            data: {},
			            complete: function(xhr, data) {
			            if (xhr.status == 404)
			               $ini.after('<span class="not-found">this fiddle not found</span>');
			            else
			               $ini.after("<a href='javascript://' class='open-manual embed-open' data-tipe='jsfiddle' data-url='" + $ini.attr("href") + "'>View Jsfiddle</a>"); 
			            }
			        });
			    }
				
			} else {
				var jsfiddle_url = $ini.attr('href');
				if (jsfiddle_url.toLowerCase().indexOf("embedded") >= 0) {
					var fiddle_url = jsfiddle_url.replace('jsfiddle', 'fiddle.jshell');
                	var iframe = '<iframe width="100%" height="300" src="'+jsfiddle_url+'" frameborder="0"></iframe>';
                	$.ajax({
			            'url': fiddle_url,
			            data: {},
			            complete: function(xhr, data) {
			            if (xhr.status == 404)
			               $ini.after('<span class="not-found">this fiddle not found</span>');
			            else
			               $ini.after(iframe); 
			            }
			        });
	            }
	            else {
	                jsfiddle_url = jsfiddle_url.replace(/\/$/, '');
			        var else_fiddle_url = jsfiddle_url.replace('jsfiddle', 'fiddle.jshell');
			        var iframe = '<iframe width="100%" height="300" src="' + jsfiddle_url + '/embedded" frameborder="0"></iframe>';

			        $.ajax({
			            'url': else_fiddle_url + '/embedded',
			            data: {},
			            complete: function(xhr, data) {
			            if (xhr.status == 404)
			               $ini.after('<span class="not-found">this fiddle not found</span>');
			            else
			               $ini.after(iframe); 
			            }
			        });
	            }
				
			}
		}

	});
    }
    
	
});

//JSBin
$("a[href^='http://jsbin.com/'][href*='/embed']").each(function(a,b){	
	var $ini = $(this);
	storage.get("jsbin", function(option) {

		if(option.jsbin.tipe)
		{
			if(option.jsbin.auto == false) {
				$ini.after("<a href='javascript://' class='open-manual embed-open' data-tipe='jsbin' data-url='" + $ini.attr("href") + "'>View JSbin</a>");
			} else {
				$ini.after('<a class="jsbin-embed" href="' + $ini.attr("href") + '">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>');
			}
		}
	
	});

});


$(".open-manual").on('click', function() {
	var tipe = $(this).data("tipe");
	
	if(tipe == 'jsfiddle') {
		$(this).after('<iframe width="100%" height="545" src="'+$(this).data('url')+'" allowfullscreen="allowfullscreen" frameborder="0"></iframe>');
		$(this).remove();
	}

	if(tipe == 'codepen') {
		$(this).after('<p data-height="545" data-theme-id="0" data-slug-hash="' + $(this).data("t1") + '" data-user="' + $(this).data("t2") + '" data-default-tab="result" class="codepen"> <script async src="//codepen.io/assets/embed/ei.js"></script>');
		$(this).remove();
	}

	if(tipe == 'jsbin') {
		$(this).after('<a class="jsbin-embed" href="' + $(this).data("url") + '">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>');
		$(this).remove();
	}

});

//====
// Post detector
//====

if(login){

	var real = login;

	//console.log("testTIIIIIIIINNNGGGG !!!", real);

	$('.row[id^="post"]').each(function(a,b) {
		var ini = $(this);
		var dme = ini.find(".author.vcard .user-details a.nickname").html();

		ini.find(".entry > .post-quote").each(function(a,b) {
			var itu = $(this)
			,	author = itu.find("span:last-child b").html();
			if(author == real) {
				ini.find(".entry-head").attr('style', 'background:#E09855 !important');
				ini.find(".hfeed").attr('style', 'border-left:5px solid #BB7D43 !important');
				
				itu.find("> span:last-child").attr('style',
					'box-shadow: 0px 0px 0px 5px rgba(74, 141, 204, 0.15) !important; border:1px solid rgba(74, 141, 204, 0.46)!important;padding: 5px;color: #484848;display: block;width: 95%;margin: auto;border: 1px inset;');
				//console.log("Found", ini.find(".author.vcard .user-details a.nickname").html());
			}
			//console.log('ada saya', a);
		});

		if(dme == " " + real + " ") {
			ini.find(".entry-head").attr('style', 'background:#62B396 !important');
			ini.find(".hfeed").attr('style', 'border-left:5px solid #579B83 !important');
			//console.log('post saya');
			
			// ==============================
			// Quick Edit FEATURE !!
			// ==============================
			
			storage.get("quickedit", function(option) {
				if(option.quickedit.tipe)
				{
					var hfed = ini.find('.hfeed');
					
					hfed.find('.user-tools a[href^="/edit_post/"]').after('<a href="javascript://" class="button small white qedit" style="margin-left: 3px;color: #FFF !important;"><i class="icon-edit icon-large"></i> Quick Edit</a>');

					hfed.find(".user-tools a.qedit").on('click', function() {

						var postsaya = hfed.find('.entry[itemprop="text"]');
						$("a.qedit").hide();

						postsaya.css('opacity', 0.5);
						console.log("di klik !");
						$.ajax({
							url  		: hfed.find('.user-tools a[href^="/edit_post/"]').attr('href')
						,	type 		: 'GET'
						,	dataType	: 'html'
						,		
						}).done(function(data) {
							postsaya.after('<div class="q-edit"><form method="post" action="' + hfed.find('.user-tools a[href^="/edit_post/"]').attr('href') + '"><textarea id="message-qed" name="message">' + $(data).find("#reply-messsage").html() + '</textarea><input type="hidden" name="securitytoken" value="' + $(data).find("input[type=hidden][name=securitytoken]").val() + '"><div class="footer-qed"><input type="submit" class="button medium blue" name="sbutton" value="Save changes"> <input type="button" class="button medium blue cancel" name="sbutton" value="Cancel"></div></form></div>');
							postsaya.hide();

							$(".q-edit input.cancel").on('click', function() {
								$(".q-edit").remove();
								$("a.qedit").show();
								postsaya.show();
								postsaya.css('opacity', 1);
							});

						}).fail(function() {
							alert("gagal mengeksekusi !");
							$("a.qedit").show();
							postsaya.css('opacity', 1);
						});
						return false;
					});
				}
			});

		} else {

			// ==============================
			// Quick Quote FEATURE !!
			// ==============================
			var hfed = ini.find('.hfeed');
			hfed.find('.user-tools a[href^="/post_reply/"]').not('a[onclick^="quote"]').after('<a href="javascript://" class="button small white qquote" style="margin-left: 3px;color: #FFF !important;"><i class="fa-mail-reply-all icon-large"></i> Quick Quote</a>');

			hfed.find(".user-tools a.qquote").on('click', function() {
				var post_orang  = hfed.find('.entry[itemprop="text"]')
				,	url_post	= hfed.find('.user-tools a[href^="/post_reply/"]').not('a[onclick^="quote"]').attr('href');

				post_orang.css('opacity', 0.5);

				$.ajax({
					url  		: url_post
				,	type 		: 'GET'
				,	dataType	: 'html'
				,		
				}).done(function(data) {

					post_orang.after('<div class="q-quick">'
									+	'<form method="post" action="' + url_post + '">'
									+		'<script src="http://www.google.com/recaptcha/api/js/recaptcha_ajax.js"></script>'	
									+		'<textarea id="message-quick" name="message">' + $(data).find("#reply-messsage").html() + '</textarea>'
									+		'<input type="hidden" name="securitytoken" value="' + $(data).find("input[type=hidden][name=securitytoken]").val() + '">'
									+		'<div class="capcay">'
									+			'<script></script>'
									+			'<div id="recaptcha"></div>'
									+			'<script></script>'
									+		'</div>'
									+		'<div class="footer-quick">'
									+			'<input type="button" class="button medium blue" name="sbutton" value="Post Reply" onClick="Recaptcha.create(\'6Lc7C9gSAAAAAMAoh4_tF_uGHXnvyNJ6tf9j9ndI\', \'recaptcha\', { theme: \'red\', callback: Recaptcha.focus_response_field }); return false;">' 
									+			'<input type="button" class="button medium blue cancel" name="sbutton" value="Cancel">'
									+		'</div>'
									+	'</form>'
									+'</div>');
					
					var script = "$.getScript( 'http://www.google.com/recaptcha/api/js/recaptcha_ajax.js', function(done) {" +
									"console.log('Captcha Loaded');" +
									"setTimeout(function() { Recaptcha.create('6Lc7C9gSAAAAAMAoh4_tF_uGHXnvyNJ6tf9j9ndI', 'recaptcha', { theme: 'red', callback: Recaptcha.focus_response_field }); return false; }, 1000); " +
								"});";

					run_script(script);


					$(".q-quick input.cancel").on('click', function() {
						$(".q-quick").remove();
						$("a.qedit").show();
						post_orang.show();
						post_orang.css('opacity', 1);
					});


					post_orang.hide();
				}).fail(function() {
					alert("gagal mengeksekusi !");
					$("a.qquote").show();
					post_orang.css('opacity', 1);
				});
				return false;
			});

		}
	});
}

// ======================
// Ajax Post Loader
// ------
// Love real time ? Let's do it !
// =====================

if(login) {	


	$(".thread-control .text-zoom").append('<a href="#" class="refresh-auto">Refresh</a>');
	$(".refresh-auto").on('click', function() {

		var page = $("link[rel=alternate]").attr("href").split("kaskus.co.id")[1];

		$.ajax({
			url  	 : page
		,	type 	 : 'GET'
		,	dataType : 'html'
		,		
		}).done(function(data) {

			var list_post_real = $('.row[id^="post"]')
			,	list_post_ajax = $(data).find('.row[id^="post"]');


			if(list_post_ajax.length == 20)
			{
				//Do to next thread ...
				console.log("Mentok new thread !");
			}
			else
			{
				if(list_post_ajax.length !== list_post_real.length)
				{
					$("#post-dummy").remove();
					$('.row[id^="post"]').last().after('<div class="row new-sparator" id="post-dummy"><p>New Post</p></div>');	

					setTimeout(function() {
						for(i=list_post_real.length + 1;i <= list_post_ajax.length;i++){
							//console.log('post-' + i, $(list_post_ajax[i - 1]).html());
							$('.row[id^="post"]').last().after('<div class="row" id="' + $(list_post_ajax[i - 1]).attr("id") + '">' + $(list_post_ajax[i - 1]).html() + '</div>');
						}
						static_dom();
						console.log("has new post ! " + (list_post_ajax.length - list_post_real.length));


					}, 800);

					$('html, body').animate({
				        scrollTop: $("#post-dummy").offset().top - 55
				    }, 1000);
					
				}
				else
				{
					console.log("ga ada post baru !");
				}
			}
			return false;
		}).fail(function() {
			alert("Konten gagal dimuat. Kaskus nya kepenuhan atau internet nya lagi jelek kayak kamu, iya kamu !!");
			return false;
		});

		return false;

	});
}

//Eliminate DOM event default kaskus feature
function static_dom() {
	/* Static DOM */
	$(".tools").click(function() {
        if ($(this).parent().is(".open")) {
            $(this).parent().removeClass("open");
            return false;
        }
        $(".tools").parent().removeClass("open");
        $(this).parent().addClass("open");
        return false;	
     });
     $("*[rel=tooltip]").tooltip();
     $("*[rel=popover]").popover();
}


function run_script (script) {
	$("body").append('<script id="inject-script">' + script + '</script>');
	console.log("executed !");
}