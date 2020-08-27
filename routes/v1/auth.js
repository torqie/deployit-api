const express = require("express");
const router = express.Router();

// Controllers
// =============================================================
const authController = require('../../controllers/v1/auth.controller');

router.post( '/register', authController.register);
router.get("/login", authController.login);

module.exports = router;