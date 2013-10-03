var pool = require('./db');

function Wake(username) {
  this.name = username;
}

module.exports = Wake;

Wake.prototype.save = function save(callback) {
  var now = new Date();
  var currentname = this.name;
  var user = {
    name: currentname,
    month: now.getMonth(),
    day: now.getDate(),
    hour: now.getHours(),
    minutes: now.getMinutes(),
    rank: -1
  }
  pool.acquire(function(err, db) {
    if(err) {
      return callback(err);
    }
    db.collection('users', function(err, collection) {
      if(err) {
        pool.release(db);
        return callback(err);
      }
      collection.ensureIndex('name', {unqiue: true});
      collection.insert(user, {safe: true}, function(err, user) {
        pool.release(db);
        callback(err, user);
      });
    });
  });
}


Wake.prototype.get = function get(username, callback) {
  pool.acquire(function(err, db) {
    if(err) {
      return callback(err);
    }
    db.collection('users', function(err, collection) {
      if(err) {
        pool.release(db);
        return callback(err);
      }
      collection.findOne({name: username}, function(err, doc) {
        pool.release(db);
        if(doc) {
          callback(err, doc);
        } else {
          callback(err, null);
        }
      });
    });
  });
}

Wake.prototype.update = function update(username, callback) {
  var now = new Date();
  pool.acquire(function(err, db) {
    if(err) {
      return callback(err);
    }
    db.collection('users', function(err, collection) {
      if(err) {
        pool.release(db);
        return callback(err);
      }
      collection.update({
        name: username
      }, {
        $set: {
          month: now.getMonth(),
          day: now.getDate(),
          hour: now.getHours(),
          minutes: now.getMinutes(),
          rank: -1
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

Wake.prototype.updaterank = function updaterank(username, nrank, callback) {
  var now = new Date();
  pool.acquire(function(err, db) {
    if(err) {
      return callback(err);
    }
    db.collection('users', function(err, collection) {
      if(err) {
        pool.release(db);
        return callback(err);
      }
      collection.update({
        name: username
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
