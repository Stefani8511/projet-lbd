
const Product = require("../database/models/Article")


module.exports = async (req, res) => {

    const ameublement = await Product
    .find({category:"5e9f0a7e554b227d41eeac34"},
    function(error, article){
        if(!error){
            res.render("ameublement", {ameublement:article})
        }else{
            res.send(error)
        }
    })
    .sort({_id: -1})    
    
}
