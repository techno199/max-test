export const SET_LOGIN = 'SET_LOGIN';
export const FETCH_LOGIN = 'FETCH_LOGIN';
export const SET_USER_INFO = 'SET_USER_INFO';
export const SET_USER_ID = 'SET_USER_ID';
export const FETCH_USER_INFO = 'FETCH_USER_INFO';

export interface AuthState {
  userId?: number;
  userInfo?: UserInfo;
  isLoggedIn: boolean;
}

export interface UserInfo {
  userId: number;
  city: string;
  languages: string[];
  social: { link: string; label: string; }[];
}