import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getChapter = createAsyncThunk("GET_CHAPTER", async (id) => {

    const response = await axios.get(`https://grupo6backminga.onrender.com/api/chapter/chapterByID/${id}`)
    
    return response.data.response;
})

export const getComments = createAsyncThunk("GET_COMMENTS", async (id) => {

    const response = await axios.get(`http://localhost:8080/api/comments/comentschapter/${id}`)

    return response.data.response
})

export const addComment = createAsyncThunk("ADD_COMMENT", async ({ chapterId, authorId, companyId, message }) => {
    let commentData;

   
    if (authorId) {
      commentData = {
        chapterId,
        authorId,
        message,
      };
    } else {
      commentData = {
        chapterId,
        companyId,
        message,
      };
    }
    console.log(commentData);
    
    try {
     
      const response = await axios.post("http://localhost:8080/api/comments/create", commentData);

      
      return response.data;
    } catch (error) {
      
      throw new Error("Error adding comment: " + error.message);
    }
  }
);