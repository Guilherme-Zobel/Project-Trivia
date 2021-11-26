import { USER_EMAIL, USER_TOKEN, USER_NAME } from '../actions';

const INITIAL_STATE = {
  email: '',
  token: '',
  name: '',
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_EMAIL:

    return {
      ...state, email: action.payload,
    };
  case USER_TOKEN:

    return {
      ...state, token: action.payload,
    };

  case USER_NAME:
    return {
      ...state, name: action.payload,
    };

  default:
    return state;
  }
}
