import { createSlice } from "@reduxjs/toolkit"

const initialState={
    searchM:"",
    categoryM:"all"
}

export const mangasFilterReducer = createSlice(
    {
        name:"manga",
        initialState,
        reducers:{
            search:(state,action)=>{
                const {searchM} = action.payload
                state.searchM = searchM
                
            },
            category:(state,action)=>{
                const {categoryM} = action.payload
                state.categoryM = categoryM
            }
            
        }
    }
)

export const {category,search} = mangasFilterReducer.actions
export default mangasFilterReducer.reducer