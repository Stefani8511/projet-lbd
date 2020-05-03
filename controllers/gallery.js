const Product = require("../database/models/Article")


module.exports = async (req, res) => {

   
    const articles = await Product
    .find(function(error, article){
        if(!error){
            res.render("gallery", {articles:article})
        }else{
            res.send(error)
        }
    })
    .sort({_id: -1})
    .limit(20)
    // .skip(10)
       
    
}
