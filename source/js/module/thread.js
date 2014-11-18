module.exports = {
	init: function (storage, login) {
		var _t = this;
			if(login) {
			$('.row[id^="post"]').each(function(a,b) {
				var _p 		= $(this)
				,	author 	= _p.find(".author.vcard .user-details a.nickname").html()
				;
				_t.myPost(_p, author, login);
				_t.meQuote(_p, author, login);
			});
		}
	},

	myPost: function(e, author, me) {
		
		if(author == " " + me + " ") {
			e.addClass("my-post");
		}

	},

	meQuote: function(e, author, me) {
		e.find(".entry > .post-quote").each(function(a,b) {
			var itu = $(this)
			,	author = itu.find("span:last-child b").html();
			if(author == me) {
				e.addClass("my-quote");
				itu.find("> span:last-child").addClass('my-qt');
			}
		});
	}
};