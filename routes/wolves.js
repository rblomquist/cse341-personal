const router = require("express").Router();
const model = require("../models/wolvesModel");

router.get("/", model.getAll);
router.get("/:id", model.getSingle);
router.post("/add", model.addList);
router.delete("/delete/:id", model.deleteList);
router.put("/update/:id", model.updateList);

module.exports = router;