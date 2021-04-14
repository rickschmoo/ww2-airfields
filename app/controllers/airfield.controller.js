const db = require("../models");
const Airfield = db.airfield;
const Op = db.Sequelize.Op;

// ===============================
// Create and Save a new Airfield
// ===============================
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create an Airfield
    const airfield = {
      name: req.body.title,
      airforces: req.body.description,
      published: req.body.published ? req.body.published : false
    };
  
    // Save Airfield in the database
    Airfield.create(airfield)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Airfield."
        });
      });
  };


// ==========================================
// Retrieve all Airfields from the database.
// ==========================================
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.startsWith]: `${name}%` } } : null;
  
    Airfield.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Airfields."
        });
      });
  };

// ==========================================
// Find a single Airfield with an id
// ==========================================
exports.findOne = (req, res) => {
    const id = req.params.id;

    Airfield.findByPk(id)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message: "Error retrieving Airfield with id=" + id
        });
        });
};

// ==========================================
// Update an Airfield by the id in the request
// ==========================================
exports.update = (req, res) => {
    const id = req.params.id;
  
    Airfield.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Airfield was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Airfield with id=${id}. Maybe Airfield was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Airfield with id=" + id
        });
      });
  };


// ========================================================
// Delete an Airfield with the specified id in the request
// ========================================================
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Airfield.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Airfield was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Airfield with id=${id}. Maybe Airfield was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Airfield with id=" + id
        });
      });
  };


// ========================================================
// Delete all Airfields from the database.
// ========================================================
exports.deleteAll = (req, res) => {
    Airfield.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Airfields were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Airfields."
        });
      });
  };


// ========================================================  
// Find all published Airfields
// ========================================================
exports.findAllPublished = (req, res) => {
  Airfield.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Airfields."
        });
      });
  };
