var win = Titanium.UI.currentWindow;

// methods for creating custom rows:
function addControlRow(label,property,initialValue)
{
    if(initialValue == null) { initialValue = false; }

	var row = Ti.UI.createTableViewRow({height:50});
    row.backgroundColor = '#fff';

    // add a label to the left
    // should be bold
    var cellLabel = Ti.UI.createLabel({
        text:label,
        font:{fontSize:16,fontWeight:'bold'},
        left:10
    });
    row.add(cellLabel);

    // enable the property to be omitted
    // TODO: use a type variable to create different styles of controls?
    if(property != null){
        // add a switch to the right
        var sw = Ti.UI.createSwitch({
            right:10,
            value:Ti.App.Properties.getBool(property,initialValue)
        });

        // add a callback function to set application
        // properties when the value is changed
        sw.addEventListener('change', function(e)
        {
            // update the property with the state of the switch
            Ti.App.Properties.setBool(property,e.value);

            Ti.API.info('Property changed: '+property+', '+e.value);
        });

        row.add(sw);

	}

	row.className = 'control';
	return row;
}


function addExportRow(label,property,valuesList,initialValue)
{
    if(initialValue == null) { initialValue = false; }

	var row = Ti.UI.createTableViewRow({height:50});
    row.backgroundColor = '#fff';

    // add a label to the left
    // should be bold
    var cellLabel = Ti.UI.createLabel({
        text:label,
        font:{fontSize:16,fontWeight:'bold'},
        left:10
    });
    row.add(cellLabel);

    // enable the property to be omitted
    // TODO: use a type variable to create different styles of controls?
    if(property != null){
        row.hasChild = true;
        row.value = Ti.App.Properties.getString(property,initialValue);

        var cellValue = Ti.UI.createLabel({
            text:valuesList[row.value],
            font:{fontSize:14},
            textAlign:'right',
            right:20
        });
        row.add(cellValue);

        // add an event listener to this row
        row.addEventListener('click',function(e){
            // push a table view with these valuesList
           Ti.API.info('In the export table row click event');

            var exportWin = Ti.UI.createWindow({
                title:'Export Format',
                backgroundColor: '#ccc',
                barColor:orangeColor
            });

            var thisTable = Ti.UI.createTableView();
            thisTable.style = Ti.UI.iPhone.TableViewStyle.GROUPED;
            thisTable.backgroundColor = '#ccc';
            var data = [];
            for(var i in valuesList) {
                if(valuesList.hasOwnProperty(i)){
                    var thisRow = Ti.UI.createTableViewRow({backgroundColor:'#fff'});
                    thisRow.title = valuesList[i];
                    thisRow.value = i;

                    // check the currently selected export format
                    if(row.value == thisRow.value) { thisRow.hasCheck = true; }
                    data.push(thisRow);
                }
            }
            thisTable.setData(data);

            thisTable.addEventListener('click',function(r){
                Ti.API.info('In the export format window click event');
                var rowValue = r.rowData.value;

                // trying to get the parentTable to update.
                cellValue.text = r.rowData.title;
                row.value = rowValue;

                Ti.App.Properties.setString(property,rowValue);
                Ti.API.info('Set the property: '+property +' to: '+rowValue);

                // deselect all rows in the table
                var index = r.index;
                var section = r.section;

                setTimeout(function()
                {
                    // reset checks
                    for (var i=0;i<section.rows.length;i++) {
                        section.rows[i].hasCheck = false;
                    }
                    // set current check
                    section.rows[index].hasCheck = true;
                },250);
            });

            exportWin.add(thisTable);
            Ti.API.info('Added export table to export window');

            Titanium.UI.currentTab.open(exportWin,{animated:true});
            Ti.API.info('Export format window whould have opened');
        });

	}

	row.className = 'export';
	return row;
}

function addAboutRow(label,value)
{
    if(label == null) { label = 'About'; }
        
	var row = Ti.UI.createTableViewRow({height:50});
    row.backgroundColor = '#fff';
    row.hasChild = true;
    row.header = '';

    // add a label to the left
    // should be bold
    var cellLabel = Ti.UI.createLabel({
        text:label,
        font:{fontSize:16,fontWeight:'bold'},
        left:10
    });
    row.add(cellLabel);

    // add a child view
    row.addEventListener('click',function(e){
        Ti.API.info('In the about row click event');

        // push a new window
        var aboutWin = Ti.UI.createWindow({
            title:label,
            backgroundColor:'#ccc',
           // barColor:orangeColor
        });
        Ti.API.info('Created about window');

        var aboutField = Ti.UI.createTextArea({
            value:value,
            //width:300,
            //height:300,
            //top:10,
            //borderWidth:1,
            //borderColor:'#999',
            //borderRadius:10,
            editable:false,
            touchEnabled:false,
            font:{fontSize:15}
        });
        Ti.API.info('Created about field');
        //Ti.API.info('Added about string to about field: '+value);

        aboutWin.add(aboutField);
        //aboutWin.open();//{modal:true});
        Titanium.UI.currentTab.open(aboutWin,{animated:true});
    
        Ti.API.info('Should have opened the about window');
    });

	row.className = 'aboutrow';
	return row;
}

