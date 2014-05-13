$(document).ready(function(){

	var main_url = "http://www.kaskus.co.id";

	$(".menu-up ul li a").click(function(){
		var $ini = $(this)
		,	luar = $ini.parent();

		if(luar.hasClass("active")) {
			return false;
		}

		$(".menu-up ul li").removeClass("active");
		luar.addClass("active");

		$(".c-tab > div").hide();
		$(".c-tab "+$ini.attr("href")).show();

		return false;
	});

	//Get Subscribed thread
	$.ajax({
		type: "GET",
		url: main_url+'/myforum/subscribe_thread',
		dataType: "html"
	}).done(function(data) {
		var jadi = $(data).find("#threads table tbody tr")
		,	anu	= $("ul.listed li:first-child").html();
		$(jadi).each(function(a,b){
			//console.log(b);
			if($(b).attr("id") !== "_") {
				var judul = $(b).find(".post-title a").html()
				,	url = $(b).find(".post-title a").attr("href")
				,	waktu = $(b).find(".replies time").html()
				,	uname = $(b).find(".replies a.fn").html()
				,	u_profile = $(b).find(".replies a.fn").attr('href')
				,	status = $(b).find(".thread_statusicon").attr("src");
				console.log(judul);
				$("ul.listed li:last-child").after('<li>'+anu+'</li>');
				var ager = $("ul.listed li:last-child");
				ager.find("> a").attr("href",main_url+url).html(judul);
				ager.find(".foo time").html(waktu);
				ager.find(".foo span a").html(uname).attr('href',main_url+u_profile);
				ager.find(".fun a").attr('href',main_url+url+'?goto=newpost');
				ager.find(".status img").attr('src',status);
			}
		});
	});
});