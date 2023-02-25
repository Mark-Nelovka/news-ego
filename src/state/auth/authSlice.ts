import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { auth, logOut } from "./authOperations";

interface IStateNews {
    token: null | string,
    isLoading: boolean,
    error: {
        name: boolean,
        password: boolean
    }
}

export const initialState: IStateNews = {
    token: null,
    isLoading: false,
    error: {
        name: true,
        password: true
    }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
    extraReducers: {
        [auth.pending.type]: (state, _) => {
            state.isLoading = true;
            // state.error.name = false;
        },
        [auth.fulfilled.type]: (state, { payload }: PayloadAction<{token: string}>) => {
            state.token = payload.token;
            state.isLoading = false;
            state.error.name = true;
            state.error.password = true;
        },
        [auth.rejected.type]: (state, { payload }: PayloadAction<IStateNews>) => {
            console.log(payload)
            state.isLoading = false;
            state.error.name = payload.error.name;
            state.error.password = payload.error.password;
        },
        [logOut.type]: (state, _) => {
            state.token = null
            state.error.name = true;
            state.error.password = true;
        }
    }
    
});

export default authSlice.reducer;