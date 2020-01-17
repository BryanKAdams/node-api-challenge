const express = require("express");

//PARAMS DOESN'T GET PASSED DOWN UNLESS U LINK THEM

//https://stackoverflow.com/questions/25260818/rest-with-express-js-nested-router
const router = express.Router({
  mergeParams: true
});

//PROJECT EXISTS, checks if a Project exists and if it doesn't exist it returns
// project with this ID does not exist. Otherwise it continues/ NEXT();

//VALIDATE ACTION, checks the ACTIONS fields and makes sure REQUIRED FIELDS
// ARE THERE, OTHERWISE IT TELLS THE USER WHAT FIELDS ARE MISSING

// VALIDATE PROJECT ID CHECKS WHETHER THE PROJECT ID MATCHES THE ID IN THE
// REQUEST, SAFE GATE SO YOU CAN'T DO POST api/projects/1/actions/23
// IF ACTION_ID: 23 BELONGS TO Project_ID: 2
const {
  projectExists,
  validateProjectId,
  validateAction
} = require("../middleware/middleware");

const Actions = require("../data/helpers/actionModel");


//GET REQUESTS
router.get("/:actionID", projectExists, validateProjectId, (req, res) => {
  Actions.get(req.params.actionID)
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        errorMessage: "The actions list could not be retrieved."
      });
    });
});
//POST REQUESTS
router.post("/", projectExists, validateAction, (req, res) => {
  Actions.insert({
    description: req.body.description,
    notes: req.body.notes,
    project_id: req.params.id,
    completed: req.body.completed
  })
    .then(action => {
      res.status(201).json(action);
    })
    .catch(err => {
      res.status(500).json({
        errorMessage:
          "Could not add action. This might mean the Project doesn't exist"
      });
    });
});

//DELETE REQUESTS
router.delete("/:actionID", projectExists, validateProjectId, (req, res) => {
  Actions.remove(req.params.actionID)
    .then(action => {
      if (action) {
        res.status(200).json({
          message: `Action ${req.params.actionID} was successfully deleted`,
          deletedID: parseInt(req.params.actionID)
        });
      } else {
        res.status(400).json({
          message: "This action doesn not exist"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "error deleting action"
      });
    });
});

//PUT REQUEST CHANGING THE ACTION BY ACTION ID
router.put("/:actionID", projectExists, validateProjectId, validateAction, (req, res) => {
  Actions.update(req.params.actionID, req.body)
    .then(project => {
      console.log(res);
      res.status(200).json({
        message: `Action ${req.params.actionID} was successfully updated`
      });
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "There was an error updating the action"
      });
    });
});

module.exports = router;
