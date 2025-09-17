const express = require("express");
const {
  showOrders,
  serveOrder,
  completeOrder,
  cancelOrder
} = require("../controllers/orderController");

const router = express.Router();

router.get("/", showOrders);
router.post("/complete/:id", completeOrder);
router.post("/cancel/:id", cancelOrder);
router.post("/serve/:id", serveOrder);

module.exports = router;
