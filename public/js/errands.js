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

    var orderId;
    var pickUpAddy;
    var customerName;
    var phone;
    var dropOffAddy;

    function initializeRows(orders) {
        var statuses = [];
        for (var i = 0; i < orders.length; i++) {
            orderId = orders[i].id
            pickUpAddy = orders[i].Pickup_Location;
            customerName = orders[i].Customer_Name
            phone = orders[i].Customer_PhoneNumber
            dropOffAddy = orders[i].Customer_Address
            driverID = "Suha Add It Here"
            // var driver = currentUser.username;
            // console.log(currentUser)

            var tempRow = $('<tr>')
            var tableJunk = "<td>" + orderId + "</td><td>" + pickUpAddy + "</td><td>" +
                customerName + "</td><td>" + phone + "</td><td>" + dropOffAddy + "</td><td><input type='button'value='status' class='buttons' id='" + i + "'/></td><td>" + driverID + "</td>";

            tempRow.append(tableJunk)

            $("#time-table > tbody").append(tempRow)

            //Initial value for statuses per each button
            statuses[i] = 0
            // tempRow.UNIQUE FIREBASE IDENTIFIER
        }

        //Attaching click event only to buttons
        $(".buttons").on('click', function() { //do something})
            event.preventDefault();
            var id = $(this).attr('id')
            statuses[id]++
                // console.log('Temp row checking: ' + statuses[id])
                switch (statuses[id]) {
                    case 1:
                        console.log("red")
                        $(this).css({ 'background': 'red' })
                        initialize()
                        initCoords()
                        getLocation()
                        geoSuccess()
                        // geoError()
                        break;
                    case 2:
                        console.log("purple")
                        $(this).css({ 'background': 'purple' })
                        console.log("I am at the restaurant")
                        break;
                    case 3:
                        // console.log("green")
                        $(this).css({ 'background': 'green' })
                        console.log("start tracking")
                        break;
                    case 4:
                        // console.log("green")
                        $(this).css({ 'background': 'Yellow' })
                        console.log("at the dropoff")
                        break;
                    case 5:
                        // console.log("green")
                        $(this).css({ 'background': 'MediumVioletRed ' })
                        console.log("delivery completed")
                        break;
                }
        })
    }
    // END __________*
})