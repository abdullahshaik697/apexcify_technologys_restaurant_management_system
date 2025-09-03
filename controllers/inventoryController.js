const InventoryModel = require("../models/Inventory")

const addInventoryItem = async (req, res) => {

        try {
                const { itemName, quantity, unit, threshold } = req.body
                const newInventoryItem = new InventoryModel({ itemName, quantity, unit, threshold })
                await newInventoryItem.save()

                res.redirect('/api/home/inventory')

        } catch (error) {

                console.log("Add Inventory Item Error: ", error);

        }
}
const updateInventoryItem = async (req, res) => {

        try {
                const { itemName, quantity, unit, threshold } = req.body;
                const { id } = req.params
                await InventoryModel.findByIdAndUpdate(id, { itemName, quantity, unit, threshold })
                res.redirect('/api/home/inventory')

        } catch (error) {
                console.log("Update Inventory Item Error: ", error);
        }
}
const deleteInventoryItem = async (req, res) => {
        try {
                const { id } = req.params
                await InventoryModel.findByIdAndDelete(id)
                res.redirect('/api/home/inventory')

        } catch (error) {
                console.log("Update Inventory Item Error: ", error);
        }

}
const showInventoryItems = async (req, res) => {

        try {
                const items = await InventoryModel.find()
                res.render("inventory", { items: items })
        } catch (error) {
                console.log("Show INventory Items: ", error);

        }

}


module.exports = {
        addInventoryItem,
        updateInventoryItem,
        deleteInventoryItem,
        showInventoryItems
}
