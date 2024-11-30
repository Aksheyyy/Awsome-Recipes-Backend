const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    recipeName:{
        type : String,
        required : true,
        unique : true
    },
    ingredients:{
        type : String,
        required : true
    },
    instructions:{
        type: String,
        required: true
    },
    prepTime:{
        type:Number,
        required: true
    },
    cookTime:{
        type: Number,
        required: true
    },
    difficulty:{
        type: String,
        required:true
    },
    cuisine:{
        type: String,
        required:true
    },
    calories:{
        type : Number,
        required:true
    },
    image:{
        type : String,
        required : true
    },
    rating:{
        type: Number    
    },
    MealType:{
        type: String,
        required: true
    }
})

const recipes = mongoose.model("recipes",recipeSchema)
module.exports = recipes