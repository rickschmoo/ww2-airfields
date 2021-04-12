module.exports = app => {
  const airfields = require("../controllers/airfield.controller.js");

  var router = require("express").Router();

  // Create a new Airfield
  router.post("/", airfields.create);

  // Retrieve all Airfields
  router.get("/", airfields.findAll);

  // Retrieve all published Airfields
  router.get("/published", airfields.findAllPublished);

  // Retrieve a single Airfield with id
  router.get("/:id", airfields.findOne);

  // Update an Airfield with id
  router.put("/:id", airfields.update);

  // Delete an Airfield with id
  router.delete("/:id", airfields.delete);

  // Delete all Airfields
  router.delete("/", airfields.deleteAll);

  app.use('/api/airfields', router);
};

