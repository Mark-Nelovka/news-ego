import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { auth, logOut } from "./authOperations";

interface IStateNews {
    token: null | string,
    isLoading: boolean,
    error: null | string
}

export const initialState: IStateNews = {
    token: null,
    isLoading: false,
    error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
    extraReducers: {
        [auth.pending.type]: (state, _) => {
            state.isLoading = true;
            state.error = null;
        },
        [auth.fulfilled.type]: (state, { payload }: PayloadAction<string>) => {
            state.token = payload;
            state.isLoading = false;
            state.error = null;
        },
        [auth.rejected.type]: (state, {payload}: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = payload;
        },
        [logOut.type]: (state, _) => {
         state.token = null
        }
    }
    
});

export default authSlice.reducer;