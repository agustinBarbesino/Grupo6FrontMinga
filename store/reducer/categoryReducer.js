import { createReducer } from "@reduxjs/toolkit";
import { Categories } from "../actions/categoryActions";

const initialState={
    categories:[],
    category:"All",
    search:"",
    loading:true,
    error:false
}

 const categoryReducer = createReducer(initialState,(builder) => {
    builder.addCase(Categories.fulfilled,(state,action)=>{
        
        console.log("Se ejecuto correctamente");
       
        
        
        state.loading = false,
        state.error = false
        state.categories = action.payload
    })
    .addCase(Categories.pending,(state,action)=>{
        console.log("cargando...");
        console.log(action);
        state.loading = true,
        state.error = false
    })
    .addCase(Categories.rejected,(state,action)=>{
        console.log("Error",action.error.message);
        state.loading = false,
        state.error = action.error.message
    })

})

export default categoryReducer;