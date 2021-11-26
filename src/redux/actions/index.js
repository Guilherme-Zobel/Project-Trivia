export const USER_EMAIL = 'USER_EMAIL';
export const USER_TOKEN = 'USER_TOKEN';
export const USER_NAME = 'USER_NAME';

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

export function fetchTokenAPI() {
  return async (dispatch) => {
    const requestAPI = await fetch('https://opentdb.com/api_token.php?command=request');
    const responseJson = await requestAPI.json();
    return dispatch(userToken(responseJson.token));
  };
}
