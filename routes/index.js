const router = require("express").Router();
const v1Routes = require('./v1')

// Version One API Routes
// =============================================================
router.use('/v1', v1Routes);

module.exports = router;
