const Product = require("../database/models/Article")


module.exports = async (req, res) => {

    const decoration = await Product
    .find({category:"5e9f0b06ae267f7d9a34f62c"},
     function(error, article) {
        if(!error){
            res.render("decoration", {decoration:article})
        }else{
            res.send(error)
        }
    }
 )
    .sort({_id: -1})  
    
    
}
