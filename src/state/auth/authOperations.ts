import axios from "axios";
import { createAsyncThunk, createAction } from '@reduxjs/toolkit';

const { REACT_APP_URL_API } = process.env;

axios.defaults.baseURL = `${REACT_APP_URL_API}`;

interface IQWE {
      name: string,
      password: string
}

const auth = createAsyncThunk('auth/singUp', async (payload: IQWE, thunkApi) => {
   try {
      const {data} = await axios.post("/login", payload);
      return data.token;
   } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkApi.rejectWithValue(error.response?.data.message);
      }      
   }
});

const logOut = createAction("auth/logOut");



export { auth, logOut };