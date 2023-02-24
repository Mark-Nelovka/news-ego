import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INews } from 'types/news';
import { getNews, deleteNews } from "./newsOperations";


interface IStateNews {
    data: {
        items: INews[],
        totalCount?: number
    },
    isLoading: boolean,
    error: {
        status: string | null,
        code: number | null,
        message: string | null
    };
} 

export const initialState: IStateNews = {
    data: {
        items: [],
        totalCount: 0
    },
    isLoading: false,
    error: {
        status: null,
        code: null,
        message: null
    }
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
    extraReducers: {
        [getNews.pending.type]: (state, _) => {
            state.isLoading = true;
        },
        [getNews.fulfilled.type]: (state, { payload }: PayloadAction<IStateNews>) => {
            state.data.items = payload.data.items;
            state.data.totalCount = payload.data.totalCount;
            state.isLoading = false;
            state.error.message = "";
        },
        [getNews.rejected.type]: (state, {payload}: PayloadAction<IStateNews>) => {
            state.isLoading = false;
            // state.error.message = payload.error.message;
        },
        [deleteNews.type]: (state, { payload }: PayloadAction<{ id: number}>) => {
            state.data.items = state.data.items.filter(el => el.id !== payload.id);
        }
  }
  
});

export default newsSlice.reducer;