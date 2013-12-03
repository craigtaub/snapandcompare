//node modules
var config = require('./config.iplayer'),
    functions = require('./functions'),
    webshot = require('webshot'),
    gm = require('gm'), //GraphicMagick
    fs = require('fs'); //filesystem

if(config.watchFile) {
    console.log('Watching ',config.watchFile);
    fs.watch(config.watchFile, function() {
        console.log('Change detected, run app.');
        //Bind to changes in watchFile
        runApplication();
    });
} else {
    runApplication();
}
 
function runApplication() {
    //foreach breakpoint
    config.breakpoints.forEach(function(item) {
        //set breakpoint options
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
                    //screenshot now saved .diff...will overwrite if necessary.
                    functions.runComparison(item, err, gm, config.screens);
                });
            } else {
                //master doesnt exist. Create snapshot master.
                webshot(config.masterUrl, config.screens+item+'.jpg', options,  function(err) {
                   //master screenshot now stored.
                    console.log("MASTER Stored bp:", item);
                });
            }
        });
    });
}
