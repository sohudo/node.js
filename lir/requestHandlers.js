var sys = require('sys');
var connection = require("./models/db");
var url = require("url");   
var querystring = require("querystring");



function kingmed(response, request) {    
  console.log("Request handler 'kingmed' was called."); 
 var arg = url.parse(request.url).query;  
  console.log("Request for " + arg );  
  var id = querystring.parse(arg).id;   

  console.log("id = "+id);  
  var sql="";
 if (id==null)
	{
	 sql="(select bb_month.year,round(sum(FactPrice)) as FactPrice,bb_yuji.yuji as Budget from bb_month left join bb_yuji on bb_month.year=bb_yuji.year group by year )  union (select *  from bb_his where year>=2009) order by year";
	}
	else
	{
     sql="(select bb_month.year,round(sum(FactPrice)) as FactPrice,bb_yuji.yuji as Budget from bb_month left join bb_yuji on bb_month.year=bb_yuji.year where fcom='"+id+"' group by fcom,year )";
	}

  connection.query(sql,function(err, rows, fields) { 
	if (err) {

		throw err;
	} 

	console.log( "count：", rows.length);
	if(rows.length>0){
		//var json = JSON.stringify(rows);
        response.writeHead(200, {"Content-Type": "text/html;charset:utf-8"}); 
         //response.writeHead(200, {"Content-Type": "text/html"});
        var restr={
           Status:0,
           Msg:'OK' ,
		   Countrow:rows.length,
           Data:rows
		}
        response.write(JSON.stringify(restr));
        response.end();
	  }
	});


 }  

function kingquarters(response, request) {
  console.log("Request handler 'quarter' was called.");
 // var sql="";
 //sql="select * ,(select  FactPrice from V_quarter b where a.year-1=b.year and a.quarter=b.quarter ) as TFactPrice, (select  FactPrice  from V_quarter b where a.year=b.year and a.quarter-1=b.quarter) as HFactPrice from V_quarter a order by year,quarter";
 
  var arg = url.parse(request.url).query;  
  var id = querystring.parse(arg).id;  
  var quarter= querystring.parse(arg).quarter;  
  var sql="";
  if (id==null)
	{
	 if (quarter==null) 
	  sql="select * ,(select  FactPrice from V_quarter b where a.year-1=b.year and a.quarter=b.quarter ) as TFactPrice, (select  FactPrice  from V_quarter b where a.year=b.year and a.quarter-1=b.quarter) as HFactPrice from V_quarter a";
     else
       sql="select fcom,year,quarter,round(sum(FactPrice)) as FactPrice,round(sum(Requestid)) as Requestid from V_fcomquart where quarter="+quarter+" group by fcom,year,quarter order by year,FactPrice desc";
	}
	else
	{
      sql="select fcom,year,quarter,round(sum(FactPrice)) as FactPrice,round(sum(Requestid)) as Requestid from V_fcomquart where fcom='"+id+"' group by fcom,year,quarter order by fcom,year,quarter";
	}
  connection.query(sql, function(err, rows, fields) { 
	if (err) {
		throw err;
	} 
  
	console.log( "count：", rows.length);
	if(rows.length>0){
		//var json = JSON.stringify(rows);
        response.writeHead(200, {"Content-Type": "text/html;charset:utf-8"}); 
        //response.write("<meta charset=\"utf-8\"/> "); 
       
        var str="";
		var year="";
		 for (var i=0; i<rows.length; i++) {	        
		   var firstResult=rows[i];
		   var ayear=firstResult['year'];
		   if (year!=ayear)
		   {
			   year=ayear;
			   if (str!="")
			   {
				   str=str+" ]},";
			   }
               str=str+'{"year":'+year+',"Data":[';
           } 
		   else
		   {
			   str=str+",";
		   }
           // str=str+"{";

			  // for (var j=0; i<fields.length; j++) {
				// var field=fields[j];
               //  str=str+field;//"\""+field+"\":"+firstResult[field];
		      // }
             str=str+JSON.stringify(firstResult);
            //  str=str+"},";
		 
		 }
        str='['+str+']}]}';
        var restr='{"Status":0,"Msg":"OK","Countrow":8,"Data":'+str;
       // response.write(JSON.stringify(restr));
		 response.write(restr);
		 response.write("<head><meta charset=\"utf-8\"/></head>"); 
        response.end();
	  }
	});
}

function kingquarter(response, request) {
  console.log("Request handler 'quarter' was called.");
  var arg = url.parse(request.url).query;  
  var id = querystring.parse(arg).id;  
  var quarter= querystring.parse(arg).quarter;  
  var sql="";
  if (id==null)
	{
	 if (quarter==null) 
	  sql="select * ,(select  FactPrice from V_quarter b where a.year-1=b.year and a.quarter=b.quarter ) as TFactPrice, (select  FactPrice  from V_quarter b where a.year=b.year and a.quarter-1=b.quarter) as HFactPrice from V_quarter a";
     else
       sql="select fcom,year,quarter,round(sum(FactPrice)) as FactPrice,round(sum(Requestid)) as Requestid from V_fcomquart where quarter="+quarter+" group by fcom,year,quarter order by FactPrice desc";
	}
	else
	{
      sql="select fcom,year,quarter,round(sum(FactPrice)) as FactPrice,round(sum(Requestid)) as Requestid from V_fcomquart where fcom='"+id+"' group by fcom,year,quarter order by fcom,year,quarter";
	}
  connection.query(sql, function(err, rows, fields) { 
	if (err) {
		throw err;
	} 
  
	console.log( "count：", rows.length);
	if(rows.length>0){
		//var json = JSON.stringify(rows);
        response.writeHead(200, {"Content-Type": "text/html;charset:utf-8"}); 
        // response.write("<meta charset=\"utf-8\"/> "); 
        var restr={
           Status:0,
           Msg:'OK' ,
		   Countrow:rows.length,
           Data:rows
		}
        response.write(JSON.stringify(restr));
        response.write("<head><meta charset=\"utf-8\"/></head>"); 
        response.end();
	  }
	});
}

