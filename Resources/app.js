// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#fff');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

//		Search
//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:'Search',
    backgroundColor:'#fff',
    navBarHidden: true,  
});
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Search',
    window:win1
});

//		Favs
//
// create controls tab and root window
//
var win2 = Titanium.UI.createWindow({  
    title:'Favourites',
    backgroundColor:'#fff',
    navBarHidden: true,  
});
var tab2 = Titanium.UI.createTab({  
    title:'Favourites',
    window:win2
});

//		Map
//
// create controls tab and root window
//
var win3 = Titanium.UI.createWindow({
	tabBarHidden: true,
	fullscreen: true,
	navBarHidden: true,  
    backgroundColor:'#fff'
});
var tab3 = Titanium.UI.createTab({ 
    icon:'KS_nav_ui.png',
    title:'Map',
    window:win3
});


var webview = Titanium.UI.createWebView({
	url:'index.html'
})

win3.add(webview)


//		Settings
//
// create controls tab and root window
//
var win4 = Titanium.UI.createWindow({  
    title:'Settings',
    backgroundColor:'#fff',
    navBarHidden: true,  
});
var tab4 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Settings',
    window:win4
});

//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  
tabGroup.addTab(tab3);  
tabGroup.addTab(tab4);  


// open tab group
tabGroup.open();
