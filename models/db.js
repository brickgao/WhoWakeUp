var settings = require('../settings'),
    Db = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server,
    poolModule = require('generic-pool');

var pool = poolModule.Pool({
    name     : 'mongodb',
    create   : function(callback) {
        var server_options={'auto_reconnect':false, poolSize:1};
        var db_options={w:-1};
        var mongoserver = new Server(settings.host, Connection.DEFAULT_PORT, server_options );
        var db = new Db(settings.db, mongoserver, db_options);
        db.open(function(err,db) {
            if(err) return callback(err);
            callback(null, db);
        });
    },
    destroy  : function(db) { db.close();},
    max      : 1,
    idleTimeoutMillis : 30000,
    log : false 
});

module.exports = pool;


