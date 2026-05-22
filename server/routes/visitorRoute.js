const router = require("express").Router();
const visitorCtrl = require("../controllers/visitorCtrl");
const auth = require("../middlewares/auth");

router.post("/visitor/track", visitorCtrl.trackVisit);
router.get("/visitor", auth, visitorCtrl.getVisitors);

module.exports = router;