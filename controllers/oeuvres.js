const Product = require("../database/models/Article")


module.exports = async (req, res) => {

    const oeuvres = await Product
    .find({category:"5ea04967eb89b14ac4aec9fb"}, 
    function(error, article){
        if(!error){
            res.render("oeuvres", {oeuvres: article})
        }else{
            res.send(error)
        }
    })
    .sort({_id: -1})  
   
}


