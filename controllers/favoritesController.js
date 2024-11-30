const favorites = require('../models/favoritesmodel')


exports.addToFav = async (req, res) => {
    const { userId, recipeId } = req.body;

    
    try {
        // Check if the recipe is already in favorites
        const existingRecipe = await favorites.findOne({ userId, recipeId });
        if (existingRecipe) {
            return res.status(400).json({ message: "Item already in favorites" });
        }

        // Add a new favorite
        const newFavorite = new favorites({ userId, recipeId });
        await newFavorite.save();

        res.status(201).json({ message: "Recipe added to favorites" });
    } catch (error) {
        console.error("Error adding to favorites:", error);
        res.status(500).json({ message: "Error adding to favorites", error: error.message });
    }
};


exports.getFavorites = async(req,res)=>{
    const {userId} = req.params
    try {
        const Allfavorites = await favorites.find({userId}).populate('recipeId')
        res.status(201).json(Allfavorites)
    } catch (error) {
        res.status(500).json({messege:"Couldn't get recipes"})
    }
}

exports.deleteFavRecipe = async(req,res)=>{

    const { recipeId } = req.params
   
    try {
        const removedFromFav = await favorites.findByIdAndDelete(recipeId)
        if (!removedFromFav) {
            return res.status(404).json({ message: 'Recipe not found in favorites' });
        }
        res.status(200).json(removedFromFav);
    } catch (error) {
        res.status(500).json({message:'Error deleting recipe'})
    }
}