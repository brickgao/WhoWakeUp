var Rate = require('./rate.js')

function RateOP() {
}

module.exports = RateOP;

RateOP.prototype.op = function op(callback) {
  var now = new Date();
  var date_s = now.getMonth().toString + '-' + now.getDate().toString;
  var currentrate = new Rate();
  currentrate.get(function(err, ndoc) {
    if(ndoc) {
      if(ndoc.trick.date === date_s) {
        callback(user.trick.rate);
        var nrate = user.trick.rate + 1;
        return currentrate.update(nrate, function(err) {
        });
      }
      return currentrate.erase(function(err) {
          callback(1);
      });
    }
    return currentrate.save(function(err) {
        callback(1);
    });
  });
}
