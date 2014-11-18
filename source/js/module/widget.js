module.exports = {

	init: function(storage) {
		var _t = this;
		_t.codepen(storage);
		_t.jsfiddle(storage);
		_t.jsbin(storage);
		_t.prettyprint(storage);

		/* When open manual */
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

	},

	prettyprint: function(s) {

		s.get('syntax', function(o) {
			if(o.syntax.tipe) {
				$("pre").addClass("prettyprint linenums").css({'background-color':'#fff','border':'none'});
				var pretty_css = 'pre ol.linenums {list-style-type: decimal;margin-left: 30px;} pre ol.linenums li {list-style-type: decimal;}';
				$("body").append('<script async src="https://google-code-prettify.googlecode.com/svn/loader/run_prettify.js"></script><style>'+pretty_css+'</style>'
							   + '<link rel="stylesheet" type="text/css" href="http://jmblog.github.io/color-themes-for-google-code-prettify/css/themes/github.css">');
			}
		})

	},

	codepen: function(s) {

		$("a[href^='http://codepen.io/'][href*='/pen/']")
		.each(function(i, d) {
			var _t   = $(this)
			,	data = _t.attr('href').split('/');

			s.get('codepen', function(o) {
				if(o.codepen.tipe) {
					if(o.codepen.auto == false) {
						_t.after("<a href='javascript://' class='open-manual embed-open' data-tipe='codepen' data-t1='"+data[5]+"' data-t2='"+data[3]+"'>View Codepen</a>")
					} else {
						_t.after('<p data-height="545" data-theme-id="0" data-slug-hash="'+data[5]+'" data-user="'+data[3]+'" data-default-tab="result" class="codepen"><script async src="//codepen.io/assets/embed/ei.js"></script>');
					}
				}
			});
		});

	},

	jsfiddle: function(s) {

		$("a[href^='http://jsfiddle.net/']")
		.each(function(i, d) {
			var _t   = $(this)
			,	href = _t.attr('href')
			,	reg  = /\bjsfiddle\.net\/user\/([^&\b\?]+)/i;

			if(!ini_href.match(reg)) {

				if(!(href.toLowerCase().indexOf("embedded") >= 0)) {
					href.replace(/\/$/, '');
				}
				var url = href.replace('jsfiddle', 'fiddle.jshell');

				s.get('jsfiddle', function(o) {
					if(o.jsfiddle.tipe) {
						if(o.jsfiddle.auto == false) {
							_t.after("<a href='javascript://' class='open-manual embed-open' data-tipe='jsfiddle' data-url='" + href + "'>View Jsfiddle</a>")
						} else {
							_t.after('<iframe width="100%" height="300" src="' + url + '/embedded" frameborder="0"></iframe>');
						}
					}
				});
			}
		});

	},

	jsbin: function(s) {

		$("a[href^='http://jsbin.com/'][href*='/embed']")
		.each(function(i, d) {
			var _t   = $(this)
			,	href = _t.attr('href');

			s.get('jsbin', function(o) {
				if(o.jsbin.tipe) {
					if(o.jsbin.auto == false) {
						_t.after("<a href='javascript://' class='open-manual embed-open' data-tipe='jsbin' data-url='" + href + "'>View JSbin</a>");
					} else {
						_t.after('<a class="jsbin-embed" href="' + href + '">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>');
					}
				}
			});
		});

	}

};
