const Category = require("../database/models/Category")

module.exports = (req, res) => {

const newCategory = new Category({ title: req.body.title}); 
   
newCategory
.save(function (error) {
        if (!error) {
          res.redirect("/articles/add");
        } else {
          res.send(error);
        }

})
}

      
    