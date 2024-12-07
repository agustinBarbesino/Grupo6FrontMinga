import { createReducer } from "@reduxjs/toolkit";
import { reactionsDelete } from "../actions/reactionsDeleteActions.js";

const initialState={
    data:{},
    loading:true,
    error:false
}

 const reactionsDeleteReducer = createReducer(initialState,(builder) => {
    builder.addCase(reactionsDelete.fulfilled,(state,action)=>{
        
        console.log("Se ejecuto correctamente");
       
        
        
        state.loading = false,
        state.error = false
        state.data = action.payload
    })
    .addCase(reactionsDelete.pending,(state,action)=>{
        console.log("cargando...");
        console.log(action);
        state.loading = true,
        state.error = false
    })
    .addCase(reactionsDelete.rejected,(state,action)=>{
        console.log("Error",action.error.message);
        state.loading = false,
        state.error = action.error.message
    })

})

export default reactionsDeleteReducer;