require("./module/plugin");

var storage = chrome.storage.local;

var $menuatas = $(".meta-header-bar.mobile-hide ul")
,	$menukiri = $(".meta-header-bar.log-bar > ul")
,	login = $("#after-login .tools").html();

if(login) {
	login = login.split("Hi, ")[1];
} else {
	login = null;
}

require('./module/widget').init(storage);
require('./module/thread').init(storage, login);

//====
// Post detector
//====

// if(login){

// 	var real = login;

// 	//console.log("testTIIIIIIIINNNGGGG !!!", real);

// 	$('.row[id^="post"]').each(function(a,b) {
// 		var ini = $(this);
// 		var dme = ini.find(".author.vcard .user-details a.nickname").html();

// 		ini.find(".entry > .post-quote").each(function(a,b) {
// 			var itu = $(this)
// 			,	author = itu.find("span:last-child b").html();
// 			if(author == real) {
// 				ini.find(".entry-head").attr('style', 'background:#E09855 !important');
// 				ini.find(".hfeed").attr('style', 'border-left:5px solid #BB7D43 !important');
				
// 				itu.find("> span:last-child").attr('style',
// 					'box-shadow: 0px 0px 0px 5px rgba(74, 141, 204, 0.15) !important; border:1px solid rgba(74, 141, 204, 0.46)!important;padding: 5px;color: #484848;display: block;width: 95%;margin: auto;border: 1px inset;');
// 				//console.log("Found", ini.find(".author.vcard .user-details a.nickname").html());
// 			}
// 			//console.log('ada saya', a);
// 		});

// 		if(dme == " " + real + " ") {
// 			ini.find(".entry-head").attr('style', 'background:#62B396 !important');
// 			ini.find(".hfeed").attr('style', 'border-left:5px solid #579B83 !important');
// 			//console.log('post saya');
			
// 			// ==============================
// 			// Quick Edit FEATURE !!
// 			// ==============================
			
// 			storage.get("quickedit", function(option) {
// 				if(option.quickedit.tipe)
// 				{
// 					var hfed = ini.find('.hfeed');
					
// 					hfed.find('.user-tools a[href^="/edit_post/"]').after('<a href="javascript://" class="button small white qedit" style="margin-left: 3px;color: #FFF !important;"><i class="icon-edit icon-large"></i> Quick Edit</a>');

// 					hfed.find(".user-tools a.qedit").on('click', function() {

// 						var postsaya = hfed.find('.entry[itemprop="text"]');
// 						$("a.qedit").hide();

// 						postsaya.css('opacity', 0.5);
// 						console.log("di klik !");
// 						$.ajax({
// 							url  		: hfed.find('.user-tools a[href^="/edit_post/"]').attr('href')
// 						,	type 		: 'GET'
// 						,	dataType	: 'html'
// 						,		
// 						}).done(function(data) {
// 							postsaya.after('<div class="q-edit"><form method="post" action="' + hfed.find('.user-tools a[href^="/edit_post/"]').attr('href') + '"><textarea id="message-qed" name="message">' + $(data).find("#reply-messsage").html() + '</textarea><input type="hidden" name="securitytoken" value="' + $(data).find("input[type=hidden][name=securitytoken]").val() + '"><div class="footer-qed"><input type="submit" class="button medium blue" name="sbutton" value="Save changes"> <input type="button" class="button medium blue cancel" name="sbutton" value="Cancel"></div></form></div>');
// 							postsaya.hide();

// 							$(".q-edit input.cancel").on('click', function() {
// 								$(".q-edit").remove();
// 								$("a.qedit").show();
// 								postsaya.show();
// 								postsaya.css('opacity', 1);
// 							});

// 						}).fail(function() {
// 							alert("gagal mengeksekusi !");
// 							$("a.qedit").show();
// 							postsaya.css('opacity', 1);
// 						});
// 						return false;
// 					});
// 				}
// 			});

// 		} else {

// 			// ==============================
// 			// Quick Quote FEATURE !!
// 			// ==============================
// 			var hfed = ini.find('.hfeed');
// 			//hfed.find('.user-tools a[href^="/post_reply/"]').not('a[onclick^="quote"]').after('<a href="javascript://" class="button small white qquote" style="margin-left: 3px;color: #FFF !important;"><i class="fa-mail-reply-all icon-large"></i> Quick Quote</a>');

// 			hfed.find(".user-tools a.qquote").on('click', function() {
// 				var post_orang  = hfed.find('.entry[itemprop="text"]')
// 				,	url_post	= hfed.find('.user-tools a[href^="/post_reply/"]').not('a[onclick^="quote"]').attr('href');

// 				post_orang.css('opacity', 0.5);

