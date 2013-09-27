var mongodb = require('./db');

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
  mongodb.open(function(err, db) {
    if(err) {
      return callback(err);
    }
    db.collection('rank', function(err, collection) {
      if(err) {
        mongodb.close();
        return callback(err);
      }
      collection.ensureIndex('trick', {unqiue: true});
      collection.insert(rank, {safe: true}, function(err, rank) {
        mongodb.close();
        callback(err, rank);
      });
    });
  });
}


Rank.prototype.get = function get(callback) {
  mongodb.open(function(err, db) {
    if (err) {
      return callback(err);
    }
    db.collection('rank', function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      collection.findOne({trick: 'trick'}, function(err, doc) {
        mongodb.close();
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
  mongodb.open(function(err, db) {
    if(err) {
      return callback(err);
    }
    db.collection('rank', function(err, collection) {
      if(err) {
        mongodb.close();
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
        mongodb.close();
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
  mongodb.open(function(err, db) {
    if(err) {
      return callback(err);
    }
    db.collection('rank', function(err, collection) {
      if(err) {
        mongodb.close();
        return callback(err);
      }
      collection.update({
        trick: 'trick'
      }, {
        $set: {
          rank: nrank
        }
      }, function (err, result) {
        mongodb.close();
        if (err) {
          return callback(err);
        }
        callback(null);
      });
    });
  });
}

