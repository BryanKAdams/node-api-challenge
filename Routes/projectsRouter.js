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

//GET /api/projects/:id returns a specific project back
// exact same thing as above request but passing parameter in and checking
// if that project exists
router.get("/:id", (req, res) => {
  Projects.get(req.params.id)
    .then(projects => {
      if (projects) {
        res.status(200).json(projects);
      } else {
        res.status(400).json({
          errorMessage: "project with the specified ID does not exist"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        errorMessage: "The projects list could not be retrieved."
      });
    });
});

module.exports = router;
