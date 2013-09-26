
/*
 * GET home page.
 */


module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('index', {
      title: 'WhoWakeUp'
    })
  });

  app.get('/req', function(req, res) {
    var wake = require('../models/wake.js');
    var currentuser = new wake(req.query.id);
    currentuser.get(currentuser.name, function(err, user) {
      var getdate = require('../models/getdate.js');
      var Rateop = require('../models/rateop.js');
      var now = new getdate();
      var nuser = currentuser.name;
      if(user) {
        return now.get(user.day, user.month, function(is) {
          if(is === true) {
            return res.send('2');
          }
          if(is === false) {
            currentuser.update(currentuser.name, function(err) {
              if(err)
                return res.redirect('/');
              res.send('1');
              var op = new Rateop();
              op.op(currentuser.name, function(nrate) {
              });
            })
          }
        });
      }
      return currentuser.save(function(err) {
          if(err)
            return res.redirect('/');
          res.send('3');
          var op = new Rateop();
          op.op(currentuser.name, function(nrate) {
          });
      });
    });
  });

};
