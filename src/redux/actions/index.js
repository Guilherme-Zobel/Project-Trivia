export const USER_EMAIL = 'USER_EMAIL';

export function userEmail(payload) {
  return {
    type: USER_EMAIL,
    payload,
  };
}
