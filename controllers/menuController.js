
const MenuItemModel = require('../models/MenuItem')

const addMenuItem = async (req, res) => {
        try {

        const {name, description, price , availability} = req.body
        const newMenuItem = new MenuItemModel({name, description, price , availability})  
        await newMenuItem.save()

        res.render('menu')
                
        } catch (error) {
              console.log('Add Menu Item Error: ', error );
                
        }
}
const updateMenuItem = (req, res) => {

}
const deleteMenuItem = (req, res) => {

}
const showMenuItems = (req, res) => {

        
        res.render("menu") 
        
}


module.exports =  {
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        showMenuItems
}
