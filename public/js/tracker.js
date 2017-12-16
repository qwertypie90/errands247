

function initialize() {
    geocoder = new google.maps.Geocoder();
}

function initCoords() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(initialize, locationError);
    } else {
        showError("Your browser does not support Geolocation!");
    }
}


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function geoSuccess(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    // alert("lat:" + lat + " lng:" + lng);
    codeLatLng(lat, lng);
}

function codeLatLng(lat, lng) {
    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({ 'latLng': latlng }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            // console.log(results)
            if (results[1]) {
                //formatted address
                var address = results[0].formatted_address;
                alert("Your Driver Is Leaving From This Address = " + address);
            } else {
                alert("No results found");
            }
        } else {
            alert("Geocoder failed due to: " + status);
        }
    });
}

function locationError() {
    alert('"Your browser does not support Geolocation!"');
}

function geoError() {
    alert("Geocoder failed.");
}

// function updateLocation(position) {
//     var longitude = position.coords.longitude;
//     var latitude = position.coords.latitude;
//     $.ajax({
//         url: "../../ajax/account/handlegeolocation",
//         type: "post",
//         dataType: "json",
//         data: { "longitude": longitude, "latitude": latitude },
//         success: function(response) {
//             console.log(response.message);
//         },
//         error: function(xmlhttprequest, textstatus, message) {
//             console.log(message);
//         }
//     }).then(function() {
//         setTimeout(getLocation, 30);
//     });
// }

// function errorHandler(error) {
//     console.log('Geolocation error : code ' + error.code + ' - ' + error.message);
// }