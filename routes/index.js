
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
      var now = new Date();
      if(user) {
        if(user.day != now.getDate() && user.month != now.getMonth()) {
          currentuser.update(currentuser.name, function(err) {
            console.log(err);
            if(err)
              return res.redirect('/');
            return res.send('1');
          });
        }
        else {
          return res.send('2');
        }
      }
      currentuser.save(function(err) {
          if(err)
            return res.redirect('/');
          return res.send('3');
      });
    });
  });

};
