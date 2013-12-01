//node modules
var config = require('./config.test'), //config
    functions = require('./functions'), //functions
    webshot = require('webshot'), //Screen shots
    gm = require('gm'), //GraphicMagick
    fs = require('fs'); //filesystem

//local vars
var breakpoints = config.bps,
    screens = config.screens,
    siteType = config.siteType,
    cookies = config.cookies,
    masterUrl = config.masterUrl,
    diffUrl = config.diffUrl;

//foreach breakpoint
breakpoints.forEach(function(item) { 
    //set bp options
    var options = {
      screenSize: {
        width: item, height: 480
      },
      siteType: siteType,
      cookies: cookies
    };

    fs.exists(screens+item+".jpg", function(exists) {
        if (exists) {
            //master exists
            //create snapshot .diff
            webshot(diffUrl, screens+item+'.diff.jpg', options,  function(err) {
                //screenshot now saved .diff...will overwrite if necessary
                functions.runComparison(item, err, gm, screens);
            });

        } else {
            //master doesnt exist
            //create snapshot master
            webshot(masterUrl, screens+item+'.jpg', options,  function(err) {
               //master screenshot now saved
                console.log("MASTER Stored bp:", item);

            });
        }

    });

 });
 

