//custom middleware

const Projects = require("../data/helpers/projectModel");
const Actions = require("../data/helpers/actionModel");
//Checks whether the ProjectId matches the ID in the request
function validateProjectId(req, res, next) {
    Actions.get(req.params.actionID).then(actions => {
      if (actions) {
        if (actions.project_id == req.params.id) {
          next();
        } else if (actions) {
          res.status(500).json({
            errorMessage: `this action belongs to projectID ${actions.project_id}`
          });
        }
      } else {
        res.status(400).json({
          errorMessage: `this action does not exist`
        });
      }
    });
  }
  
  //CHECKS whether a project exists
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
  
  function validateProject(req, res, next) {
    if (req.body && req.route.methods.post == true) {
      if (req.body.name && req.body.description) {
        next();
      } else if (req.body.name || req.body.description) {
        res.status(400).json({
          message: `Missing required ${
            req.body.name ? "description" : "name"
          } field`
        });
      } else {
        res.status(400).json({ message: "Missing both required fields" });
      }
    } else {
      if (
        req.body.name ||
        req.body.description ||
        (req.body.completed == true ||
        req.body.completed == false)
      ) {
        next();
      } else {
        res.status(400).json({
          errorMessage: "You must either update the name or the description"
        });
      }
    }
  }
  // Checks to make sure Action has both required fields
  function validateAction(req, res, next) {
    if (req.body && req.route.methods.post == true) {
      if (req.body.description && req.body.notes) {
        next();
      } else if (req.body.description || req.body.notes) {
        res.status(400).json({
          message: `Missing required ${
            req.body.description ? "notes" : "description"
          } field`
        });
      } else {
        res.status(400).json({ message: "Missing both required fields" });
      }
    } else if (
      req.body.description ||
      req.body.notes ||
      req.body.completed == true ||
      req.body.completed == false
    ) {
      next();
    } else {
      res.status(400).json({
        message:
          "You must either update the description, notes, or completion status"
      });
    }
  }

  module.exports = { validateProject, validateProjectId, projectExists, validateAction } 