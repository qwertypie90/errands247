var express=require('express');
var nodemailer = require("nodemailer");
var bodyParser = require('body-parser');
var app=express();

app.use(bodyParser.urlencoded({ extended: true}));
/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/
var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "errands24server@gmail.com",
        pass: "lala1919"
    }
});
/*------------------SMTP Over-----------------------------*/

/*------------------Routing Started ------------------------*/

app.get('/',function(req,res){
    res.sendfile('index.html');
});
app.post('/send',function(req,res){
    console.log('request::', req.body);
    var mailOptions={
        to : req.body.to,
        subject : req.body.subject,
        text : req.body.text
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.end("error");
     }else{
            console.log("Message sent: " + response.message);
        res.end("sent");
         }
});
});

/*--------------------Routing Over----------------------------*/

app.listen(3000,function(){
    console.log("Express Started on Port 3000");
});