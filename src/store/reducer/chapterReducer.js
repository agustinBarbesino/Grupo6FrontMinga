import { createReducer } from "@reduxjs/toolkit";
import { getChapter,getComments,addComment } from "../actions/chapterActions";

const initialState = {
    chapters: [],
    loading: false,   
    nameChapter: "",
    comments:[]
};

export const chapterReadReducer = createReducer(initialState, (builder) => {
    builder
    // get chapter
        .addCase(getChapter.pending, (state) => {
            state.loading = true;
        })
        .addCase(getChapter.fulfilled, (state, action) => {
            state.loading = false;
            state.chapters = action.payload;
            state.nameChapter = action.payload.title;
        })
        .addCase(getChapter.rejected, (state) => {
            state.loading = false;
        })

        // get comments
        .addCase(getComments.pending, (state) => {
            state.loadingComments = true;
        })
        .addCase(getComments.fulfilled, (state, action) => {
            state.loadingComments = false;
            state.comments = action.payload;
        })
        .addCase(getComments.rejected, (state) => {
            state.loadingComments = false;
        })

        //create comment
        .addCase(addComment.pending, (state) => {
            state.loadingComments = true;
        })
        .addCase(addComment.fulfilled, (state) => {
            state.loadingComments = false;
        })
        ;
});