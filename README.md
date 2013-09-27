WhoWakeUp
=========

WhoWakeUp是一个查看你的起床排名的网页应用，配套给微信平台使用。

Get Started
-----------

获取WhoWakeUp

*	下载最近的版本或者克隆库`git@github.com:brickgao/WhoWakeUp.git`

获取Node.js

*	从[http://nodejs.org](http://nodejs.org)获取最新版本的Node.js

获取依赖模块

*	在应用下执行`npm install`

How to use
-----------

通过构造`Get`请求来获取起床的统计信息

例如，用户`test`要统计信息，则发出信息：`\req?id=test`

可以在`\routes\index.js`自定义签到的时间段，签到的反馈信息以及重复签到的反馈信息。

License
-------

[MIT](http://opensource.org/licenses/MIT)