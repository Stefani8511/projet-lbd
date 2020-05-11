module.exports = (req,res) => {

    const ventpost = status('a-vendre-poster')
    res.render("gallery", {ventpost})
}