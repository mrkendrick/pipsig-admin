import { Action, ActionTypes } from './../actions/types';

export enum AlertVariant {
  success = 'success',
  info = 'info',
  warn = 'warn',
  error = 'error',
}

type State = { variant: AlertVariant; text: string; id: string };

const initialState: State = {
  id: '',
  variant: AlertVariant.info,
  text: '',
};

const alertReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case ActionTypes.alert:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export default alertReducer;
