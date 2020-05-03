
const Category = require("../database/models/Category")


module.exports = (req,res) => {

    
        if(req.session.userId) {
          Category.find((error, category) => {
              if(!error){
                  res.render("articles/category", {category})
              }else{
                  res.redirect("/user/login")
              }
               
          })
        
    }
    
    
    
    

}