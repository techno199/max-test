import { AuthState, SET_LOGIN, SET_USER_INFO, SET_USER_ID } from "./types";
import { BaseAction } from "../base-action";

const isLoggedIn = localStorage.getItem('isLoggedIn');
const userId = localStorage.getItem('userId');

const initialState: AuthState = {
  isLoggedIn: isLoggedIn ? true : false,
  userId: userId ? JSON.parse(userId) : undefined
}

export const authReducer = (state = initialState, action: BaseAction): AuthState => {
  switch (action.type) {
    case SET_LOGIN:
      localStorage.setItem('isLoggedIn', JSON.stringify(action.payload));
      return { ...state, isLoggedIn: action.payload }
    case SET_USER_ID:
      localStorage.setItem('userId', JSON.stringify(action.payload));
      return { ...state, userId: action.payload }
    case SET_USER_INFO:
      return { ...state, userInfo: action.payload }
    default:
      return state;
  }
}