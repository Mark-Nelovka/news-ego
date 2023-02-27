import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { auth, logOut } from "./authOperations";

interface IStateAuth {
    token: null | string,
    isLoading: boolean,
    error: {
        name: string,
        password: string
    }
}

interface IActionAuth {
    data: {
        name: string,
        password: string
    }
}

export const initialState: IStateAuth = {
    token: null,
    isLoading: false,
    error: {
        name: "",
        password: ""
    }
};



const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
    extraReducers: {
        [auth.pending.type]: (state, _) => {
            state.isLoading = true;
            state.error.name = "";
            state.error.password = "";
        },
        [auth.fulfilled.type]: (state, { payload }: PayloadAction<{token: string}>) => {
            state.token = payload.token;
            state.isLoading = false;
            state.error.name = "";
            state.error.password = "";
        },
        [auth.rejected.type]: (state, { payload }: PayloadAction<IActionAuth>) => {
            state.isLoading = false;
            state.error.name = !payload.data.name ? "Invalid name" : "";
            state.error.password = !payload.data.password ? "Invalid name" : "";
        },
        [logOut.type]: (state, _) => {
            state.token = null
            state.error.name = "";
            state.error.password = "";
        }
    }
    
});

export default authSlice.reducer;