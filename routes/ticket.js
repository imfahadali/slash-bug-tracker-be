const express = require("express");

const auth = require("../middleware/auth")
const ticketController = require("../controllers/ticket");

const router = express.Router();


router.get("/",auth, ticketController.getAll);

router.get("/:id",auth, ticketController.getOne);

router.post("/",auth, ticketController.createOne);

// router.post("/", ticketController.createOne);


// router.delete("/:id",auth, ticketController.deleteOne);

module.exports = router;
