const express = require('express')
const usercontroller = require('../controllers/usercontroller')
const recipeController = require('../controllers/recipeController')
const multerMiddleware = require('../middlewares/multer')
const favoritesController = require('../controllers/favoritesController')
const JWTMiddleware = require('../middlewares/jwtMiddleware')



const router = new express.Router()


// Register user
router.post('/register',usercontroller.registerUser)

//login user
router.post('/login',usercontroller.loginUser)


// -----------------------------------------------------------------------------------------------

//Admin Login
router.post('/admin',usercontroller.adminLogin)

// Admin add recipes
router.post('/add-recipe',JWTMiddleware,multerMiddleware.single("image"),recipeController.uploadRecipe)

//getall recipes
router.get('/get-recipes',recipeController.getallRecipes)

//Get Single Recipe
router.get('/single-recipe/:recipeId',recipeController.getSingleRecipe)

//Admin delete Recipe
router.delete('/recipe/:recipeId',JWTMiddleware,recipeController.deleteRecipe)

router.put('/edit/:Rid',JWTMiddleware,multerMiddleware.single("image"),recipeController.editRecipe)


// ------------------------------------------------------------------------------------------------
// add to favorites
router.post('/add-to-fav',favoritesController.addToFav)

// get all favourites
router.get('/favorites/:userId',favoritesController.getFavorites)


//remove from favorites
router.delete('/remove/:recipeId',favoritesController.deleteFavRecipe)


module.exports = router