function kingmonth(response, request) {
  console.log("Request handler 'month' was called.");
  var arg = url.parse(request.url).query;  
  console.log("Request for " + arg );  
  var id = querystring.parse(arg).id;   
  var year = querystring.parse(arg).year; 
  console.log("id = "+id);  
  var sql="";
  if (id==null)
  {
	 if (year==null) 
		 sql="select year,month,round(sum(FactPrice)) as FactPrice,round(sum(Requestid)) as Requestid from bb_month group by year,month order by year,month";
	 else
		sql="select fcom,year,round(sum(FactPrice)) as FactPrice,round(sum(Requestid)) as Requestid from bb_month where year='"+year+"' group by fcom,year order by FactPrice desc"; 
  }
  else {
	if (year==null)
      sql="select fcom,year,month,round(sum(FactPrice)) as FactPrice,round(sum(Requestid)) as Requestid from bb_month where fcom='"+id+"' group by fcom,year,month order by year,month";
    else
	  sql="select fcom,year,month,round(sum(FactPrice)) as FactPrice,round(sum(Requestid)) as Requestid from bb_month where fcom='"+id+"' and year='"+year+"' group by fcom,year,month order by year,month";	
  }
  connection.query(sql, function(err, rows, fields) { 
	if (err) {
		throw err;
	} 
  
	console.log( "count：", rows.length);
	if(rows.length>0){
		//var json = JSON.stringify(rows);
        response.writeHead(200, {"Content-Type": "text/html"}); 		
         //response.writeHead(200, {"Content-Type": "text/html"});
        var restr={
           Status:0,
           Msg:'OK' ,
		   Countrow:rows.length,
           Data:rows
		}
        response.write(JSON.stringify(restr));
		response.write("<head><meta charset=\"utf-8\"/></head>"); 
        response.end();
	  }
	});
}

function kingmonths(response, request) {
  console.log("Request handler 'quarter' was called.");
 // var sql="";
// sql="select year,month,round(sum(FactPrice)) as FactPrice,round(sum(Requestid)) as Requestid from bb_month group by year,month order by year,month";

   var arg = url.parse(request.url).query;  
  console.log("Request for " + arg );  
  var id = querystring.parse(arg).id;   
  var year = querystring.parse(arg).year; 
  console.log("id = "+id);  
  var sql="";
  if (id==null)
  {
	 if (year==null) 
		 sql="select year,month,round(sum(FactPrice)) as FactPrice,round(sum(Requestid)) as Requestid from bb_month group by year,month order by year,month";
	 else
		sql="select fcom,year,round(sum(FactPrice)) as FactPrice,round(sum(Requestid)) as Requestid from bb_month where year='"+year+"' group by fcom,year order by year, FactPrice desc"; 
  }
  else {
	if (year==null)
      sql="select fcom,year,month,round(sum(FactPrice)) as FactPrice,round(sum(Requestid)) as Requestid from bb_month where fcom='"+id+"' group by fcom,year,month order by year,month";
    else
	  sql="select fcom,year,month,round(sum(FactPrice)) as FactPrice,round(sum(Requestid)) as Requestid from bb_month where fcom='"+id+"' and year='"+year+"' group by fcom,year,month order by year,month";	
  }
  connection.query(sql, function(err, rows, fields) { 
	if (err) {
		throw err;
	} 
  
	console.log( "count：", rows.length);
	if(rows.length>0){
		//var json = JSON.stringify(rows);
        response.writeHead(200, {"Content-Type": "text/html;charset:utf-8"}); 
		
        //response.write("<meta charset=\"utf-8\"/> "); 
        var str="";
		var year="";
		 for (var i=0; i<rows.length; i++) {	        
		   var firstResult=rows[i];
		   var ayear=firstResult['year'];
		   if (year!=ayear)
		   {
			   year=ayear;
			   if (str!="")
			   {
				   str=str+" ]},";
			   }
               str=str+'{"year":'+year+',"Data":[';
           } 
		   else
		   {
			   str=str+",";
		   }
           // str=str+"{";

			  // for (var j=0; i<fields.length; j++) {
				// var field=fields[j];
               //  str=str+field;//"\""+field+"\":"+firstResult[field];
		      // }
             str=str+JSON.stringify(firstResult);
            //  str=str+"},";
		 
		 }
        str='['+str+']}]}';
        var restr='{"Status":0,"Msg":"OK","Countrow":8,"Data":'+str;
       // response.write(JSON.stringify(restr));
		 response.write(restr);
		 response.write("<head><meta charset=\"utf-8\"/></head>"); 
        response.end();
	  }
	});
}
// connection.end();


  exports.kingmed = kingmed; 
  exports.kingquarter = kingquarter;
  exports.kingquarters = kingquarters;
  exports.kingmonth = kingmonth;
  exports.kingmonths = kingmonths;
