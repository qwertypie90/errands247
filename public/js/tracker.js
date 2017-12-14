function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}


// You'll also need to write your success function:



// You can stop here if you just want the lat and lng coordinates.
// But if you want to convert these coordinates to a full address, you can call another function that passes your lat and lng:

// Add a function in your success function:
function locationError() {
    alert('"Your browser does not support Geolocation!"');
}

function initCoords() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(initialize, locationError);
    } else {
        showError("Your browser does not support Geolocation!");
    }
}

function geoSuccess(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    // alert("lat:" + lat + " lng:" + lng);
    codeLatLng(lat, lng);
}

// And then an error function:


function geoError() {
    alert("Geocoder failed.");
}

// // And here's the code for that function:



function initialize() {
    geocoder = new google.maps.Geocoder();
}

function codeLatLng(lat, lng) {
    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({ 'latLng': latlng }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            // console.log(results)
            if (results[1]) {
                //formatted address
                var address = results[0].formatted_address;
                alert("address = " + address);
            } else {
                alert("No results found");
            }
        } else {
            alert("Geocoder failed due to: " + status);
        }
    });
}


function updateLocation(position) {
    var longitude = position.coords.longitude;
    var latitude = position.coords.latitude;
    $.ajax({
        url: "../../ajax/account/handlegeolocation",
        type: "post",
        dataType: "json",
        data: { "longitude": longitude, "latitude": latitude },
        success: function(response) {
            console.log(response.message);
        },
        error: function(xmlhttprequest, textstatus, message) {
            console.log(message);
        }
    }).then(function() {
        setTimeout(getLocation, 30);
    });
}

function errorHandler(error) {
    console.log('Geolocation error : code ' + error.code + ' - ' + error.message);
}