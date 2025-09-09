const express = require("express");
const {
  showOrderPage,
  placeOrder,
} = require("../controllers/orderController");

const router = express.Router();

router.get("/", showOrderPage);
router.post("/", placeOrder);

module.exports = router;
