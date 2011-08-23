
var search = Titanium.UI.createSearchBar();

var data = [
{title:'ferrymead'},
{title:'ash vegas'},
{title:'Waiheke Island'},
{title:'Waharoa'},
{title:'Waiharara'},
{title:'Waihi'}
,{title:'Waihi Beach'},{title:'Waihola'},
{title:'Waikanae'},{title:'Waikouaiti'},{title:'Waima'},
{title:'Waimangaroa'},{title:'Waimate'},{title:'Waimate North'},{title:'Waimauku'},
{title:'Wainui'},{title:'Wainuiomata'},{title:'Waiouru'},{title:'Waiotira'},{title:'Waipukurau'},
{title:'Wairakei'},{title:'Wairau Valley'},{title:'Wairoa'},{title:'Waitahuna'},{title:'Waikouaiti'},
{title:'Waikuku'},{title:'Waitara'},{title:'Waitaria Bay'},{title:'Waitati'},{title:'Waitoa'},
{title:'Waitoki'},{title:'Waitoriki'},{title:'Waitotara'},{title:'Waiuku'},{title:'Wakefield'},
{title:'Wallaceto'},{title:'Waverley'},{title:'Wanaka'},{title:'Ward'},{title:'Wardville'},
{title:'Warrington'},{title:'Wellington'},{title:'Wellsford'},{title:'Westport'},{title:'Weston'},{title:'Whakatane'},{title:'Whakamaru'},{title:'Whananaki'},{title:'Whangamata'},{title:'Whangamomona'},{title:'Whanganui'},{title:'Whangarei'},{title:'Whangarei Heads'},{title:'Whangaruru'},{title:'Whataroa'},{title:'Whenuakite'},{title:'Whenuakura'},{title:'Whiritoa'},{title:'Whitford'},{title:'Whitby'},{title:'Whitianga'},{title:'Wimbledon'},{title:'Winchester'},{title:'Windsor'},{title:'Winscombe'},{title:'Winton'},{title:'Woodend'},{title:'Woodhill'},{title:'Woodville'},{title:'Wyndham'}
];
// create table view
var tableview = Titanium.UI.createTableView({
	data: data,
	search:search
});

// add table view to the window
Titanium.UI.currentWindow.add(tableview);