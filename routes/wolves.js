const router = require("express").Router();
const model = require("../models/wolvesModel");
const { requiresAuth } = require('express-openid-connect');

router.get("/", model.getAll);
router.get("/:id", model.getSingle);
router.post("/add",requiresAuth(), model.addList);
router.delete("/delete/:id", requiresAuth(), model.deleteList);
router.put("/update/:id", requiresAuth(), model.updateList);

module.exports = router;