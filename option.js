var storage = chrome.storage.local;

//Load last changes
loadLast();

function loadLast () {

	//Syntax
	storage.get("syntax", function (item) {
		if(item.syntax) {
			load_saved('syntax', item.syntax);
		} else {
			storage.set({"syntax": {"tipe" : true}}, sett_save("syntax"));
			loadLast();
		}
	});

	//JSfiddle
	storage.get("jsfiddle", function (item) {
		if(item.jsfiddle) {
			load_saved('jsfiddle', item.jsfiddle);
		} else {
			storage.set({"jsfiddle": {"tipe" : true, "auto" : true}}, sett_save("jsfiddle"));
			loadLast();
		}
	});

	//Codepen
	storage.get("codepen", function (item) {
		if(item.codepen) {
			load_saved('codepen', item.codepen);
		} else {
			storage.set({"codepen": {"tipe" : true, "auto" : true}}, sett_save("codepen"));
			loadLast();
		}
	});

	//JSbin
	storage.get("jsbin", function (item) {
		if(item.jsbin) {
			load_saved('jsbin', item.jsbin);
		} else {
			storage.set({"jsbin": {"tipe" : true, "auto" : true}}, sett_save("jsbin"));
			loadLast();
		}
	});

	//Quick edit
	storage.get("quickedit", function (item) {
		if(item.quickedit) {
			load_saved('quickedit', item.quickedit);
		} else {
			storage.set({"quickedit": {"tipe" : false}}, sett_save("quickedit"));
			loadLast();
		}
	});
}

function sett_save (isi) {
	console.log("saved item", isi);
}

function load_saved(item, data)
{
	var elem = $('.kaskus-utils .option[data-tipe=' + item + ']');

	if(data.tipe == true) {
		elem.find('> label > input').attr('checked','checked');	
		elem.find(".extra").stop().show();
	} else {
		elem.find('> label > input').removeAttr('checked');
		elem.find(".extra").stop().hide();
	}

	elem.find(".extra input[type=radio]").removeAttr('checked');
	if(data.auto == true) {
		elem.find(".extra input[type=radio][value=0]").prop( "checked", true );

	} else {
		elem.find(".extra input[type=radio][value=1]").prop( "checked", true );
	}
}

function saved_turn (item, data) {
	storage.get(item, function (hasil) {
		hasil[item].tipe = data;
		storage.set(hasil, function() {
			console.log(item + ' has ben changed to', data);
		});
	});
}

function saved_option (item, data) {
	storage.get(item, function (hasil) {
		hasil[item].auto = data;
		storage.set(hasil, function() {
			console.log(item + ' auto type has ben changed to', data);
		});
	});
}

//Primary changed
$(".kaskus-utils input[type=checkbox]").change(function() {
	var luar = $(this).parent().parent()
	,	tipe = luar.data('tipe');
	console.log("changed !");

	if($(this).prop('checked'))
	{
		saved_turn(tipe, true);
		luar.find(".extra").stop().show();
	}
	else
	{
		saved_turn(tipe, false);
		luar.find(".extra").stop().hide();
	}
});

//Secondary changed
$(".kaskus-utils .option .extra input[type=radio]").change(function() {
	var luar = $(this).parent().parent().parent()
	,	tipe = luar.data('tipe');

	if(this.value == 0) {
		auto = true;
	} else {
		auto = false;
	}

	saved_option(tipe, auto);
})

$(".kaskus-utils #set-def").on('click', function() {
	storage.clear();
	loadLast();
})