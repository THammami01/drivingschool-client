import { Action } from '@ngrx/store';

const initialState = false;

export const loginReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'SET_LOGGED_IN':
      return (state = true);

    case 'SET_LOGGED_OUT':
      return (state = false);

    default:
      return state;
  }
};