// 				$.ajax({
// 					url  		: url_post
// 				,	type 		: 'GET'
// 				,	dataType	: 'html'
// 				,		
// 				}).done(function(data) {

// 					post_orang.after('<div class="q-quick">'
// 									+	'<form method="post" action="' + url_post + '">'
// 									+		'<script src="http://www.google.com/recaptcha/api/js/recaptcha_ajax.js"></script>'	
// 									+		'<textarea id="message-quick" name="message">' + $(data).find("#reply-messsage").html() + '</textarea>'
// 									+		'<input type="hidden" name="securitytoken" value="' + $(data).find("input[type=hidden][name=securitytoken]").val() + '">'
// 									+		'<div class="capcay">'
// 									+			'<script></script>'
// 									+			'<div id="recaptcha"></div>'
// 									+			'<script></script>'
// 									+		'</div>'
// 									+		'<div class="footer-quick">'
// 									+			'<input type="button" class="button medium blue" name="sbutton" value="Post Reply" onClick="Recaptcha.create(\'6Lc7C9gSAAAAAMAoh4_tF_uGHXnvyNJ6tf9j9ndI\', \'recaptcha\', { theme: \'red\', callback: Recaptcha.focus_response_field }); return false;">' 
// 									+			'<input type="button" class="button medium blue cancel" name="sbutton" value="Cancel">'
// 									+		'</div>'
// 									+	'</form>'
// 									+'</div>');
					
// 					var script = "$.getScript( 'http://www.google.com/recaptcha/api/js/recaptcha_ajax.js', function(done) {" +
// 									"console.log('Captcha Loaded');" +
// 									"setTimeout(function() { Recaptcha.create('6Lc7C9gSAAAAAMAoh4_tF_uGHXnvyNJ6tf9j9ndI', 'recaptcha', { theme: 'red', callback: Recaptcha.focus_response_field }); return false; }, 1000); " +
// 								"});";

// 					run_script(script);


// 					$(".q-quick input.cancel").on('click', function() {
// 						$(".q-quick").remove();
// 						$("a.qedit").show();
// 						post_orang.show();
// 						post_orang.css('opacity', 1);
// 					});


// 					post_orang.hide();
// 				}).fail(function() {
// 					alert("gagal mengeksekusi !");
// 					$("a.qquote").show();
// 					post_orang.css('opacity', 1);
// 				});
// 				return false;
// 			});

// 		}
// 	});
// }

// ======================
// Ajax Post Loader
// ------
// Love real time ? Let's do it !
// =====================

if(login) {	


	// $(".thread-control .text-zoom").append('<a href="#" class="refresh-auto">Refresh</a>');
	// $(".refresh-auto").on('click', function() {

	// 	var page = $("link[rel=alternate]").attr("href").split("kaskus.co.id")[1];

	// 	$.ajax({
	// 		url  	 : page
	// 	,	type 	 : 'GET'
	// 	,	dataType : 'html'
	// 	,		
	// 	}).done(function(data) {

	// 		var list_post_real = $('.row[id^="post"]')
	// 		,	list_post_ajax = $(data).find('.row[id^="post"]');


	// 		if(list_post_ajax.length == 20)
	// 		{
	// 			//Do to next thread ...
	// 			console.log("Mentok new thread !");
	// 		}
	// 		else
	// 		{
	// 			if(list_post_ajax.length !== list_post_real.length)
	// 			{
	// 				$("#post-dummy").remove();
	// 				$('.row[id^="post"]').last().after('<div class="row new-sparator" id="post-dummy"><p>New Post</p></div>');	

	// 				setTimeout(function() {
	// 					for(i=list_post_real.length + 1;i <= list_post_ajax.length;i++){
	// 						//console.log('post-' + i, $(list_post_ajax[i - 1]).html());
	// 						$('.row[id^="post"]').last().after('<div class="row" id="' + $(list_post_ajax[i - 1]).attr("id") + '">' + $(list_post_ajax[i - 1]).html() + '</div>');
	// 					}
	// 					static_dom();
	// 					console.log("has new post ! " + (list_post_ajax.length - list_post_real.length));


	// 				}, 800);

	// 				$('html, body').animate({
	// 			        scrollTop: $("#post-dummy").offset().top - 55
	// 			    }, 1000);
					
	// 			}
	// 			else
	// 			{
	// 				console.log("ga ada post baru !");
	// 			}
	// 		}
	// 		return false;
	// 	}).fail(function() {
	// 		alert("Konten gagal dimuat. Kaskus nya kepenuhan atau internet nya lagi jelek kayak kamu, iya kamu !!");
	// 		return false;
	// 	});

	// 	return false;

	// });
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