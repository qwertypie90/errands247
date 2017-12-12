const express = require('express');
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const db = require("./models");
const profileRoutes = require('./routes/profile-routes');
const orderRoutes = require('./routes/order-routes')
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const app = express();
var firebase = require('firebase');

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
    res.render('index.html', { user: req.user });
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

//app.listen(port);


db.sequelize.sync().then(function() {
    app.listen(port, function() {
      console.log("App listening on PORT " + port);
    });
  });

  console.log("Express started on port " + port);


   //Firebase initializeApp 
var config = {
    apiKey: "AIzaSyA-Pu9Kk5mokeAmI2WiSovUSbPZtktVFqE",
    authDomain: "errands-247.firebaseapp.com",
    databaseURL: "https://errands-247.firebaseio.com",
    projectId: "errands-247",
    storageBucket: "errands-247.appspot.com",
    messagingSenderId: "841619642457"
  };
  firebase.initializeApp(config);
  
  
 // on database change event
  firebase.database().ref().on("value", function (snapshot) {
  
        //loop throgh the database and grab the informaton needed
        for (var email in snapshot.val().project["errands-247"].database["errands-247"].data) {
          var customerAddress = snapshot.val().project["errands-247"].database["errands-247"].data[email].customer_address_text
          var customerPhone = snapshot.val().project["errands-247"].database["errands-247"].data[email].customer_phone_number_text
          var cusPickupLocation = snapshot.val().project["errands-247"].database["errands-247"].data[email].pickup_location_text
          var customerName = snapshot.val().project["errands-247"].database["errands-247"].data[email].customer_name_text
        }
        console.log(cusPickupLocation);
        console.log(customerName);
        console.log(customerPhone);
        console.log(customerAddress);
  
  
       
         db.Order.create({
            Customer_Address: customerAddress,
            Customer_PhoneNumber: customerPhone,
            Customer_Name: customerName,
            Pickup_Location: cusPickupLocation


          })
  
        })