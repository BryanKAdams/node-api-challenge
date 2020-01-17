const express = require("express");

//PARAMS DOESN'T GET PASSED DOWN UNLESS U LINK THEM

//https://stackoverflow.com/questions/25260818/rest-with-express-js-nested-router
const router = express.Router({
  mergeParams: true
});

const Actions = require("../data/helpers/actionModel");

//GET REQUESTS
router.get("/:actionID", (req, res) => {
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
router.post("/", (req, res) => {
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
router.delete("/:actionID", (req, res) => {
  Actions.remove(req.params.actionID)
    .then(action => {
      res.status(200).json({
        message: `Action ${req.params.actionID} was successfully deleted`,
        deletedID: parseInt(req.params.actionID)
      });
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "error deleting action"
      });
    });
});

module.exports = router;
