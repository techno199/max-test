import { BaseAction } from "../base-action";
import { SET_LOGIN, UserInfo, SET_USER_INFO, SET_USER_ID } from "./types";
import axios from 'axios';
import { from } from 'rxjs';
import { loadable } from "../loading/types";

const apiLogin = `https://mysterious-reef-29460.herokuapp.com/api/v1/validate`;
const apiUserInfo = `https://mysterious-reef-29460.herokuapp.com/api/v1/user-info`;

/** Сохраняет состояние авторизации */
export const setLoginAction = (isLoggedIn: boolean): BaseAction => {
  return {
    type: SET_LOGIN,
    payload: isLoggedIn
  }
}

/** Сохраняет подробную информацию о пользователе */
export const setUserInfoAction = (userInfo: UserInfo): BaseAction => {
  return {
    type: SET_USER_INFO,
    payload: userInfo
  }
}

/** Схораняет id пользователя */
export const setUserIdAction = (userId: number): BaseAction => {
  return {
    type: SET_USER_ID,
    payload: userId
  }
}


// -------
// Async actions

/** Запрос на вход */
export const fetchLoginAction = (email: string, password: string) => (dispatch: any) => {
  return from(axios.post(
    apiLogin, 
    {
      email,
      password
    })).pipe(
      loadable(dispatch)
    );
}

/** Запрос информации о пользователе */
export const fetchUserInfoAction = (userId: number) => (dispatch: any) => {
  return from(axios.get(
    `${apiUserInfo}/${userId}`
  )).pipe(
    loadable(dispatch)
  );
}