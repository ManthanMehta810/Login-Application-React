const GETPROFILE = 'GETPROFILE';
const GETPROFILE_SUCCESS = 'GETPROFILE_SUCCESS';
const GETPROFILE_FAIL = 'GETPROFILE_FAIL';
const UPDATEPROFILE = 'UPDATEPROFILE';

export const GetProfile = (url, constant, method, token, reqBody) => ({
  type: GETPROFILE,
  url,
  constant,
  method,
  token,
  reqBody,
});

export const GetProfileSuccess = (profileData) => ({
  type: GETPROFILE_SUCCESS,
  profileData,
});

export const GetProfileFail = (err) => ({
  type: GETPROFILE_FAIL,
  err,
});
export const UpdateProfile = (profileData) => ({
  type: UPDATEPROFILE,
  profileData,
});
