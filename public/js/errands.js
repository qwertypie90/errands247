$(document).ready(function() {


    /* global moment */
    // blogContainer holds all of our posts
    var orderContainer = $("#time-table > tbody");
    var orders;

    // This function grabs posts from the api route/sql DB and updates the view
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

// Handling the building/display of rows

    function initializeRows(orders) {
        var statuses = [];
        for (var i = 0; i < orders.length; i++) {
            var orderId = orders[i].id
            var pickUpAddy = orders[i].Pickup_Location;
            var customerName = orders[i].Customer_Name
            var phone = orders[i].Customer_PhoneNumber
            var dropOffAddy = orders[i].Customer_Address
            var driverID = "Suha Add It Here"
            // var driver = currentUser.username;
            // console.log(currentUser)

            var tempRow = $('<tr class = "xyz">')
            var tableJunk = "<td>" + orderId + "</td><td>" + pickUpAddy + "</td><td>" +
                customerName + "</td><td>" + phone + "</td><td>" + dropOffAddy + "</td><td><input type='button'value='status' class='buttons' id='" + i + "'/></td><td>" + driverID + "</td>";

            tempRow.append(tableJunk)

            $("#time-table > tbody").append(tempRow)

            //Initial value for statuses per each button
            statuses[i] = 0
            // tempRow.UNIQUE FIREBASE IDENTIFIER
        }

        //On-click event for each button
        $(".buttons").on('click', function() { //do something})
            event.preventDefault();
            var id = $(this).attr('id')
            statuses[id]++
                // console.log('Temp row checking: ' + statuses[id])
                switch (statuses[id]) {
                    case 1:
                        $(this).css({ 'background': 'green' })
                        initialize()
                        initCoords()
                        getLocation()
                        geoSuccess()
                        break;
                    case 2:
                        $(this).css({ 'background': '#90EE90' })
                        // console.log("I am at the restaurant")
                        break;
                    case 3:
                        $(this).css({ 'background': 'Yellow' })
                        // console.log("start tracking")
                        break;
                    case 4:
                        $(this).css({ 'background': 'Purple' })
                        // console.log("at the dropoff")
                        break;
                    case 5:
                        $(this).css({ 'background': 'Black' })
                        $(this).parents('.xyz').css({ 'background': '#EC403D' })
                        // console.log("delivery completed")
                        break;
                }
        })
    }
    // END __________*
})