
const MenuItemModel = require('../models/MenuItem')

const addMenuItem = async (req, res) => {
        try {

        const {name, description, price , availability} = req.body
        const newMenuItem = new MenuItemModel({name, description, price , availability})  
        await newMenuItem.save()

        res.redirect('/api/home/menu')
                
        } catch (error) {
              console.log('Add Menu Item Error: ', error );
                
        }
} 
const updateMenuItem = async (req, res) => {

        try {

                const {name, description, price , availability} = req.body
                const { id } = req.params
                await MenuItemModel.findByIdAndUpdate(id, {name, description, price , availability})
                res.status(201).redirect('/api/home/menu');
                        
                } catch (error) {
                     console.log("Update Menu Item Error: ", error);
                        
                }
}
const deleteMenuItem = async (req, res) => {

        try {
        const { id } = req.params
        await MenuItemModel.findByIdAndDelete(id)
        res.redirect('/api/home/menu')
                
        } catch (error) {
             console.log("Delete Menu Item Error: ", error);
                
        }
}
const showMenuItems = async (req, res) => {

        try {
       const menuItems = await MenuItemModel.find()
       res.render("menu", {menuItems: menuItems})

        
       } catch (error) {
        console.log("Add Menu Items Error: ", error);
        
       }
        
}


module.exports =  {
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        showMenuItems
}
