
var server = require("./server");
var router = require("./router");   

var requestHandlers = require("./requestHandlers");
var handle = {}  
handle["/"] = requestHandlers.kingmed;  
handle["/kingmed"] = requestHandlers.kingmed; 
handle["/kingquarter"] = requestHandlers.kingquarter;
handle["/kingquarters"] = requestHandlers.kingquarters;
handle["/kingmonth"] = requestHandlers.kingmonth;
handle["/kingmonths"] = requestHandlers.kingmonths;
server.start(router.route,handle);