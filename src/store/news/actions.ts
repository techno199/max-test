import { News, SET_NEWS } from "./types";
import { BaseAction } from "../base-action";
import { from } from "rxjs";
import axios from "axios";
import { loadable } from "../loading/types";

const apiNews = `https://mysterious-reef-29460.herokuapp.com/api/v1/news`;

export const setNewsAction = (news: News[]): BaseAction => {
  return {
    type: SET_NEWS,
    payload: news
  }
}

export const fetchNewsAction = () => (dispatch: any) => {
  return from(axios.get(
    apiNews
  )).pipe(
    loadable(dispatch)
  );
}