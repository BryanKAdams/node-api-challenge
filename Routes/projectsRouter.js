const express = require("express");

const router = express.Router();

const Projects = require("../data/helpers/projectModel");

//GET REQUESTS

// GET /api/projects returns a list of all projects back
router.get("/", (req, res) => {
    Projects.get()
      .then(projects => {
        res.status(200).json(projects);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          errorMessage: "The projects list could not be retrieved."
        });
      });
  });


module.exports = router;
