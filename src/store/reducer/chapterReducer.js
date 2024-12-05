import { createReducer } from "@reduxjs/toolkit";
import { getChapter } from "../actions/chapterActions";
import { getComments } from "../actions/chapterActions";
import { act } from "react";

const initialState = {
    chapters: [],
    loading: false,
    loadingComments: false,
    nameChapter: "",
    comments:[]
};

export const chapterReducer = createReducer(initialState, (builder) => {
    builder
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
        .addCase(getComments.pending, (state) => {
            state.loadingComments = true;
        })
        .addCase(getComments.fulfilled, (state, action) => {
            state.loadingComments = false;
            state.comments = action.payload;
        })
        .addCase(getComments.rejected, (state) => {
            state.loadingComments = false;
        });
});