import axios from "axios";
import { createAsyncThunk, createAction } from '@reduxjs/toolkit';

const { REACT_APP_URL_API } = process.env;

axios.defaults.baseURL = `${REACT_APP_URL_API}`;

interface IUserInfo {
      name: string,
      password: string
}

const auth = createAsyncThunk('auth/singUp', async (payload: IUserInfo, thunkApi) => {
   try {
      const { data } = await axios.post("/login", payload);
      return data;
   } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkApi.rejectWithValue(error.response?.data);
      }      
   }
});

const logOut = createAction("auth/logOut");



export { auth, logOut };