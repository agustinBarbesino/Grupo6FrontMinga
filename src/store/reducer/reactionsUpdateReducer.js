import { createReducer } from "@reduxjs/toolkit";
import { reactionsUpdate } from "../actions/reactionsUpdateActions.js";

const initialState={
    data:{},
    loading:true,
    error:false
}

 const reactionsUpdateReducer = createReducer(initialState,(builder) => {
    builder.addCase( reactionsUpdate.fulfilled,(state,action)=>{
        
        console.log("Se ejecuto correctamente");
       
        
        
        state.loading = false,
        state.error = false
        state.data = action.payload
    })
    .addCase( reactionsUpdate.pending,(state,action)=>{
        console.log("cargando...");
        console.log(action);
        state.loading = true,
        state.error = false
    })
    .addCase( reactionsUpdate.rejected,(state,action)=>{
        console.log("Error",action.error.message);
        state.loading = false,
        state.error = action.error.message
    })

})

export default reactionsUpdateReducer;