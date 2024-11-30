const mongoose = require('mongoose')


const favoriteSchema = new mongoose.Schema({
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    },
    recipeId:{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'recipes',
        required:true
    }
})

const favorites = mongoose.model("favorites",favoriteSchema)
module.exports = favorites