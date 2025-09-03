const homeRoute = (req, res) =>{

    try {
        
        res.render('home')
        

    } catch (error) {
        console.log("Home Error: ", error);
        
    }


}

module.exports = homeRoute