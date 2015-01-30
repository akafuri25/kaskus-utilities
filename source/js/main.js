require("./module/plugin");

var storage = chrome.storage.local;

var $menuatas = $(".meta-header-bar.mobile-hide ul")
,	$menukiri = $(".meta-header-bar.log-bar > ul")
,	login = $("#menu-right #after-login #dlabel-accordion").html()

if(login) {
	login = login.split(", ")[1].split(" ")[0];
} else {
	login = null;
}

console.log(login);

//$("body").addClass("clean-theme");
$("body").addClass("blues-theme");
$(".user-avatar img.photo").removeAttr("height").removeAttr("width");


//require('./module/widget').init(storage);
require('./module/thread').init(storage, login);
//require('./module/autosundul').init(storage, login);

