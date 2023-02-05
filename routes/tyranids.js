const router = require("express").Router();
const model = require("../models/tyranidsModel");

router.get("/", model.getAll);
router.post("/add", model.addList);

module.exports = router;