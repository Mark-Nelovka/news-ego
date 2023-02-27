import axios from "axios";
import { createAsyncThunk, createAction } from '@reduxjs/toolkit';

const { REACT_APP_URL_API } = process.env;

axios.defaults.baseURL = `${REACT_APP_URL_API}`;

const getNews = createAsyncThunk('news/getNews', async (page: number, thunkApi) => {
   try {
      const { data } = await axios.get(`/news/${page}`);
      return data;
   } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkApi.rejectWithValue(error.response?.data);
      }
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