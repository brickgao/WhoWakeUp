var Rate = require('./rate.js')

function RateOP() {
}

module.exports = RateOP;

RateOP.prototype.op = function op(username, callback) {
  var now = new Date();
  var currentrate = new Rate();
  currentrate.get(function(err, ndoc) {
    if(ndoc) {
      var check = {
        day: now.getDate(),
        month: now.getMonth()
      }
      if(ndoc.day === check.day && ndoc.month === check.month) {
        var nrate = ndoc.rate + 1;
        currentrate.update(nrate, function(err) {
          var user = require('./wake.js');
          var nuser = new user();
          nuser.updaterate(username, nrate, function(err) {
          });
        });
        callback(ndoc.rate);
      }
      else {
        ret = 1;
        currentrate.update(nrate, function(err) {
          var user = require('./wake.js');
          var nuser = new user();
          nuser.updaterate(username, 1, function(err) {
          });
        });
        currentrate.erase(function(err) {
        });
        callback(1);
      }
    }
    else {
      ret = 1;
      currentrate.update(nrate, function(err) {
        var user = require('./wake.js');
        var nuser = new user();
        nuser.updaterate(username, 1, function(err) {
        });
      });
      currentrate.save(function(err) {
      });
      callback(1);
    }
  });
  return 0;
}
