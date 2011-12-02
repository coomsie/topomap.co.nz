var test = require('com.test');

var tilesdb = Ti.Database.install('0000000000000001.db', 'tiles');
var masterdb = Ti.Database.install('Databases.db', 'databases');

test.copy(0);

// var result = test.getResult();
// Ti.API.info('COPYING FILE IS =>' + result);
// Ti.API.info('PATh FILE IS =>' + test.getPath());
// Ti.API.info('PATh FILE IS =>' + test.getorigPath());

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#fff');

// create tab group
Ti.App.tabGroup = Titanium.UI.createTabGroup();

//		Search
//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({
	title : 'Search',
	backgroundColor : '#fff',
	navBarHidden : true,
	url : '/views/search.js'
});
var tab1 = Titanium.UI.createTab({
	icon : 'magnifier_24.png',
	title : 'Search',
	window : win1
});

//		Favs
//
// create controls tab and root window
//
var win2 = Titanium.UI.createWindow({
	title : 'Favourites',
	backgroundColor : '#fff',
	navBarHidden : true,
	url : 'views/fav.js'
});
var tab2 = Titanium.UI.createTab({
	title : 'Favourites',
	icon : 'heart_24.png',
	window : win2
});

//		Map
//
// create controls tab and root window
//
var win3 = Titanium.UI.createWindow({
	tabBarHidden : true,
	fullscreen : true,
	navBarHidden : true,
	backgroundColor : '#fff'
});
var tab3 = Titanium.UI.createTab({
	icon : 'globe_24.png',
	title : 'Map',
	window : win3
});

var webview = Titanium.UI.createWebView({
	url : 'index.html',
})

win3.add(webview)
Ti.App.addEventListener('switch_tabs_click', function(e) {
	Ti.API.info('switch_tabs_click');
	Ti.App.tabGroup.setActiveTab(e.tab);
	Ti.App.tabGroup.open({
		transition : Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
	});
});
//		Settings
//
// create controls tab and root window
//
var win4 = Titanium.UI.createWindow({
	title : 'Settings',
	backgroundColor : '#fff',
	navBarHidden : true,
	url : 'views/settings.js'
});
var tab4 = Titanium.UI.createTab({
	icon : 'gear_24.png',
	title : 'Settings',
	window : win4
});

//
//  add tabs
//
Ti.App.tabGroup.addTab(tab1);
Ti.App.tabGroup.addTab(tab2);
Ti.App.tabGroup.addTab(tab3);
Ti.App.tabGroup.addTab(tab4);

// open tab group
Ti.App.tabGroup.setActiveTab(0);

// open tab group
Ti.App.tabGroup.open({
	transition : Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
});

function Utils() {

	//*** 'me' acts as an alias that can be used within the methods
	var me = this;

	this.readFiles = function readFiles(myfilename, myobj, fn_callback, dir, dirtype) {
		try {
			Titanium.API.info('starting reading files');
			//var appDir = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'LookupData');
			if(dirtype === 'app')
				var appDir = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, dir);
			if(dirtype === 'res')
				var appDir = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, dir);
			appDir.createDirectory();
			Titanium.API.info(appDir.nativePath);
			var f = Titanium.Filesystem.getFile(appDir.nativePath, myfilename);
			Titanium.API.info(f.nativePath);
			this.myobj = JSON.parse(f.read().text);
			Titanium.API.info('file read');
			fn_callback(this.myobj);
			return this.myobj;
		} catch(e) {
			Titanium.API.info('reading file lookups error' + e.error);
			fn_callback(this.myobj);
		}
	};
	this.readXMLFiles = function readXMLFiles(myfilename, myobj, fn_callback, dir, dirtype) {
		try {
			Titanium.API.info('starting reading files');
			//var appDir = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'LookupData');
			if(dirtype === 'app')
				var appDir = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, dir);
			if(dirtype === 'res')
				var appDir = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, dir);
			appDir.createDirectory();
			Titanium.API.info(appDir.nativePath);
			var f = Titanium.Filesystem.getFile(appDir.nativePath, myfilename);
			Titanium.API.info(f.nativePath);
			this.myobj = Ti.XML.parseString(f.read().text);
			Titanium.API.info('file read');
			fn_callback(this.myobj);
			return this.myobj;
		} catch(e) {
			Titanium.API.info('reading file xml error' + e.error);
			fn_callback(this.myobj);
		}
	};
	Utils.prototype.readXMLFiles = function readXMLFiles(myfilename, myobj, fn_callback,dir, dirtype) {
		this.readXMLFiles(myfilename, myobj, fn_callback, dir, dirtype);
	};
	Utils.prototype.readSQL = function readSQL(myfilename, myobj, fn_callback) {
		this.readFiles(myfilename, myobj, fn_callback, 'sqlload', 'res');
	};
};

Ti.App.Utils = new Utils();

Ti.App.addEventListener('getsql', function(e) {
	var myobj;
	Ti.App.Utils.readSQL('data.txt', myobj, fn_callbackwithsql);
});
function fn_callbackwithsql(sqltoload) {
	Ti.App.fireEvent('fn_callback_loadsql', {
		data : sqltoload
	});
};

function readPlatforms() {
	var myobj;
	Ti.App.Utils.readXMLFiles('platforms.xml',myobj,fn_callbackwithXML,'mydata','res');
};

function fn_callbackwithXML(xml)
{
	var platforms = xml.documentElement.getElementsByTagName("Platform");
	var data = [];
	var _platformTag,_name,_roadName,_platformNo,_bearingToRoad,_lat,_long;

	for(var i = 0; i < platforms.length; i++) {
	//get platform element at pos i
    var platform = platforms.item(i);
    //get all positions
    var positions = platform.childNodes;
   //var position = positions.item(0); //expect only one position
   if(platform.childNodes.length !=1) Ti.API.info('not one lenght');
    //load em
    _platformTag = platform.getAttribute('PlatformTag');
	_name = platform.getAttribute('Name');
	_roadName= platform.getAttribute('RoadName');
	_platformNo = platform.getAttribute('PlatformNo');
	_bearingToRoad = platform.getAttribute('BearingToRoad');
	_lat = positions.item(0).getAttribute('Lat');
	_long = positions.item(0).getAttribute('Long');

		// Add to array
		data.push({
			"PlatformTag" : _platformTag,
			"Name" : _name,
			"RoadName" : _roadName,
			"PlatformNo" : _platformNo,
		 	"BearingToRoad" : _bearingToRoad,
		 	"Lat" : _lat,
		 	"Long" : _long
		});
	}//end of for
	Ti.API.log(data[1]);	
};

//readPlatforms();