function addInfoRow(label,property)
{
	var row = Ti.UI.createTableViewRow({height:50});
    row.backgroundColor = '#fff';

    // add a label to the left
    // should be bold
    var cellLabel = Ti.UI.createLabel({
        text:label,
        font:{fontSize:16,fontWeight:'bold'},
        left:10
    });
    row.add(cellLabel);

    // enable the property to be omitted
    // TODO: use a type variable to create different styles of controls?
    if(property != null){
        row.hasChild = false;
        row.value = property.toString(); 

        var cellValue = Ti.UI.createLabel({
            text:row.value,
            font:{fontSize:14},
            textAlign:'right',
            right:20
        });
        row.add(cellValue);
    }

  	row.className = 'info';
	return row;

}


// add export db file row

function addExportDbRow(label)
{
	var row = Ti.UI.createTableViewRow({height:50});
    row.backgroundColor = '#fff';
    row.hasChild = true;
    //row.header = '';

        // add a label to the left
    // should be bold
    var cellLabel = Ti.UI.createLabel({
        text:label,
        font:{fontSize:16,fontWeight:'bold'},
        left:10
    });
    row.add(cellLabel);

    // get the db and list the size...this could be a memory killer
    // hack to clean up the busted path
    var dbPath = Ti.Filesystem.applicationDirectory;
    dbPath = dbPath.substring(0,dbPath.length - 'Applications'.length);
    dbPath += 'Library/Application Support/database/log.db.sql';

    // iPhone only path. Is this a fragile path, too?
    var f = Ti.Filesystem.getFile(dbPath);
    Ti.API.info('db file exists: '+ ((f.exists) ? 'yes' : 'no') +' path: '+dbPath);

    var cellValue = Ti.UI.createLabel({
        text:(f.read.size/1024) + ' kB',
        font:{fontSize:14},
        textAlign:'right',
        right:20
    });
    row.add(cellValue);


    // add a child view
    row.addEventListener('click',function(e){

        Ti.API.info('In the about row click event');

        var emailDialog = Titanium.UI.createEmailDialog();
        emailDialog.barColor = orangeColor;

        emailDialog.subject = "Mobile Logger Database";
        //emailDialog.toRecipients = ['foo@yahoo.com'];
        emailDialog.messageBody = 'Attached is the sqlite database file from Mobile Logger.';
        // Compress the newly created temp file
        var zipFilePath = Ti.Compression.compressFile(f.path);
        Ti.API.info('zip file path: '+zipFilePath);

        if(zipFilePath) { // it was successful, attach this
            emailDialog.addAttachment(Ti.Filesystem.getFile(zipFilePath));
        }
        else {
            emailDialog.addAttachment(f);
        }
        emailDialog.open();
    });
    row.className = 'exportdb';
    return row;
}


// set up the settings table rows:
var inputData = [];

var networkRow = addControlRow('Upload While Logging','uploadEnabled',true);
//networkRow.header = 'Network';
networkRow.footer = 'Send data to the Mobile Logger server';
inputData.push(networkRow);
//inputData.push(addControlRow('Server'));
//inputData.push(addControlRow('Database'));

var resumeRow = addControlRow('Auto-Resume Logging','autoResume',false);
//resumeRow.header = 'Configuration';
resumeRow.header = '';
inputData.push(resumeRow);
inputData.push(addControlRow('Metric Units','useMetric'));
inputData.push(addControlRow('Monitor Sound Levels','monitorSound',true));

// should this actually modify the stored data in the db,
// or control whether or not the user ID field is included
// in uploaded or exported data?
var anonRow = addControlRow('Anonymous Export','omitDeviceID',false);
anonRow.header = '';
inputData.push(anonRow);

// trying to get the export to work
var exportRow = addExportRow('Export Format','exportFormat',{csv:'CSV',json:'JSON',gc:'Golden Cheetah',gpx:'GPX'},'csv');
inputData.push(exportRow);
inputData.push(addExportDbRow('Export DB'));

// Set up an about message
var aboutString = 
"NZ Topo Map is an interactive topographic map of New Zealand using the official LINZ's 1:50,000 / Topo50 and 1:250,000 / Topo250 maps." + 
"Being a frequent user of the free GeoTIFF map images LINZ makes available I found it frustrating researching locations that cross map boundaries and handling the large image files which would often grind my PC to a stand-still. This online topographic map stitches all the LINZ maps together into one giant map that can be browsed without interruption. The solution was originally put together for personal use but I felt others were likely to find it useful as well, so it's been released into the wild for anyone to use. I hope you find this service useful too.";

inputData.push(addAboutRow('About Toponz.co.nz',aboutString));

// add a version row:
var versionRow = addInfoRow("Application Version",Ti.App.version);
//versionRow.header = '';
inputData.push(versionRow);


// create the settings table view:
var tableView = Titanium.UI.createTableView({ 
	data:inputData, 
	style:Titanium.UI.iPhone.TableViewStyle.GROUPED, 
    backgroundColor: '#ccc'
}); 
win.add(tableView);
