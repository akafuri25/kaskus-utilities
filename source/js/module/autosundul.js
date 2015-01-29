module.exports = {
	init: function (storage, login) {
		var _t = this;

		if($(".listing-table.mypost").html())
		{
			$.ajax({
				url: 'http://www.google.com/recaptcha/api/js/recaptcha_ajax.js',
				dataType: "script",
				cache: true,
				success: function() { 
					console.log('Captcha Loaded'); 
					_t.loadSundul();
				}
			});
		}

	},

	loadSundul: function() {
		var _t = this;

		$(".listing-table.mypost tbody tr").each(function(i, d) {
			var t 		= $(this)
			,	post_id = t.attr('id').split('thread_')[1];


			var capcay = "setTimeout(function() { " +
				"Recaptcha.create('6Lc7C9gSAAAAAMAoh4_tF_uGHXnvyNJ6tf9j9ndI', 'capcay', { " +
				"theme: 'clean', callback: Recaptcha.focus_response_field" +
				"});" +
			"}, 800);";

			t.find('.post-title').append('<a href="javascript:void(0)" onClick="' +capcay+ '" class="sundul-btn" data-postid="' +post_id+ '"><img src="http://cdn.kaskus.com/images/smilies/sundulgans.gif"/></a>');
		});
		
		$(".post-title > a.sundul-btn").on('click', function() {
			_t.modal("");
			$.ajax({
				url			: '/post_reply/' +$(this).data('postid')
			,	type 		: 'GET'
			,	dataType	: 'html'
			}).done(function(data) {
				if(!$(data).find('form[name=postreply]').html()) {
					alert("Ada yang error :(");
				}

				$(".sundul-modal").addClass('loaded');
				$(".sundul-modal input[type=submit]")
				.addClass('blue')
				.removeClass('white')
				.val('Sundul gan !');

			}).fail(function() {
				alert("Ada yang error :(");
			});


		});
	},

	modal: function(data)
	{
		if(!$("#modal-ku").html()) {
			$('body').append('<div id="modal-ku"></div><div id="backdrop-haeman"></div>');
		}
		$("#modal-ku").html('<div class="sundul-modal"><h1 class="title">Sundul Posting</h1> <div id="capcay"></div> <input type="submit" class="button medium white" value="Loading ..."></div>');

		$("#backdrop-haeman").on('click', function() {
			$("#backdrop-haeman, #modal-ku").fadeOut(300, function() {
				$("#backdrop-haeman").off();
				$(this).remove();
			});
		});
	}
}