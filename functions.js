var functions = {
    runComparison : function(item, err, gm, screens) {
      //compare Master with diff 
      gm.compare(screens+item+".jpg", screens+item+".diff.jpg", function (err, isEqual, equality, raw) {
        if (err) throw err;
        if (equality > 0) {
          //images not the same, FAIL.
          console.log("FAILED Diff bp:", item);
          console.log("FAILED equality rate:", equality, "%");
          //create .fail
          functions.createFail(item, gm, screens);
        } else {
          //no change, PASS.
          console.log("PASSED Diff bp:", item);
        }
      });
    },
    createFail : function(item, gm, screens) {
        var options = {
          highlightColor: 'yellow',
          file: screens+item+'.fail.jpg'
        };
        //will overwrite current .fail if necessary.
        gm.compare(screens+item+".jpg", screens+item+".diff.jpg", options, function (err) {
          if (err) throw err;
        });
    }
}

module.exports = functions;

