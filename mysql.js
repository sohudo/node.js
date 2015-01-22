var sys = require('sys');
var mysql = require('mysql');
var connection = mysql.createConnection({
	host : 'localhost',
	port : 3307,
	user : 'jifeng',
	password : 'jifeng',
	database : 'world',
	charset : 'UTF8_GENERAL_CI',
	debug : false});

var date=new Date(); 
var createtime=date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
console.log(createtime,'Connected to MYSQL automatically.'); 

connection.connect();
connection.query('select * from bb_month3', function(err, rows, fields) { 
	if (err) {
		throw err;
	} 
	//var results = rows[0];
	//var row = results[0];
	console.log( "count£º", rows.length);
	if(rows.length>0){
		var json = JSON.stringify(rows);
      // console.log(json);
	 /*  for (var i=0; i<rows.length; i++) {	        
		 var firstResult=rows[i];
		 console.log("userName£º",firstResult);
		// console.log('id:'+firstResult['id'],'Title:'+firstResult['title'],'name:'+firstResult['name']);
		}
		*/
	  }
	});
connection.end();
