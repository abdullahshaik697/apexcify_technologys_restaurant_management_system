
const OrderModel = require('../models/Order');
const TableModel = require('../models/Table');
const MenuItemModel = require('../models/MenuItem');


// Show all orders
// Show all orders
const showOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find()
      .populate("tableNumber", "tableNumber")
      .populate("items.menuItemId", "name price")
      .sort({ createdAt: -1 }); // 👈 Latest order first

    res.render("orders", { orders });
  } catch (error) {
    console.log(error); 
    res.status(500).send("Error loading orders");
  }
};

// Show order page
const showOrderPage = async (req, res) => {
  try {
    const menuItems = await MenuItemModel.find({ availability: "Available"}); // sirf available items dikhao
    const tables = await TableModel.find().sort({ tableNumber: 1 });
    
    res.render("order", { menuItems: menuItems, tables: tables });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error loading order page");
  }
};
const placeOrder = async (req, res) => {
  try {
    const { tableNumber, items } = req.body;

    // Filter items jahan quantity > 0
    const filteredItems = Object.values(items).filter(
      (item) => item.quantity && item.quantity > 0
    );

    if (filteredItems.length === 0) {
      return res.status(400).send("Please select at least 1 item with quantity");
    }
    const table = await TableModel.findOne({ tableNumber: Number(tableNumber) });
    if (!table) return res.status(404).send("Table not found");
    
    // Agar table already occupied hai
    if (table.isAvailable === "not available") {
      return res.status(400).send("This table is already occupied");
    }

    // Calculate total
    let totalAmount = 0;
    for (let item of filteredItems) {
      const menuItem = await MenuItemModel.findById(item.menuItemId);
      if (!menuItem) return res.status(404).send("Menu Item not found");

      totalAmount += menuItem.price * item.quantity;
    }

    // Create order
    const newOrder = new OrderModel({     
      tableNumber: Number(tableNumber),  // ✅ Number ensure
      items: filteredItems,
      totalAmount,
    });
    await newOrder.save();
    

    // Mark table not available 🚨
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


// Cancel Order
const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await OrderModel.findById(id);
    if (!order) return res.status(404).send("Order not found");

    order.status = "cancelled";
    await order.save();

    // Free the table 🚨
    const table = await TableModel.findOne({ tableNumber: order.tableNumber });
    if (table) {
      table.isAvailable = "available";
      await table.save();
    }

    res.redirect("/api/home/orders");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error cancelling order");
  }
};

// Complete Order
const completeOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await OrderModel.findById(id);
    if (!order) return res.status(404).send("Order not found");

    order.status = "completed";
    await order.save();

    // Free the table 🚨
    const table = await TableModel.findOne({ tableNumber: order.tableNumber });
    if (table) {
      table.isAvailable = "available";
      await table.save();
    }

    res.redirect("/api/home/orders");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error completing order");
  }
};
module.exports = {
        showOrders,
  showOrderPage,
  placeOrder,
  serveOrder,
  completeOrder,
  cancelOrder
};
