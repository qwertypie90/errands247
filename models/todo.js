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
    },
      username: {
        type: DataTypes.STRING
      }
  }, {
    timestamps: false
  });
    return Order;
  };

  
 