const express = require('express')
const routes = require('./routes/route')

const app = express()

app.use('view engine', 'ejs')
app.use('/api/', routes)


app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.listen(PORT, (req, res)=>{

})