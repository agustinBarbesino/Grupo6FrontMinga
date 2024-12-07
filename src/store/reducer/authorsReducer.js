import { createReducer } from "@reduxjs/toolkit";
import { AuthorsFetch } from "../actions/authorsActions";

const initialState={
    authores:[],
    loading:true,
    error:false
}

 const authorsReducer = createReducer(initialState,(builder) => {
    builder.addCase(AuthorsFetch.fulfilled,(state,action)=>{
        
        console.log("Se ejecuto correctamente AUTHOORS");
        
        state.authores = action.payload
        state.loading = false
        state.error = false
        
        
    })
    .addCase(AuthorsFetch.pending,(state,action)=>{
        console.log("cargando...");
        console.log(action);
        state.loading = true,
        state.error = false
    })
    .addCase(AuthorsFetch.rejected,(state,action)=>{
        console.log("Error",action.error.message);
        state.loading = false,
        state.error = action.error.message
    })

})

export default authorsReducer;