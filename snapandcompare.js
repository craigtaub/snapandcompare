//node modules
var config = require('./config'), //config
    functions = require('./functions'), //functions
    webshot = require('webshot'), //Screen shots
    gm = require('gm'), //GraphicMagick
    fs = require('fs'); //filesystem

//foreach breakpoint
config.breakpoints.forEach(function(item) {
    //set bp options
    var options = {
      screenSize: {
        width: item, height: 1080
      },
      siteType: config.siteType,
      cookies: config.cookies
    };
    fs.exists(config.screens+item+".jpg", function(exists) {
        if (exists) {
            //master exists. Create snapshot .diff
            webshot(config.diffUrl, config.screens+item+'.diff.jpg', options,  function(err) {
                //screenshot now saved .diff...will overwrite if necessary
                functions.runComparison(item, err, gm, config.screens);
            });
        } else {
            //master doesnt exist. Create snapshot master
            webshot(config.masterUrl, config.screens+item+'.jpg', options,  function(err) {
               //master screenshot now saved
                console.log("MASTER Stored bp:", item);
            });
        }
    });
 });
 

