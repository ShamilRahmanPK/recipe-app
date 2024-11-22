import { createAsyncThunk, createSlice, isFulfilled } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRecipe = createAsyncThunk("recipe/fetchRecipe",async()=>{
    const result = await axios.get("https://dummyjson.com/recipes")
    console.log(result.data.recipes);

    // sessionStorage.setItem("allRecipes",JSON.stringify(result.data.recipes))
    sessionStorage.setItem("allRecipe",JSON.stringify(result.data.recipes))

    return result.data.recipes
    
})


const recipeSlice = createSlice({
    name:'recipe',
    initialState:{
        allRecipes:[],
        dummyAllRecipes:[],
        loading:false,
        errorMsg:""
    },
    reducers:{
        searchRecipe : (state,actionByHeader)=>{
            state.allRecipes = state.dummyAllRecipes.filter(item=>item.cuisine.toLowerCase().includes(actionByHeader.payload))
        }

    },
    extraReducers:(builder)=>{
            builder.addCase(fetchRecipe.fulfilled,(state,apiResult)=>{
                state.allRecipes = apiResult.payload
                state.dummyAllRecipes = apiResult.payload
                state.loading = false
                state.errorMsg = ""
            })
            builder.addCase(fetchRecipe.pending,(state)=>{
                state.allRecipes = []
                state.dummyAllRecipes = []
                state.loading = true
                state.errorMsg = ""
            })
            builder.addCase(fetchRecipe.rejected,(state)=>{
                state.allRecipes = []
                state.dummyAllRecipes = []
                state.loading = false
                state.errorMsg = "API call failed"
            })
    }
})


export const {searchRecipe} = recipeSlice.actions
export default recipeSlice.reducer