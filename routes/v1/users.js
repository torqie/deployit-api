const express = require("express");
const router = express.Router();
const passport = require("passport");

// Controllers
// =============================================================
const usersController = require('../../controllers/v1/users.controller');

router.get("/", passport.authenticate("jwt", {session: false}), usersController.all);
router.get("/:id", passport.authenticate("jwt", {session: false}), usersController.find)

module.exports = router;