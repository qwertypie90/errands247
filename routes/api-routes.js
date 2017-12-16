// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");


// Routes
// =============================================================
module.exports = function(app, mongoose) {

  // GET route for getting all of the posts
  app.get("/api/orders/", function(req, res) {
    db.Order.findAll({})
    .then(function(dbOrder) {
      res.json(dbOrder);
    });
  });

	// PUT route for updating posts
  app.put("/api/orders/", function(req, res) {
    db.Order.update(
      req.username,
      {
        where: {
          id: req.username.id
        }
      }).then(function(dbOrder) {
        res.json(dbOrder);
      });
  });

}

