import axios from "axios";
import { createAsyncThunk, createAction } from '@reduxjs/toolkit';

const { REACT_APP_URL_API } = process.env;

axios.defaults.baseURL = `${REACT_APP_URL_API}`;

const getNews = createAsyncThunk('news/getNews', async (_, thunkApi) => {
   try {
      const { data } = await axios.get("/v3/articles");
      return data;
   } catch (error) {
      thunkApi.rejectWithValue("Oooops, something is wrong");
   }
});

const deleteNews = createAction("news/delete", function deleteItems(id) {
   return {
      payload: {
         id
      }
   };
})

export { getNews, deleteNews };