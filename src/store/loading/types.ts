import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';
import { LoadResource } from "./actions";

export const START_LOADING = 'START_LOADING';
export const FINISH_LOADING = 'FINISH_LOADING';

export interface LoadingState {
  /** Количество загружаемых ресурсов */
  loadingResourcesCount: number;
}

/** Увеличивает количество общих загружаемых ресурсов на 1 на время загрузки данного ресурса */
export const loadable = (dispatch: any) => (sourceObservable: Observable<any>): Observable<any> => {
  dispatch(LoadResource(START_LOADING));

  return sourceObservable
    .pipe(
      tap(res => {
        dispatch(LoadResource(FINISH_LOADING));
      })
    );
}