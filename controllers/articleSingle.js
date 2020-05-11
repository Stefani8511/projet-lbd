
const    Product = require("../database/models/Article")

module.exports = async (req, res) => {

    const article = await Product.findById({_id:req.params.id})
       
    res.render("articleSingle", {article})
}