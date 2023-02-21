import axios from "axios";
import { createAsyncThunk, createAction } from '@reduxjs/toolkit';

// const { REACT_APP_URL_API } = process.env;

// axios.defaults.baseURL = `${REACT_APP_URL_API}`;



const auth = createAsyncThunk('auth/singUp', async (_, thunkApi) => {
   try {
      const {data} = await axios.get("/v3/articles?_limit=6");
      return data;
   } catch (error) {
      thunkApi.rejectWithValue("Oooops, something is wrong");
   }
});

const logOut = createAction("auth/logOut");



export { auth, logOut };