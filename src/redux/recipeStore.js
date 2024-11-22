import { configureStore } from "@reduxjs/toolkit";
import recipeSlice from "./Slices/recipeSlice"


const recipeStore = configureStore({
    reducer:{
        recipeReducer : recipeSlice,
    }
})

export default recipeStore