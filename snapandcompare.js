
var masterUrl = "https://www.google.co.uk";
var diffUrl = "https://www.google.es";

var webshot = require('webshot'); //Screens
var gm = require('gm'); //GraphicMagick
var fs = require('fs'); //filesystem

//the bps
items = [400, 600, 1000, 1300];

//for each bp
items.forEach(function(item) { 

    //if exists
    fs.exists("screenshots/g-"+item+".jpg", function(exists) {
        if (exists) {
            //exists

            //create snapshot .diff
            var options = {
              screenSize: {
                width: item, height: 480
              }
            }
            webshot(masterUrl, 'screenshots/g-'+item+'.diff.jpg', options,  function(err) {
                //screenshot now saved .diff...will overwrite

                //compare 
                var options = {
                  highlightColor: 'yellow', // optional. Defaults to red
                  file: 'screenshots/g-'+item+'.fail.jpg' // required
                };
                gm.compare("screenshots/g-"+item+".jpg", "screenshots/g-"+item+".diff.jpg", function (err, isEqual, equality, raw) {
                  if (err) throw err;

                  if (equality > 0) {
                    //diff failed
                    console.log('FAILED Diff G-', item);

                    //create .fail
                    gm.compare("screenshots/g-"+item+".jpg", "screenshots/g-"+item+".diff.jpg", options, function (err) {
                      if (err) throw err;
                    });

                  } else {
                    //no change
                    console.log('PASSED Diff G-', item);
                  }
                });

            });

        } else {
            //doesnt exist

            //create snapshot master
            var options = {
              screenSize: {
                width: item, height: 768
              }
            }
            webshot(diffUrl, 'screenshots/g-'+item+'.jpg', options,  function(err) {
               // screenshot now saved
                console.log('Master stored: G',item);
            });
        }

    });

 });