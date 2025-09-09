
const OrderModel = require('../models/Order');
const TableModel = require('../models/Table');
const MenuItemModel = require('../models/MenuItem');


// Show all orders
const showOrders = async (req, res) => {
        try {
          const orders = await OrderModel.find()
            .populate("tableNumber", "tableNumber")
            .populate("items.menuItemId", "name price")
            .sort({ createdAt: -1 });
      
          res.render("orders", { orders });
        } catch (error) {
          console.log(error);
          res.status(500).send("Error loading orders");
        }
      };

// Show order page
const showOrderPage = async (req, res) => {
  try {
    const menuItems = await MenuItemModel.find({ availability: "available" }); // sirf available items dikhao
    const tables = await TableModel.find();
    res.render("order", { menuItems, tables });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error loading order page");
  }
};

// Place order
const placeOrder = async (req, res) => {
  try {
    const { tableNumber, items } = req.body;

    // Find Table
    const table = await TableModel.findById(tableNumber);
    if (!table) return res.status(404).send("Table not found");

    // Calculate total
    let totalAmount = 0;
    for (let item of items) {
      const menuItem = await MenuItemModel.findById(item.menuItemId);
      if (!menuItem) return res.status(404).send("Menu Item not found");

      totalAmount += menuItem.price * item.quantity;
    }

    // Create order
    const newOrder = new OrderModel({
      tableNumber,
      items,
      totalAmount
    });
    await newOrder.save();

    // Mark table not available
    table.isAvailable = "not available";
    await table.save();

    res.redirect("/api/home/orders");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error placing order");
  }
};


// Serve order
const serveOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await OrderModel.findByIdAndUpdate(id, { status: "served" });
    res.redirect("/api/home/orders");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error serving order");
  }
};

// Complete order
const completeOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await OrderModel.findById(id);
    if (!order) return res.status(404).send("Order not found");

    order.status = "completed";
    await order.save();

    // Free the table
    const table = await TableModel.findById(order.tableNumber);
    if (table) {
      table.isAvailable = "available";
      await table.save();
    }

    res.redirect("/api/home/orders");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error completing order");
  }
};

module.exports = {
        showOrders,
  showOrderPage,
  placeOrder,
  serveOrder,
  completeOrder,
};
