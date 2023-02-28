import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getNews, deleteNews } from "./newsOperations";
import { IStateNews, IActionError } from 'types/state';

export const initialState: IStateNews = {
    data: {
        items: [],
        totalCount: 0
    },
    isLoading: false,
    error: {
        status: "",
        code: 0,
        message: ""
    }
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
    extraReducers: {
        [getNews.pending.type]: (state, _) => {
            state.isLoading = true;
            state.error.message = "";
        },
        [getNews.fulfilled.type]: (state, { payload }: PayloadAction<IStateNews>) => {
            state.data.items = payload.data.items;
            state.data.totalCount = payload.data.totalCount;
            state.isLoading = false;
            state.error.message = "";
        },
        [getNews.rejected.type]: (state, {payload}: PayloadAction<IActionError>) => {
            state.isLoading = false;
            state.error.message = payload.data.message;
        },
        [deleteNews.type]: (state, { payload }: PayloadAction<{ id: number}>) => {
            state.data.items = state.data.items.filter(el => el.id !== payload.id);
        }
  }
  
});

export default newsSlice.reducer;