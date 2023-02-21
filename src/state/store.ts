import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import newsReducer from './news/newsSlice';
import authReducer from "./auth/authSlice";

const newsPersistConfig = {
  key: 'news',
  storage,
  blacklist: ["isLoading"]
};

const authPersistConfig = {
  key: 'auth',
  storage,
  blacklist: ["isLoading"]
};

const NewsPersistedReducer = persistReducer(newsPersistConfig, newsReducer);
const AuthPersistConfig = persistReducer(authPersistConfig, authReducer);

const rootReducer = combineReducers({ 
    news: NewsPersistedReducer,
    auth: AuthPersistConfig
})


const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV === 'development',
});
export const persistor = persistStore(store);

export default store;

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;