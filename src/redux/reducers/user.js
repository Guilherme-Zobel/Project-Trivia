import { USER_EMAIL, USER_TOKEN, USER_NAME,
  TRIVIA_API, SCORE_USER, CORRECT_NUMBER } from '../actions';

const INITIAL_STATE = {
  token: '',
  trivia: [],
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },

};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case TRIVIA_API:
    return {
      ...state, trivia: action.payload,
    };
  case USER_EMAIL:

    return {
      ...state, player: { ...state.player, gravatarEmail: action.payload },
    };
  case USER_TOKEN:

    return {
      ...state, token: action.payload,
    };

  case USER_NAME:
    return {
      ...state, player: { ...state.player, name: action.payload },
    };

  case CORRECT_NUMBER:
    return {
      ...state, player: { ...state.player, assertions: action.payload + 1 },
    };

  case SCORE_USER: {
    const sumScore = state.player.score + action.payload;
    return { ...state,
      player: { ...state.player, score: sumScore },
    }; }
  default:
    return state;
  }
}
