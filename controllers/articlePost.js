const    path = require ("path")
const    Product = require("../database/models/Article")


///////////////////////////////////////////////////////////////////////
module.exports = (req, res) => {
 
    
    const { image } = req.files;
    const uploadFile = path.resolve(__dirname,'..',  "public/uploads", image.name);

    image.mv(uploadFile, (error) => {
     Product.create(
         {
             ...req.body,
             image: `uploads/${image.name}`
         },    
             (error, product) => {
        res.render("gallery");
    })
    
    console.log(req.files);
    console.log(req.body);
    
   
})
}