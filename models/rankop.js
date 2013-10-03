var Rank = require('./rank.js')

function RankOP() {
}

module.exports = RankOP;

RankOP.prototype.op = function op(username, callback) {
  var now = new Date();
  var currentrank = new Rank();
  currentrank.refresh(function(err) {
    return currentrank.update(function(err, nrank) {
      var user = require('./wake.js');
      var nuser = new user();
      nuser.updaterank(username, nrank, function(err) {
        callback(nrank);
      });
    });
  });
}
