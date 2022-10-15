const router = require("express").Router();
const Tasks = require("../controller/task.controller");

router.get("/", Tasks.home);

router.get("/add", Tasks.add);
router.post("/addTask", Tasks.addTask);

router.get("/delete/:id", Tasks.delete);

router.get("/edit/:id", Tasks.edit);
router.post("/editTask/:id", Tasks.editTask);

router.get("/show/:id", Tasks.show);

module.exports = router;
