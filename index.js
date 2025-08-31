const express = require('express')
const routes = require('./routes/route')
const { default: mongoose } = require('mongoose')
const PORT = process.env.PORT
const url = process.env.url
const app = express()

app.use('view engine', 'ejs')
app.use('/api/home', (req, res)=>{

    res.render('home')
})
app.use('/api/home/', routes)

app.use(express.json())
app.use(express.urlencoded({extended: true}))

mongoose.connect(url,()=>{
    console.log("MONGO CONNECTED")    
})
.catch((e)=>{
    console.log("MONGO NOT CONNECTED", e)
})

app.listen(PORT, (req, res)=>{
    console.log("SERVER STARTED");
    
})