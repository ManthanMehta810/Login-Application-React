const INITIAL_STATE = {
  loginUserId: '',
  loginToken: '',
  isLogin: false,
};

const LoginReducer = (state = INITIAL_STATE, action) => {
  let loginUserId;
  let loginToken;
  let isLogin;
  let data;

  switch (action.type) {
    case 'LOGIN_SUCCESS':
      data = action.loginData;
      loginUserId = data.result.userId;
      loginToken = data.result.token;
      isLogin = true;
      return {
        ...state,
        loginUserId,
        loginToken,
        isLogin,
      };

    case 'LOGOUT_SUCCESS':
      return {
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};
export default LoginReducer;
