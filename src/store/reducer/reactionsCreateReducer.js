import { createReducer } from "@reduxjs/toolkit";
import { reactionsCreate } from "../actions/reactionsCreateActions";

const initialState={
    data:{},
    loading:true,
    error:false
}

 const reactionsCreateReducer = createReducer(initialState,(builder) => {
    builder.addCase( reactionsCreate.fulfilled,(state,action)=>{
        
        console.log("Se ejecuto correctamente");
       
        
        
        state.loading = false,
        state.error = false
        state.data = action.payload
    })
    .addCase( reactionsCreate.pending,(state,action)=>{
        console.log("cargando...");
        console.log(action);
        state.loading = true,
        state.error = false
    })
    .addCase( reactionsCreate.rejected,(state,action)=>{
        console.log("Error",action.error.message);
        state.loading = false,
        state.error = action.error.message
    })

})

export default reactionsCreateReducer;