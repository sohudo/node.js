var mysql = require('mysql');

function handleError (err) {
  if (err) {
    // 如果是连接断开，自动重新连接
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      connect();
    } else {
      console.error(err.stack || err);
    }
  }
}

// 连接数据库
function connect () {
  db = mysql.createConnection({
	host : 'localhost',
	port : 3306,
	user : 'root',
	password : 'jifeng',
	database : 'world',
	charset : 'UTF8_GENERAL_CI',
	debug : false});
  db.connect(handleError);
  var date=new Date(); 
  var createtime=date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  console.log(createtime,'Connected to MYSQL automatically.'); 
  db.on('error', handleError);
}

var db;
connect();
module.exports =db