
var search = Titanium.UI.createSearchBar();

var data = [
{title:'ferrymead'},
{title:'ash vegas'},
{title:'Waiheke Island'},
{title:'Waharoa'}
];
// create table view
var tableview = Titanium.UI.createTableView({
	data: data,
	search:search
});

// add table view to the window
Titanium.UI.currentWindow.add(tableview);