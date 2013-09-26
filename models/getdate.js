var date = new Date();

function getdate() {
}

module.exports = getdate;

getdate.prototype.get = function get(day, month, callback) {
  var now = new Date();
  var check = {
    day: now.getDate(),
    month: now.getMonth()
  }
  if(day === now.getDate() && month === now.getMonth())
    return callback(true);
  return callback(false);
}
