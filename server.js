const express = require('express');
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const orderRoutes = require('./routes/order-routes')
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const app = express();
const port = process.env.PORT || 3000;

// set view engine
app.set('view engine', 'ejs');

// set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('connected to mongodb');
});

// set up routes
app.use('/auth', authRoutes);
app.use('/order', orderRoutes);
app.use('/profile', profileRoutes);

app.use(express.static('asset'))
app.use(express.static('views'))


//create home route
app.get('/', function(req, res) {
    res.render('test.html', { user: req.user });
});

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

app.post('/send',function(req,res){
    console.log('request::', req.body);
    var mailOptions={
        to : req.body.to,
        subject : req.body.subject,
        text : req.body.text
    }
    // console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.end("error");
     }else{
            console.log("Message sent: " + JSON.stringify(response, null, 2));
        res.end("sent");
         }
});
    console.log("Order Pressed")
});

/*--------------------Routing Over----------------------------*/

app.listen(port);
console.log("Express started on port " + port);