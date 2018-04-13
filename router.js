'use strict';

function route(handle, pathname, response, request){
    console.log("Leprechauns are about to request a route for " + pathname + ".");
    if (typeof handle[pathname] === 'function') {
       return handle[pathname](response, request);
    } else {
        console.log("Leprechauns couldn't find a request handler for " + pathname + ".");
        response.writeHead(404, {"Content-Type": "text/html"});
        response.write ("404 Leprechauns couldn't find your request - NO GOLD FOR YOU!");
        response.end();
    }
}

exports.route = route;