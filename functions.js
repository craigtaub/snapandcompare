var functions = {
    runComparison : function(item, err, gm, screens) {
      //compare 
      gm.compare(screens+item+".jpg", screens+item+".diff.jpg", function (err, isEqual, equality, raw) {
        if (err) throw err;

        if (equality > 0) {
          //images not the same
          
          console.log("FAILED Diff bp:", item);
          console.log("FAILED equality rate:", equality, "%");

          //create .fail
          functions.createFail(item, gm, screens);

        } else {
          //no change
          console.log("PASSED Diff bp:", item);
        }
      });
    },
    createFail : function(item, gm, screens) {
        var options = {
          highlightColor: 'yellow', // optional. Defaults to red
          file: screens+item+'.fail.jpg' // required
        };
        gm.compare(screens+item+".jpg", screens+item+".diff.jpg", options, function (err) {
          if (err) throw err;
        });
    }
}

module.exports = functions;

