const express = require('express')
const dotenv = require('dotenv')
const mongoose  = require('mongoose')
const homeRoute = require('./controllers/homeController')
dotenv.config()

const reservationsRouter = require('./routes/reservationsRoute')
const tableRouter = require('./routes/tableRoute')
const menuRouter = require('./routes/menuRoute')
const ordersRouter = require('./routes/ordersRoute')
const inventoryRouter = require('./routes/inventoryRoute')


const PORT = process.env.PORT
const url = process.env.url
const app = express()

app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/api/home', homeRoute)
app.use('/api/home/reservations', reservationsRouter)
app.use('/api/home/tables', tableRouter)
app.use('/api/home/menu', menuRouter)
app.use('/api/home/orders', ordersRouter)
app.use('/api/home/inventory', inventoryRouter)


const connectDB = async () => {
    try {
      await mongoose.connect(url);
      console.log("MONGO CONNECTED");
    } catch (e) {
      console.log("MONGO NOT CONNECTED", e);
    }
  }

connectDB();
  

app.listen(PORT, (req, res)=>{
    console.log("SERVER STARTED");
  
})