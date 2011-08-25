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
	url: '/views/search.js' 
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
	url:'views/fav.js'
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

//event to move between the active tabs. (mostly for web context)
Ti.App.addEventListener('switch_tabs_click', function(e){
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
	url:'views/settings.js'
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
Ti.App.tabGroup.setActiveTab(2);

// open tab group
Ti.App.tabGroup.open({
	transition : Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
});
