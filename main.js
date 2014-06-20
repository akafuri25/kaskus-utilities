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
					
					hfed.find('.user-tools a[href^="/edit_post/"]').after('<a href="javascript://" class="button small white qedit" style="margin-left: 3px"><i class="icon-edit icon-large"></i> Quick Edit</a>');

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
		}
	});
}
