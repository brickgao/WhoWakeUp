var mongodb = require('./db');

function Rate() {
}

module.exports = Rate;

Rate.prototype.save = function save(callback) {
  var now = new Date();
  var rate = {
    trick: 'trick',
    date: now.getMonth().toString + '-' + now.getDate().toString,
    rate: 0
  }
  mongodb.open(function(err, db) {
    if(err) {
      return callback(err);
    }
    db.collection('rate', function(err, collection) {
      if(err) {
        mongodb.close();
        return callback(err);
      }
      collection.ensureIndex('trick', {unqiue: true});
      collection.insert(rate, {safe: true}, function(err, rate) {
        mongodb.close();
        callback(err, rate);
      });
    });
  });
}


Rate.prototype.get = function get(callback) {
  mongodb.open(function(err, db) {
    if (err) {
      return callback(err);
    }
    db.collection('rate', function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      collection.findOne({trick: 'trick'}, function(err, doc) {
        mongodb.close();
        if (doc) {
          var nrate = new Rate(doc);
          callback(err, nrate);
        } else {
          callback(err, null);
        }
      });
    });
  });
}

Rate.prototype.erase = function update(callback) {
  var now = new Date();
  mongodb.open(function(err, db) {
    if(err) {
      return callback(err);
    }
    db.collection('rate', function(err, collection) {
      if(err) {
        mongodb.close();
        return callback(err);
      }
      collection.update({
        trick: 'trick'
      }, {
        $set: {
          date: now.getMonth().toString + '-' + now.getDate().toString,
          rate: 1
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

Rate.prototype.update = function update(nrate, callback) {
  var now = new Date();
  mongodb.open(function(err, db) {
    if(err) {
      return callback(err);
    }
    db.collection('rate', function(err, collection) {
      if(err) {
        mongodb.close();
        return callback(err);
      }
      collection.update({
        trick: 'trick'
      }, {
        $set: {
          rate: nrate
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

