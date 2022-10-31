const express = require("express");
const router = express.Router();

const cartControl = require("../controller/cart");

router.get("/", cartControl.findAll);
router.post("/:id", cartControl.create);
router.get("/:id", cartControl.findOne);
router.put('/:id',cartControl.addProduct)
router.put("/:id", cartControl.update);
router.delete("/:id", cartControl.delete);

module.exports = router;

//Assign :- Post(userId, description and comment), User(username, password), Comment(userid and comment)
// Create read, update and comment where you can view user and their comment on a post