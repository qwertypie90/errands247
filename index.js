ilocation = []
ifoodOrder = []
idropOff = []

function addItem() {

    ilocation.push(document.getElementById('storeLocation').value)
    ifoodOrder.push(parseInt(document.getElementById('foodOrder').value))
    idropOff.push(parseInt(document.getElementById('dropOff').value))

    displayCart()
}


function delElement(a) {
    ilocation.splice(a, 1);
    ifoodOrder.splice(a, 1)
    idropOff.splice(a, 1)
    displayCart()
}


function displayCart() {

    cartdata = '<table><tr><th>Store Location</th><th>Food Order</th><th>Drop Off Locatioin</th></tr>';

    for (i = 0; i < ilocation.length; i++) {
        cartdata += "<tr><td>" + ilocation[i] + "</td><td>" + ifoodOrder[i] + "</td><td>" + idropOff[i] + "</td><td>" + "</td><td><button onclick='delElement(" + i + ")'>Delete</button></td></tr>"
    }

    cartdata += '<tr><td></td><td></td><td></td><td>' + '</td></tr></table>'
    document.getElementById('cart').innerHTML = cartdata

}