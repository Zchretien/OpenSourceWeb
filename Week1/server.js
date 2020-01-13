var http = require('http');
var url = require('url');
var fileSystem = require('fs');

http.createServer(function (request, response) {

    var pathName = url.parse(request.url).pathname;
    var fileName = pathName.substr(1); /* lets remove the "/" from the name */

    //Take in request and add file extension for the read file function
    if(fileName == "index"){
        //Add html extension for index page
        fileName += ".html";
    } else if (fileName == "read-todo"){
        //Add html extension for read-todo page
        fileName += ".html";
    } else if (fileName == "todo"){
        //Add json file extension for todo page
        fileName += ".json";
    }

    fileSystem.readFile(fileName , callback);

    function callback(err, data) {

        if (err) {

            console.error(err);

            /* Send the HTTP header 
             * HTTP Status: 400 : NOT FOUND
             * Content Type: text/html 
             */

            response.writeHead(302, {'Location' : '/index'});
        }else {
            /* Send the HTTP header 
             * HTTP Status: 200 : OK
             * Content Type: text/html 
             */
            response.writeHead(200, {'Content-Type': 'text/html'});

            response.write(data.toString());
        }     
        /* the response is complete */
        response.end();
    }

}).listen(3000);
// Console will print the message
console.log('Server running at http://localhost:3000/index.html');