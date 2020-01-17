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

//GET /api/projects/:id/actions returns a specific projects actions back
router.get("/:id/actions", projectExists, (req, res) => {
  Projects.getProjectActions(req.params.id)

    .then(actions => {
      if (actions.length > 0) {
        res.status(200).json(actions);
      } else if (actions.length == 0) {
        res.status(400).json({
          errorMessage: "This project has no actions"
        });
      } else {
        res.status(400).json({
          errorMessage: "The project with the specified ID does not exist"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        errorMessage: "The project could not be retrieved."
      });
    });
});

//POST REQUESTS

//POST to /api/projects CREATING a new project
router.post("/", (req, res) => {
  Projects.insert(req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Could not add project" });
    });
});

//DELETE REQUESTS

router.delete("/:id", (req, res) => {
  Projects.remove(req.params.id)
    .then(project => {
      if (project == 1) {
        res.status(200).json({
          message: `Project ${req.params.id} was successfully deleted`,
          deletedID: parseInt(req.params.id)
        });
      } else {
        res.status(500).json({
          errorMessage: "This project does not exist"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "Could not remove project"
      });
    });
});

//PUT REQUESTS

router.put("/:id",  (req, res) => {
    Projects.update(req.params.id, req.body)
      .then(project => {
        res.status(200).json({
          message: `Project ${req.params.id} was successfully updated`
        });
      })
      .catch(err => {
        res.status(500).json({
          errorMessage: "There was an error updating the project"
        });
      });
  });
//custom middleware

function projectExists(req, res, next) {
  Projects.get(req.params.id)
    .then(projects => {
      if (projects) {
        next();
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
}

module.exports = router;
