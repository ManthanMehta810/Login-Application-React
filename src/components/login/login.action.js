const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LoginSuccess = (loginData) => ({
  type: LOGIN_SUCCESS,
  loginData,
});

export const LogOutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});
