import { USER_EMAIL, USER_TOKEN } from '../actions';

const INITIAL_STATE = {
  email: '',
  token: '',
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

  default:
    return state;
  }
}
