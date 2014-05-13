var $menuatas = $(".meta-header-bar.mobile-hide ul")
,	$menukiri = $(".meta-header-bar.log-bar > ul")
,	login = $(".meta-header-bar .vcard a .fn").html();


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
	$ini.after('<p data-height="546" data-theme-id="0" data-slug-hash="'+data[5]+'" data-user="'+data[3]+'" data-default-tab="result" class="codepen">');
});

$("body").append('<script async src="//codepen.io/assets/embed/ei.js"></script>');

//Pretty Print
$("pre").addClass("prettyprint linenums").css({'background-color':'#333'});
var pretty_css = 'pre ol.linenums {list-style-type: decimal;margin-left: 30px;} pre ol.linenums li {list-style-type: decimal;}';
$("body").append('<script async src="https://google-code-prettify.googlecode.com/svn/loader/run_prettify.js?skin=desert"></script><style>'+pretty_css+'</style>');


//JSFiddle
$("a[href^='http://jsfiddle.net/'][href*='/embedded/']").each(function(){	
	$(this).after('<iframe width="100%" height="300" src="'+$(this).attr('href')+'" allowfullscreen="allowfullscreen" frameborder="0"></iframe>');
});

//====
// Post detector
//====

if(login){

	var real = login;

	console.log("testTIIIIIIIINNNGGGG !!!", real);

	$('.row[id^="post"]').each(function(a,b) {
		var ini = $(this);
		var dme = ini.find(".author.vcard .user-details a.nickname").html();

		ini.find(".entry .post-quote").each(function(a,b) {
			var itu = $(this)
			,	author = itu.find("span:last-child b").html();
			if(author == real) {
				ini.find(".entry-head").attr('style', 'background:#E09855 !important');
				ini.find(".hfeed").attr('style', 'border-left:5px solid #BB7D43 !important');
				
				itu.find("span:last-child").attr('style',
					'box-shadow: 0px 0px 10px rgba(74, 141, 204, 0.46) !important; border:1px solid rgba(74, 141, 204, 0.46)!important;padding: 5px;color: #484848;display: block;width: 95%;margin: auto;border: 1px inset;');
				console.log("Found", ini.find(".author.vcard .user-details a.nickname").html());
			}
		});

		if(dme == " " + real + " ") {
			ini.find(".entry-head").attr('style', 'background:#62B396 !important');
			ini.find(".hfeed").attr('style', 'border-left:5px solid #579B83 !important');
		}
	});
}

