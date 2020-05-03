const mongoose = require('mongoose')
var handlebars = require('handlebars');
handlebars.registerHelper('moment', require('helper-moment'));

const ArticleSchema = new mongoose.Schema ({

    title : String, 
    category: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
    content: String,   
    price: Number,   
    image: String ,
    createDate: {
        type: Date,
        default: new Date()
              
    },
    typecat:{ type: mongoose.Schema.Types.ObjectId, ref: "typecat" },

})

const Article = mongoose.model('Article', ArticleSchema)


module.exports = Article
