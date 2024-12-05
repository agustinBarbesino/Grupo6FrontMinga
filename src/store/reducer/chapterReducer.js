import { createReducer } from "@reduxjs/toolkit";
import { getChapter } from "../actions/chapterActions";

const initialState = {
    chapters: [],
    loading: false,
};

export const chapterReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(getChapter.pending, (state) => {
            state.loading = true;
        })
        .addCase(getChapter.fulfilled, (state, action) => {
            state.loading = false;
            state.chapters = action.payload;
        })
        .addCase(getChapter.rejected, (state) => {
            state.loading = false;
        });
});