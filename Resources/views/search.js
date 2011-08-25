///open db
///var db = Ti.Database.install('locations.sqlite', 'locations');

//drop index
var sql = "select * from locations order by name limit 2000";
var mydb = Ti.Database.install('../locations.sqlite', 'locations');
var locationsRS;
locationsRS = mydb.execute(sql);

// close db when you're done to save resources

var locationdata = [];
var section = Titanium.UI.createTableViewSection();
section.headerTitle = "Placenames";

//go through dataset pull out name add to list
if(locationsRS.rowCount !== 0) {
	while(locationsRS.isValidRow()) {
		var rowdetail = {
			className:"placenames",
			title: locationsRS.fieldByName('name') ,
			id:  locationsRS.fieldByName('id'), 
			lat: locationsRS.fieldByName('lat'), 
			lon: locationsRS.fieldByName('lon') 
			};
		var row = Titanium.UI.createTableViewRow(rowdetail);
		locationdata.push(row);	
		locationsRS.next();
	}
	///Ti.API.log(locationdata);
	createPlacenames(locationdata);
	locationsRS.close();
	
}
mydb.close();

var data = [{
	title : 'ferrymead'
}, {
	title : 'ash vegas'
}, {
	title : 'Waiheke Island'
}, {
	title : 'Waharoa'
}, {
	title : 'Waiharara'
}, {
	title : 'Waihi'
}, {
	title : 'Waihi Beach'
}, {
	title : 'Waihola'
}, {
	title : 'Waikanae'
}, {
	title : 'Waikouaiti'
}, {
	title : 'Waima'
}, {
	title : 'Waimangaroa'
}, {
	title : 'Waimate'
}, {
	title : 'Waimate North'
}, {
	title : 'Waimauku'
}, {
	title : 'Wainui'
}, {
	title : 'Wainuiomata'
}, {
	title : 'Waiouru'
}, {
	title : 'Waiotira'
}, {
	title : 'Waipukurau'
}, {
	title : 'Wairakei'
}, {
	title : 'Wairau Valley'
}, {
	title : 'Wairoa'
}, {
	title : 'Waitahuna'
}, {
	title : 'Waikouaiti'
}, {
	title : 'Waikuku'
}, {
	title : 'Waitara'
}, {
	title : 'Waitaria Bay'
}, {
	title : 'Waitati'
}, {
	title : 'Waitoa'
}, {
	title : 'Waitoki'
}, {
	title : 'Waitoriki'
}, {
	title : 'Waitotara'
}, {
	title : 'Waiuku'
}, {
	title : 'Wakefield'
}, {
	title : 'Wallaceto'
}, {
	title : 'Waverley'
}, {
	title : 'Wanaka'
}, {
	title : 'Ward'
}, {
	title : 'Wardville'
}, {
	title : 'Warrington'
}, {
	title : 'Wellington'
}, {
	title : 'Wellsford'
}, {
	title : 'Westport'
}, {
	title : 'Weston'
}, {
	title : 'Whakatane'
}, {
	title : 'Whakamaru'
}, {
	title : 'Whananaki'
}, {
	title : 'Whangamata'
}, {
	title : 'Whangamomona'
}, {
	title : 'Whanganui'
}, {
	title : 'Whangarei'
}, {
	title : 'Whangarei Heads'
}, {
	title : 'Whangaruru'
}, {
	title : 'Whataroa'
}, {
	title : 'Whenuakite'
}, {
	title : 'Whenuakura'
}, {
	title : 'Whiritoa'
}, {
	title : 'Whitford'
}, {
	title : 'Whitby'
}, {
	title : 'Whitianga'
}, {
	title : 'Wimbledon'
}, {
	title : 'Winchester'
}, {
	title : 'Windsor'
}, {
	title : 'Winscombe'
}, {
	title : 'Winton'
}, {
	title : 'Woodend'
}, {
	title : 'Woodhill'
}, {
	title : 'Woodville'
}, {
	title : 'Wyndham'
}];

function createPlacenames(mydata)
{
	
var search = Titanium.UI.createSearchBar();

// create table view
var tableview = Titanium.UI.createTableView({
	data : mydata,
	search : search
});

// add table view to the window
Titanium.UI.currentWindow.add(tableview);
};
