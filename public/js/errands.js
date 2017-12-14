$(document).ready(function() {
    /* global moment */
    // blogContainer holds all of our posts
    var orderContainer = $("#time-table > tbody");
    var orders;

    // This function grabs posts from the database and updates the view
    function getOrders(category) {
        var categoryString = category || "";
        if (categoryString) {
            categoryString = "/category/" + categoryString;
        }
        $.get("/api/orders" + categoryString, function(data) {
            // console.log("Orders", data);
            orders = data;
            if (!orders || !orders.length) {
                console.log("NOOOTHING")
            } else {
                initializeRows(orders);
            }
        });
    }



    getOrders();

    function initializeRows(orders) {
        for (var i = 0; i < orders.length; i++) {
    var orderId = orders[i].id
    var pickUpAddy = orders[i].Pickup_Location;
    var customerName = orders[i].Customer_Name
    var phone = orders[i].Customer_PhoneNumber
    var dropOffAddy = orders[i].Customer_Address
    var driverID = "Suha Add It Here"
    // var driver = currentUser.username;
    // console.log(currentUser)

    var tempRow = $('<tr>')
    var tableJunk = "<td>" + orderId + "</td><td>" + pickUpAddy + "</td><td>" +
        customerName + "</td><td>" + phone + "</td><td>" + dropOffAddy + "</td><td><input type='button'value='status'id ='status'/></td><td>" + driverID + "</td>";

    tempRow.append(tableJunk)

    $("#time-table > tbody").append(tempRow)
    tempRow.status = 0
    // tempRow.UNIQUE FIREBASE IDENTIFIER

    // event listener for status button
    tempRow.on('click', function() { //do something})
        event.preventDefault();
        // console.log("status updated")
        tempRow.status++
            if (tempRow.status == 1) {
                // console.log("red")
                $(tempRow.children()[4].children[0]).css({ 'background': 'red' })
                initialize()
                initCoords()
                getLocation()
                geoSuccess()
                // geoError()
            }
        if (tempRow.status == 2) {
            // console.log("purple")
            $(tempRow.children()[4].children[0]).css({ 'background': 'purple' })
            console.log("I am at the restaurant")
        }
        if (tempRow.status == 3) {
            // console.log("green")
            $(tempRow.children()[4].children[0]).css({ 'background': 'green' })
            console.log("start tracking")
            initialize()
            initCoords()
            updateLocation()
        }
        if (tempRow.status == 4) {
            // console.log("green")
            $(tempRow.children()[4].children[0]).css({ 'background': 'Yellow' })
            console.log("at the dropoff")

        }
        if (tempRow.status == 5) {
            // console.log("green")
            $(tempRow.children()[4].children[0]).css({ 'background': 'MediumVioletRed ' })
            console.log("delivery completed")

        }
          console.log(orders[i])
            // console.log(orders[i]).push(createNewRow(orders[i]));
        })
        // orderContainer.append(ordersToAdd);
    
}}})


// frjnjrg
  // 3. Create Firebase event for adding order to the database and a row in the html when a user adds an entry
// database.ref().on("child_added", function(childSnapshot, prevChildKey) {

//     // console.log(childSnapshot.val());

//     // Store everything into a variable.

//         // console.log(tempRow.status)
//     });

