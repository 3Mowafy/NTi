const router = require("express").Router();
const cust = require("../controller/cust.controller");

router.get("/", cust.home);
router.get("/add", cust.add);
router.get("/addCust", cust.addCust);
router.get("/single/:id", cust.show);
router.get("/addBalance/:id", cust.addBalance);
router.post("/addLogic/:id", cust.addLogic);
router.get("/remain/:id", cust.remainBalance);
router.post("/remainLogic/:id", cust.remainLogic);

module.exports = router;
