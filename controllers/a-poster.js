const Product = require("../database/models/Article")

module.exports = (req,res) => {

    const poster = status('a-poster')
    res.render("gallery", {poster})
}