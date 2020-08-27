const router = require("express").Router();
const passport = require("passport");

const authRoutes = require('./auth')
const userRoutes = require('./users')


/* GET home page. */
router.use('/auth', authRoutes);
router.use('/users', userRoutes);

module.exports = router;