var pool = require('./db');

function Search(username) {
}

module.exports = Search;

Search.prototype.get = function get(username, callback) {
  pool.acquire(function(err, db) {
    if(err) {
      return callback(err);
    }
    db.collection('users', function(err, collection) {
      if(err) {
        pool.release(db);
        return callback(err);
      }
      var cnt = -1;
      collection.count(function(err, count) {
        cnt = count;
      });
      collection.findOne({name: username}, function(err, doc) {
        pool.release(db);
        if(doc) {
          collection.count(function(err, count) {
            doc.num = cnt;
            callback(err, doc);
          })
        } else {
          callback(err, null);
        }
      });
    });
  });
}


