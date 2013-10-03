var Rank = require('./rank.js')

function RankOP() {
}

module.exports = RankOP;

RankOP.prototype.op = function op(username, callback) {
  var now = new Date();
  var currentrank = new Rank();
  currentrank.get(function(err, ndoc) {
    if(ndoc) {
      var check = {
        day: now.getDate(),
        month: now.getMonth()
      }
      if(ndoc.day === check.day && ndoc.month === check.month) {
        return currentrank.update(function(err, nrank) {
          var user = require('./wake.js');
          var nuser = new user();
          nuser.updaterank(username, nrank, function(err) {
            callback(nrank);
          });
        });
      }
      else {
        ret = 1;
        return currentrank.erase(function(err) {
          var user = require('./wake.js');
          var nuser = new user();
          nuser.updaterank(username, 1, function(err) {
            currentrank.erase(function(err) {
              callback(1);
            });
          });
        });
      }
    }
    else {
      ret = 1;
      return currentrank.save(function(err) {
        var user = require('./wake.js');
        var nuser = new user();
        nuser.updaterank(username, 1, function(err) {
          currentrank.save(function(err) {
            callback(1);
          });
        });
      });
    }
  });
}
