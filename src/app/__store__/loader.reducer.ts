import { Action } from '@ngrx/store';

const initialState = false;

export const loaderReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'START_LOADING':
      return (state = true);

    case 'STOP_LOADING':
      return (state = false);

    default:
      return state;
  }
};
