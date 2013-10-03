
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
            var mysearch = new Search();
            mysearch.get(currentuser.name, function(err, doc) {
              var nh = Now.getHours();
              var nm = Now.getMinutes();
              var nsh = '';
              var nsm = '';
              var s = '';
              var sh = '';
              var sm = '';
              if(nh < 10) {
                snh = '0' + nh.toString();
              }
              else {
                snh = nh.toString();
              }
              if(nm < 10) {
                snm = '0' + nm.toString();
              }
              else {
                snm = nm.toString();
              }
              if(doc.hour < 10) {
                sh = '0' + doc.hour.toString();
              }
              else {
                sh = doc.hour.toString();
              }
              if(doc.minutes < 10) {
                sm = '0' + doc.minutes.toString();
              }
              else {
                sm = doc.minutes.toString();
              }
              s = '现在是' + snh + ':' + snm + '，你已经在' + sh + ':' + sm + '分起床了，你是在调戏我吗？';
              return res.send(s);
            });
          }
          else {
            return currentuser.update(currentuser.name, function(err) {
              if(err)
                return console.log(err);
              var op = new Rankop();
              op.op(currentuser.name, function(nrank) {
                var mysearch = new Search();
                mysearch.get(currentuser.name, function(err, doc) {
                  var s = '';
                  var sh = '';
                  var sm = '';
                  if(doc.hour < 10) {
                    sh = '0' + doc.hour.toString();
                  }
                  else {
                    sh = doc.hour.toString();
                  }
                  if(doc.minutes < 10) {
                    sm = '0' + doc.minutes.toString();
                  }
                  else {
                    sm = doc.minutes.toString();
                  }
                  s = '亲爱的cuper，\n你的起床时间为：' + sh + ':' + sm + '\n是今天第' + doc.rank.toString() + '个起床的哟!\n成功击败了学校里' + (12460 - doc.rank).toString() + '个还赖在床上的懒虫！\n\n/太阳朝阳唤起我们斗志，\n/奋斗梦想叫醒我们起床！\n\n这是一份属于你的独一无二的起床回执，赶快告诉身边的cupers吧！！~~~~\n\n---------------\n【MrCUP正在对签到功能进行升级，现阶段全天开放，无需绑定，直接回复数字0即可测试签到功能。MrCUP欢迎大家给出更多建议与意见！】';
                  return res.send(s);
                });
              });
            })
          }
        });
      }
      else {
          return currentuser.save(function(err) {
          if(err)
            return console.log(err);
          var op = new Rankop();
          op.op(currentuser.name, function(nrank) {
            var mysearch = new Search();
            mysearch.get(currentuser.name, function(err, doc) {
              var s = '';
              var sh = '';
              var sm = '';
              if(doc.hour < 10) {
                sh = '0' + doc.hour.toString();
              }
              else {
                sh = doc.hour.toString();
              }
              if(doc.minutes < 10) {
                sm = '0' + doc.minutes.toString();
              }
              else {
                sm = doc.minutes.toString();
              }
              s = '亲爱的cuper，\n你的起床时间为：' + sh + ':' + sm + '\n是今天第' + doc.rank.toString() + '个起床的哟!\n成功击败了学校里' + (12460 - doc.rank).toString() + '个还赖在床上的懒虫！\n\n/太阳朝阳唤起我们斗志，\n/奋斗梦想叫醒我们起床！\n\n这是一份属于你的独一无二的起床回执，赶快告诉身边的cupers吧！！~~~~\n\n---------------\n【MrCUP正在对签到功能进行升级，现阶段全天开放，无需绑定，直接回复数字0即可测试签到功能。MrCUP欢迎大家给出更多建议与意见！】';
              return res.send(s);
            });
          });
        });
      }
    });
  });

};
