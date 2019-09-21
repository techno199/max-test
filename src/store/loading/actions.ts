import { START_LOADING, FINISH_LOADING } from "./types";

export const LoadResource = (action: typeof START_LOADING | typeof FINISH_LOADING) => ({
  type: action
});