import { createReducer } from "@reduxjs/toolkit";
import { ChapterFetch } from "../actions/mangaActions";
const initialState={
    chapters:"All",
    loading:true,
    error:false
}

 const chapterReducer = createReducer(initialState,(builder) => {
    builder.addCase(ChapterFetch.fulfilled,(state,action)=>{
        
        console.log("Se ejecuto correctamente");
       
        
        
        state.loading = false,
        state.error = false
        state.mangas = action.payload
    })
    .addCase(ChapterFetch.pending,(state,action)=>{
        console.log("cargando...");
        console.log(action);
        state.loading = true,
        state.error = false
    })
    .addCase(ChapterFetch.rejected,(state,action)=>{
        console.log("Error",action.error.message);
        state.loading = false,
        state.error = action.error.message
    })

})

export default chapterReducer;