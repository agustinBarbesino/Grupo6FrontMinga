import { createReducer } from "@reduxjs/toolkit";
import { MangasFetch } from "../actions/mangasActions";

const initialState={
    mangas:[],
    category:"All",
    search:"",
    loading:true,
    error:false
}

 const mangasReducer = createReducer(initialState,(builder) => {
    builder.addCase(MangasFetch.fulfilled,(state,action)=>{
        
        console.log("Se ejecuto correctamente");
       
        
        
        state.loading = false,
        state.error = false
        state.mangas = action.payload
    })
    .addCase(MangasFetch.pending,(state,action)=>{
        console.log("cargando...");
        console.log(action);
        state.loading = true,
        state.error = false
    })
    .addCase(MangasFetch.rejected,(state,action)=>{
        console.log("Error",action.error.message);
        state.loading = false,
        state.error = action.error.message
    })

})

export default mangasReducer;