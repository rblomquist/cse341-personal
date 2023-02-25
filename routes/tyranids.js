const router = require("express").Router();
const model = require("../models/tyranidsModel");
const validation = require("../helper/validation-middleware")
const { requiresAuth } = require('express-openid-connect');


router.get("/", model.getAll);
router.get("/:id", model.getSingle);
router.post("/add", requiresAuth(), validation.validate, model.addList);
router.delete("/delete/:id", requiresAuth(), model.deleteList);
router.put("/update/:id", requiresAuth(), validation.validate, model.updateList);

module.exports = router;