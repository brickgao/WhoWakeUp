var pool = require('./db');

function Rank() {
}

module.exports = Rank;

Rank.prototype.save = function save(callback) {
  var now = new Date();
  var rank = {
    trick: 'trick',
    month: now.getMonth(),
    day: now.getDate(),
    rank: 1
  }
  pool.acquire(function(err, db) {
    if(err) {
      return callback(err);
    }
    db.collection('rank', function(err, collection) {
      if(err) {
        pool.release(db);
        return callback(err);
      }
      collection.ensureIndex('trick', {unqiue: true});
      collection.insert(rank, {safe: true}, function(err, rank) {
        pool.release(db);
        callback(err, rank);
      });
    });
  });
}


Rank.prototype.get = function get(callback) {
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
        pool.release(db);
        if (doc) {
          callback(err, doc);
        } else {
          callback(err, null);
        }
      });
    });
  });
}

Rank.prototype.erase = function update(callback) {
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
        $set: {
          month: now.getMonth(),
          day: now.getDate(),
          rank: 1
        }
      }, function (err, result) {
        pool.release(db);
        if (err) {
          return callback(err);
        }
        callback(null);
      });
    });
  });
}

Rank.prototype.update = function update(nrank, callback) {
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
        $set: {
          rank: nrank
        }
      }, function (err, result) {
        pool.release(db);
        if (err) {
          return callback(err);
        }
        callback(null);
      });
    });
  });
}

