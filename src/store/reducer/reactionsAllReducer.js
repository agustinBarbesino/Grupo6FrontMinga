import { createReducer } from "@reduxjs/toolkit";
import { reactionsAll } from "../actions/reactionsAllActions";

const initialState={
    reactions:[],
    loading:true,
    error:false
}

 const reactionsAllReducer = createReducer(initialState,(builder) => {
    builder.addCase(reactionsAll.fulfilled,(state,action)=>{
        
        console.log("Se ejecuto correctamente");  
        state.loading = false,
        state.error = false
        state.reactions = action.payload
    })
    .addCase(reactionsAll.pending,(state,action)=>{
        console.log("cargando...");
        console.log(action);
        state.loading = true,
        state.error = false
    })
    .addCase(reactionsAll.rejected,(state,action)=>{
        console.log("Error",action.error.message);
        state.loading = false,
        state.error = action.error.message
    })

})

export default reactionsAllReducer;