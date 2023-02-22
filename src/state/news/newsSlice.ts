import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INews } from 'types/news';
import { getNews, deleteNews } from "./newsOperations";


interface IStateNews {
    news: INews[],
    isLoading: boolean,
    error: string
}

export const initialState: IStateNews = {
    news: [],
    isLoading: false,
    error: ""
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
    extraReducers: {
        [getNews.pending.type]: (state, _) => {
            state.isLoading = true;
        },
        [getNews.fulfilled.type]: (state, { payload }: PayloadAction<INews[]>) => {
            state.news = payload;
            state.isLoading = false;
            state.error = ""
        },
        [getNews.rejected.type]: (state, {payload}: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = payload;
        },
        [deleteNews.type]: (state, { payload }: PayloadAction<{ id: number}>) => {
            state.news = state.news.filter(el => el.id !== payload.id);
        }
  }
  
});

export default newsSlice.reducer;