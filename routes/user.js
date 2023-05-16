const express = require("express");

const auth = require("../middleware/auth")
const userController = require("../controllers/user");

const router = express.Router();

router.get("/",auth, userController.getAll);

router.get('/unassigned',auth, userController.getUnassigned)

router.get("/:id",auth, userController.getOne);

router.post("/login", userController.login)

router.post("/register", userController.register)

router.delete("/:id",auth, userController.deleteOne);

router.put("/",auth, userController.updateOne)

module.exports = router;
