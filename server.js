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
var port = process.env.PORT || 3000;



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
// all users should be saved in mysql not mongoose DB

app.use(express.static("public"));

// set up all routes
app.use('/auth', authRoutes);
app.use('/order', orderRoutes);
app.use('/profile', profileRoutes);

require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

app.use(express.static('asset'))
app.use(express.static('views'))


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


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

    db.sequelize.sync().then(function() {
        app.listen(port, function() {
            console.log("App listening on PORT " + port);
        });
    });

// on child added
firebase.database().ref().on("child_added", function(snapshot, prevChildKey) {

    var fireSnap = snapshot.val()["errands-247"].database["errands-247"].data
    // console.log(fireSnap)
    for (var email in fireSnap) {
        var customerAddress = fireSnap[email].customer_address_text
        var customerPhone = fireSnap[email].customer_phone_number_text
        var cusPickupLocation = fireSnap[email].pickup_location_text
        var customerName = fireSnap[email].customer_name_text


        // console.log(email)
        // console.log(snapshot.val()["errands-247"].database["errands-247"].data)

        db.Order.create({
            Customer_Address: customerAddress,
            Customer_PhoneNumber: customerPhone,
            Customer_Name: customerName,
            Pickup_Location: cusPickupLocation
        })
    }

    firebase.database().ref().remove()
})