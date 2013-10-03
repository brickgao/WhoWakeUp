var pool = require('./db');

function Rank() {
}

module.exports = Rank;

Rank.prototype.refresh = function get(callback) {
  var now = new Date();
  var rank = {
    trick: 'trick',
    month: now.getMonth(),
    day: now.getDate(),
    rank: 0
  }
  pool.acquire(function(err, db) {
    if (err) {
      return callback(err);
    }
    db.collection('rank', function(err, collection) {
      if (err) {
        pool.release(db);
        return callback(err);
      }
      collection.findOne({trick: 'trick'}, function(err, doc) {
        if (doc) {
          if(doc.month != now.getMonth() || doc.day != now.getDate()) {
            collection.update({
              trick: 'trick'
            }, {
              $set: {
                month: now.getMonth(),
                day: now.getDate(),
                rank: 0
              }
            }, function (err, result) {
              pool.release(db);
              if (err) {
                return callback(err);
              }
              callback(null);
            });
          }
          else {
            pool.release(db);
            callback(err);
          }
        } else {
          collection.ensureIndex('trick', {unqiue: true});
          collection.insert(rank, {safe: true}, function(err) {
            pool.release(db);
            callback(err);
          });
        }
      });
    });
  });
}

Rank.prototype.update = function update(callback) {
  var now = new Date();
  pool.acquire(function(err, db) {
    if(err) {
      return callback(err);
    }
    db.collection('rank', function(err, collection) {
      if(err) {
        pool.release(db);
        return callback(err);
      }
      collection.update({
        trick: 'trick'
      }, {
        $inc: {
          rank: 1
        }
      }, function (err) {
        if (err) {
          pool.release(db);
          return callback(err);
        }
        collection.findOne({trick: 'trick'}, function(err, doc) {
          pool.release(db);
          if (doc) {
            callback(err, doc.rank);
          } else {
            callback(err, null);
          }
        });
      });
    });
  });
}

