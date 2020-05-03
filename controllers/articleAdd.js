const Category = require("../database/models/Category")


module.exports = (req,res) => {
    if(req.session.userId) {
      
        Category.find((error, category) => {
            if(!error){
                return res.render("articles/add", {category:category})
            }else{
                res.redirect("/user/login")
            }
            
        })
               
            } 
            
        }
        
    
    
        