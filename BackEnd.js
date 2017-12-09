var firebase = require('firebase');
var mysql = require('mysql');

//connecting to MySql database


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "errands247"
});


//  Firebase initializeApp 
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


     
        console.log("Connected!");
        var sql = "INSERT INTO Orders (Customer_Address, Customer_Name, Customer_PhoneNumber, Pickup_Location) VALUES (?, ?,?,?)"

        con.query(sql, [customerAddress, customerName, customerPhone, cusPickupLocation], function (err, result) {
          if (err) throw err;
          console.log("1 record inserted");
        });

      })
