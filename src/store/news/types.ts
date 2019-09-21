export const FETCH_NEWS = 'FETCH_NEWS';
export const SET_NEWS = 'SET_NEWS';

export interface NewsState {
  /** Список новостей */
  news: News[];
}

export interface News {
  id: number;
  title: string;
  text: string;
}