/**
  READ UP ON HTML FORMS
  - https://www.w3schools.com/html/html_forms.asp
**/

/** 
  FILE UPLOAD IN NODEJS
  - It is very common nowadays for a web application to allow a user to upload a file.
  - This file is usually an image, but it can be a pdf, video or mp3.
  - Summary:
    - File upload consists of a close synchronization between the client and the server.
    - On the client side, we have to use a "multipart/form-data" encoding along with an input of type "file".
    - On the server side, we used a module called "multer" that pulls the uploaded file from the request as well as saves it locally on disk.
    - We typically save the path to that image in our model and then use that path in our markup.
**/

/**
  CLIENT STEP 1: FORM ENCODING

  - We first have to tell the browser that the form we're using will contain a file.
  - We have different ways of encoding information contained in forms.
    - application/x-www-form-urlencoded: the default behavior. Special characters are encoded.
    - text/plain: No encoding except for space characters.
    - multipart/form-data: used for sending binary data (images, videos, etc).
  <form enctype="application/x-www-form-urlencoded"></form>
  <form enctype="multipart/form-data"></form>
**/

/**
  CLIENT STEP 2: FILE INPUT
  <input type="file" name="userImage">
**/

/**
  SERVER-SIDE STEP 1: FILE UPLOAD
  - In order to handle mutlipart form requests we need to use a library called "multer"
  - multer is used specifically for handling multipart form requests.
  - It gives the developer a lot of flexibility in specifying how and where to save the incoming files.
  npm install multer --save
**/
var multer  = require('multer');
var express = require('express');

var app = express();

/**
  SERVER-SIDE STEP 2: NAME & WHERE TO SAVE INCOMING FILES IN MULTER
**/


// diskStorage specifies we're saving the files to disk
// diskStorage options syntax:
// function (req, file, cb) {
    
//     req: the incoming request
    
//     file: the file the user wants to upload
    
//     cb: the callback function we have to call with the result
//         we have two options here:
//             * cb(error)  if we don't want to save the result
            
//             * cb(null, result) if everthing is good
    
    
// }
var myStorage = multer.diskStorage({  
  destination: function (request, file, callback) {
  
    // the directory of where to save the files
    callback(null, './uploaded'); 
  },
  filename: function (request, file, callback) {
    
    // For each request what do we call the file.
    // file.mimetype.split('/')[1] captures the extension (eg png or jpg).
    callback(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1]);
  }
});

// // OR keeps the files in memory while your server is running.
// var myStorage = multer.memoryStorage();

/**
  SERVER-SIDE STEP 3: ROUTES TO USE MULTER
  - Now that we've specified the storage mechanism we can create the request handler.
  - Call the multer function passing in the desired storage strategy.
  - This will give you back a requestHandler.
  - Specify which route to use the requestHandler for.
  - multer does support uploading multiple files at the same time
  - We pass in the same name of the input field from the form.
**/
var requestHandler = multer({ storage: myStorage });

// serve static html
app.use(express.static(__dirname + '/views'));

app.get('/', function(request, response) {
  response.render('index');
});

app.post('/upload', requestHandler.single('userImage'), 
    function(request, response) {
      // request has special file property now

      // // example file object. Now that multer is processing the request before our 
      // // response handler, the "req" object being passed in to our function will have 
      // // an additional property called "file"

      // request.file = {
      //   fieldname: 'productImage', // original html input
      //   originalname: '54cfd569f384a_-_bta-products-01-1013-de.jpg',
      //   mimetype: 'image/jpeg',
      //   destination: 'path/to/the/directory/we/used',
      //   filename: 'productImage-1480448807386.jpeg',
      //   path: 'path/from/root',
      //   size: 28784 
      // }

      console.log(request.file);


    // Response Handler

    // Typically save the information in req.file into our database or model.
    // Most important are the req.file.filename and the req.file.destination.
      response.send(`File successfully uploaded! ${JSON.stringify(request.file)}`);

    }
);

// app.post('/uploadMany', requestHandler.any(), function(request, response, next) {
//   console.log(request.files);
//     response.send(`Files successfully uploaded! ${JSON.stringify(request.files)}`);
// });

app.post('/uploadMany', requestHandler.array('userImage', 2), function(request, response) {
  console.log(request.files);
    response.send(`Files successfully uploaded! ${JSON.stringify(request.files)}`);
});

app.listen(3003, function() {
  console.log('App is listening on port 3003!');
})

/**
  INTRODUCE FILE UPLOAD WORKSHOP PROBLEM
  https://github.com/nycda-staff/nycda-curriculum/blob/master/lectures/node-js-file-upload/node-js-file-upload-walkthrough.md
**/
