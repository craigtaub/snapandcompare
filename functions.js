var config = require('./config'),
    colors = require('colors'),
    gm = require('gm'); //GraphicMagick

var functions = {
    runComparison : function(item, err) {
      //compare Master with diff 
      gm.compare(config.screens+item+".jpg", config.screens+item+".diff.jpg", function (err, isEqual, equality, raw) {
        if (err) throw err;
        if (equality > 0) {
          //images not the same, FAIL.
          console.log("FAILED Diff bp:". red , item);
          console.log("FAILED equality rate:" . red , equality , "%" . red);
          //create .fail
          functions.createFail(item);
        } else {
          //no change, PASS.
          console.log("PASSED Diff bp:" . green , item);
        }
      });
    },
    createFail : function(item) {
        var options = {
          highlightColor: 'yellow',
          file: config.screens+item+'.fail.jpg'
        };
        //will overwrite current .fail if necessary.
        gm.compare(config.screens+item+".jpg", config.screens+item+".diff.jpg", options, function (err) {
          if (err) throw err;
        });
    }
}

module.exports = functions;

