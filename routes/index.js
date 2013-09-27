
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
    var Now = new Date();
    var nhour = Now.getHours();
//    if(nhour < 6) {
//      return req.send(currentuser.name + '，现在离起床还早呢，再睡一会吧！"."\n\n年轻是我们唯一拥有权力编制梦想的时光,好好休息，六点过后再来吧！\n\n---------------\n【MrCUP推出早起签到功能，每天早6点至9点，回复数字\"0\"按照提示参与早起签到，快和你的小伙伴们一起看看你的起床排名有木有高端大气上档次！专属石大学子，你加了吗？】');
//    }
//    if(nhour > 9 && nhourd < 19) {
//      return req.send(currentuser.name + '，这会儿才起床呀！也不看看啥时候啊！你还是明天再来吧！"."\n\n别忘了早起，九点以前再来哦\n\n---------------\n【MrCUP推出早起签到功能，每天早6点至9点，回复数字\"0\"按照提示参与早起签到，快和你的小伙伴们一起看看你的起床排名有木有高端大气上档次！专属石大学子，你加了吗？】');
//    }
//    if(nhour >= 19) {
//      return req.send(currentuser.name + '，太阳都下山啦！你还是明天再来吧！"."六点过后九点以前再来哦"."\n\n每当有人睡懒觉时，石大里已经有人在喷泉旁捧书晨读；\n每当你在抱怨1000米不好过时，早起的同学已经在红旗操场迎接朝阳;\n你可是输给任何人，但不能输给自己，不能给懒惰让步！\n我们拼不了爹，但能早起去拼一个美好的未来！！！\n\n---------------\n【MrCUP推出早起签到功能，每天早6点至9点，回复数字\"0\"按照提示参与早起签到，快和你的小伙伴们一起看看你的起床排名有木有高端大气上档次！专属石大学子，你加了吗？】');
//    }
    currentuser.get(currentuser.name, function(err, user) {
      var getdate = require('../models/getdate.js');
      var Rankop = require('../models/rankop.js');
      var Search = require('../models/search.js');
      var now = new getdate();
      var nuser = currentuser.name;
      if(user) {
        return now.get(user.day, user.month, function(is) {
          if(is === true) {
            return res.send('你已经起床了，你不是逗我玩儿呢吗');
          }
          if(is === false) {
            currentuser.update(currentuser.name, function(err) {
              if(err)
                return res.redirect('/');
              var op = new Rankop();
              op.op(currentuser.name, function(nrank) {
                var mysearch = new Search();
                mysearch.get(currentuser.name, function(err, doc) {
                  console.log(doc);
                  var s = '';
                  s = '亲爱的' + doc.name.toString() + '，\n你的起床时间为：' + doc.hour.toString() + ':' + doc.minutes.toString() + '\n是今天第' + doc.rank.toString() + '个起床的哟!\n成功击败了学校里' + (doc.num - 1).toString() + '个还赖在床上的懒虫！\n\n/太阳朝阳唤起我们斗志，\n/奋斗梦想叫醒我们起床！\n\n这是一份属于你的独一无二的起床回执，赶快告诉身边的cupers吧！！~~~~\n\n---------------\n【MrCUP推出早起签到功能，每天早6点至9点，回复数字\"0\"按照提示参与早起签到，快和你的小伙伴们一起看看你的起床排名有木有高端大气上档次！专属石大学子，你加了吗？】';
                  console.log(s);
                  return res.send(s);
                });
              });
            })
          }
        });
      }
      return currentuser.save(function(err) {
          if(err)
            return res.redirect('/');
          var op = new Rankop();
          op.op(currentuser.name, function(nrank) {
            var mysearch = new Search();
            mysearch.get(currentuser.name, function(err, doc) {
              console.log(doc);
              s = '亲爱的' + doc.name.toString() + '，\n你的起床时间为：' + doc.hour.toString() + ':' + doc.minutes.toString() + '\n是今天第' + doc.rank.toString() + '个起床的哟!\n成功击败了学校里' + (doc.num - doc.rank).toString() + '个还赖在床上的懒虫！\n\n/太阳朝阳唤起我们斗志，\n/奋斗梦想叫醒我们起床！\n\n这是一份属于你的独一无二的起床回执，赶快告诉身边的cupers吧！！~~~~\n\n---------------\n【MrCUP推出早起签到功能，每天早6点至9点，回复数字\"0\"按照提示参与早起签到，快和你的小伙伴们一起看看你的起床排名有木有高端大气上档次！专属石大学子，你加了吗？】';
              console.log(s);
              return res.send(s);
            });
          });
      });
    });
  });

};
