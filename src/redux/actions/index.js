export const USER_EMAIL = 'USER_EMAIL';
export const USER_TOKEN = 'USER_TOKEN';
export const USER_NAME = 'USER_NAME';
export const USER_SCORE = 'USER_SCORE';
export const TRIVIA_API = 'TRIVIA_API';
export const SCORE_USER = 'SCORE_USER';
export const SCORE_TOTAL = 'SCORE_TOTAL';
export const ASSERTION_USER = 'ASSERTION_USER';

export function userEmail(payload) {
  return {
    type: USER_EMAIL,
    payload,
  };
}

export function userToken(payload) {
  return {
    type: USER_TOKEN,
    payload,
  };
}

export function userName(payload) {
  return {
    type: USER_NAME,
    payload,
  };
}

export function userScore(payload) {
  return {
    type: USER_SCORE,
    payload,
  };
}

export function triviaApi(payload) {
  return {
    type: TRIVIA_API,
    payload,
  };
}

export function scoreUser(payload) {
  return {
    type: SCORE_USER,
    payload,
  };
}

export function scoreTotal(payload) {
  return {
    type: SCORE_TOTAL,
    payload,
  };
}

export function assertionsUser(payload) {
  return {
    type: ASSERTION_USER,
    payload,
  };
}

export function fetchTokenAPI() {
  return async (dispatch) => {
    const requestAPI = await fetch('https://opentdb.com/api_token.php?command=request');
    const responseJson = await requestAPI.json();
    return dispatch(userToken(responseJson.token));
  };
}
