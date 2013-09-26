var mongodb = require('./db');

function Wake(username) {
  this.name = username;
}

module.exports = Wake;

Wake.prototype.save = function save(callback) {
  var now = new Date();
  var user = {
    name: this.name,
    month: now.getMonth(),
    day: now.getDate(),
    hour: now.getHours(),
    minutes: now.getMinutes()
  }
  mongodb.open(function(err, db) {
    if(err) {
      return callback(err);
    }
    db.collection('users', function(err, collection) {
      if(err) {
        mongodb.close();
        return callback(err);
      }
      collection.ensureIndex('name', {unqiue: true});
      collection.insert(user, {safe: true}, function(err, user) {
        mongodb.close();
        callback(err, user);
      });
    });
  });
}


Wake.prototype.get = function get(username, callback) {
  mongodb.open(function(err, db) {
    if (err) {
      return callback(err);
    }
    db.collection('users', function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      collection.findOne({name: username}, function(err, doc) {
        mongodb.close();
        if (doc) {
          var user = new Wake(doc);
          callback(err, user);
        } else {
          callback(err, null);
        }
      });
    });
  });
}

Wake.prototype.update = function update(username, callback) {
  var now = new Date();
  mongodb.open(function(err, db) {
    if(err) {
      return callback(err);
    }
    db.collection('users', function(err, collection) {
      if(err) {
        mongodb.close();
        return callback(err);
      }
      collection.update({
        name: username
      }, {
        $set: {
          month: now.getMonth(),
          day: now.getDate(),
          hour: now.getHours(),
          minutes: now.getMinutes()
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