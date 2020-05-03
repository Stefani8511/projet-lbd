const Category = require("../database/models/Category")

module.exports = async(req, res) => {

    const category = await Category.findById({_id:req.params.id})

    category.deleteOne({_id: req.params.id}, function (error){

        if(!error){
             res.redirect("/articles/category")
        }else {
            res.send(error);
          }

    })
   
}