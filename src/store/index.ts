import { combineReducers } from 'redux';
import { authReducer } from "./auth/reducers";
import { loadingReducer } from './loading/reducers';
import { newsReducer } from './news/reducers';

export const rootReducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
  news: newsReducer
});

export type AppState = ReturnType<typeof rootReducer>;