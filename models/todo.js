module.exports = function(sequelize, DataTypes) {
  var Order = sequelize.define("Order", {
    Customer_Address: {
      type: DataTypes.STRING
    },
    Customer_Name: {
      type: DataTypes.STRING
    },
    Customer_PhoneNumber: {
      type: DataTypes.STRING
    },
      Pickup_Location: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false
  });
    return Order;
  };

  
 // in my routes put request
 // search for whatever id order clicking
 // take that date and match with userId
 // rewrite that into the datebase