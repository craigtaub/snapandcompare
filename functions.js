//Script functions

var functions = {

    runComparison : function(item, err, gm, screens) {
      //compare 
      gm.compare(screens+item+".jpg", screens+item+".diff.jpg", function (err, isEqual, equality, raw) {
        if (err) throw err;

        if (equality > 0) {
          //diff failed
          functions.log("FAILED Diff", item);

          //create .fail
          functions.createDiff(item, gm, screens);

        } else {
          //no change
          functions.log("PASSED Diff", item);
        }
      });
    },

    createDiff : function(item, gm, screens) {
        var options = {
          highlightColor: 'yellow', // optional. Defaults to red
          file: screens+item+'.fail.jpg' // required
        };
        gm.compare(screens+item+".jpg", screens+item+".diff.jpg", options, function (err) {
          if (err) throw err;
        });
    },

    log : function(type, item) {
       console.log(type+' bp-',item);
    }
}

module.exports = functions;

