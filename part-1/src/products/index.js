const {Router} = require("express");
const {ProductsController} = require("./products.controller");

const router = Router();
router.post("/", ProductsController.post);

module.exports = router;