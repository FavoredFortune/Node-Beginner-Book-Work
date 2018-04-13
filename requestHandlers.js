'use strict';

var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable");


// var exec = require("child_process").exec;

function start (response){
    console.log("Dragon request handler 'start' was called.");
    // var content = "empty dragon belly";

    var body = '<!DOCTYPE html>'+'<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" content="text/html; '+
        'charset=UTF-8" />'+
        '</head>'+
        '<body>'+
        '<form action="/upload" enctype="multipart/form-data" method="post">'+
        '<input type="file" name="upload" multiple="multiple" placeholder="upload image file here">'+
        '<input type="submit" value="Upload file" />'+
        '</form>'+
        '</body>'+
        '</html>';

    // exec("ls -lah", function (error, stdout, stderr) {
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(body);
        response.end();
        // content = stdout;
    }

    // return content;

    // function sleep(milliSeconds){
    //     var startTime = new Date().getTime();
    //     while (new Date().getTime() < startTime + milliSeconds);
    // }
    // sleep (10000);
    // return "Dragon start after sleeping 10 seconds.";
    // }

function upload(response, request) {
    console.log("Dragon request handler named 'upload' was called.");
    // return "Dragon upload.";
    var form = new formidable.IncomingForm();
    console.log("Upload Dragon is about to parse.");
    form.parse(request,function(error, fields, files){
        console.log("Upload Dragon finished parsing and it was delicious.");
        fs.rename(files.upload.path, "./tmp/test.png", function(error){
            if(error){
                fs.unlink("./tmp/test.png");
                fs.rename("./tmp/test.png");
            }
        });
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("Dragon received your image to get gold: </br>");
        response.write("<img src= '/show' />")
        response.end();
    })

}

function show(response){
    console.log("Dragon request handler named 'show' was called.");
    response.writeHead(200, {"Content-Type": "image/png"});
    fs.createReadStream("./tmp/test.png").pipe(response);
}

exports.start = start;
exports.upload = upload;
exports.show = show;