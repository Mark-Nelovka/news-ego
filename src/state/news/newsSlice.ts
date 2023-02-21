import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getNews } from "./newsOperations";

interface News {
    id: number,
    title: string
}

interface IStateNews {
    news: News[],
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
        [getNews.fulfilled.type]: (state, { payload }: PayloadAction<News[]>) => {
            state.news = payload;
            state.isLoading = false;
            state.error = ""
        },
        [getNews.rejected.type]: (state, {payload}: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = payload;
        }
  }
  
});

export default newsSlice.reducer;