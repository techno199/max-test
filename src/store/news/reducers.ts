import { NewsState, SET_NEWS } from "./types";
import { BaseAction } from "../base-action";

const initialState: NewsState = {
  news: []
}

export const newsReducer = (state: NewsState = initialState, action: BaseAction): NewsState => {
  switch (action.type) {
    case SET_NEWS:
      return { ...state, news: action.payload }
    default:
      return state;
  }
}