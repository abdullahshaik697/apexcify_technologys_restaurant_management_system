
const TableModel = require("../models/Table")


const showTables = async (req, res) => {

        try {
                const allTables = await TableModel.find()
                res.render("tables", { allTables: allTables })

        } catch (error) {
console.log(error);

        }

}
const occupyTable = async (req, res) => {
        try {
                const { id } = req.params
                await TableModel.findByIdAndUpdate(id,{
                        status: "occupied"
                })
                
                res.redirect("/api/home/tables")


        } catch (error) {
        console.log(error);
 
        }
}
const completeTable = async (req, res) => {
        try {
                const { id } = req.params
                await TableModel.findByIdAndUpdate(id,{
                        status: "available",
                        reservedBy:null,
                        reservedAt: null
                })
                
                res.redirect("/api/home/tables")

        } catch (error) {
        console.log(error);

        }
}
const reserveTable = async (req, res) => {
        try {
                const { id } = req.params
                const { reservedBy } = req.body
                await TableModel.findByIdAndUpdate(id,{
                        status: "reserved",
                        reservedBy: reservedBy,
                        reservedAt: reservedAt
                })
                
                res.redirect("/api/home/tables")


        } catch (error) {
        console.log(error);

        }
}


module.exports = {
        occupyTable,
        completeTable,
        reserveTable,
        showTables
}
