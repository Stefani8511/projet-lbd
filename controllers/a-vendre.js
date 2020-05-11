module.exports = (req,res) => {

    const vente = status('a-vendre')
    res.render("gallery", {vente})
}