const recipes = require('../models/recipemodel')

//Upload Recipe
exports.uploadRecipe = async(req,res)=>{
    const{recipeName,ingredients,instructions,prepTime,cookTime,difficulty,cuisine,calories,rating,MealType} = req.body
    try {
        const existingRecipe = await recipes.findOne({recipeName})
        if(existingRecipe){
            res.status(406).json("Recipe already available")
        }else{
            const recipe = new recipes({
                recipeName,ingredients,instructions,prepTime,cookTime,difficulty,cuisine,calories,image:req.file.filename,rating,MealType
            })
            await recipe.save()
            res.status(200).json("Recipe added Successfully")
        }
    } catch (error) {
        res.status(500).json("Server error:",error)
    }
}



// Get All recipes
exports.getallRecipes = async(req,res)=>{
    try {
        const Allrecipes = await recipes.find()
        res.status(200).json(Allrecipes)
    } catch (error) {
        res.status(500).json("error fetching recipes")
    }
}


//Get A Single Recipe
exports.getSingleRecipe = async(req,res)=>{
    const {recipeId} = req.params
    try {
        const recipe = await recipes.findById(recipeId)
        if(!recipe){
            res.status(404).json({messege:"Recipe Not Found"})
        }else{
            res.status(200).json(recipe)
        }
    } catch (error) {
        res.status(500).json({messege:"Internal Server Error:",error})
    }
}



//Delete A Recipe
exports.deleteRecipe = async (req,res)=>{
    const {recipeId} = req.params
    
    try {
        const deletedRecipe = await recipes.findByIdAndDelete(recipeId)
        if(!deletedRecipe){
           return res.status(404).json({messege:'No recipe of the ID were found'})
        }
        res.status(200).json(deletedRecipe)
    } catch (error) {
        res.status(500).json({messege:'failed to delete recipe'})
    }
}



//Edit A Recipe
exports.editRecipe = async (req,res)=>{
    const {Rid} = req.params
    const {recipeName,ingredients,instructions,prepTime,cookTime,difficulty,cuisine,calories,image,rating,MealType} = req.body
    const newImage = req.file?req.file.filename : image

    try {
        const updatedRecipe = await recipes.findByIdAndUpdate({_id:Rid},{
            recipeName,
            ingredients,
            instructions,
            prepTime,
            cookTime,
            difficulty,
            cuisine,
            calories,
            image : newImage,
            rating,
            MealType
        },{new:true})
        if(!updatedRecipe){
            res.status(404).json({messege:"Unable to find recipe Id"})
        }
        await updatedRecipe.save()
        res.status(200).json(updatedRecipe)
    } catch (error) {
        res.status(500).json({messege:'Server error',error})
    }
}
