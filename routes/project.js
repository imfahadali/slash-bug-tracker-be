const express = require("express");

const auth = require("../middleware/auth")
const projectController = require("../controllers/project");

const router = express.Router();

router.get("/",auth, projectController.getAll);

router.post("/",auth, projectController.createOne);

router.get("/:id",auth, projectController.getOne);

router.put("/:id",auth, projectController.updateOne);

router.delete('/',auth, projectController.deleteAll)

router.delete("/:id",auth, projectController.deleteOne);

module.exports = router;