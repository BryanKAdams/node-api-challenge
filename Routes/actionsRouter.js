const express = require("express");

const router = express.Router();

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

module.exports = router;
