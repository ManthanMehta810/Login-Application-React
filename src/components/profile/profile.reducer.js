const INITIAL_STATE = {
  loading: false,
  getProfileSuccess: false,
  getProfileFail: false,
  getProfileData: [],
  getProfileStatus: '',
  isDataLoaded: false,
};

const ProfileReducer = (state = INITIAL_STATE, action) => {
  let loading;
  let getProfileSuccess;
  let getProfileFail;
  let getProfileData;
  let getProfileStatus;
  let isDataLoaded;

  switch (action.type) {
    case 'GETPROFILE':
      loading = true;
      getProfileSuccess = false;
      getProfileFail = false;
      return {
        ...state,
        loading,
        getProfileSuccess,
        getProfileFail,
      };

    case 'GETPROFILE_SUCCESS':
      loading = false;
      getProfileSuccess = true;
      getProfileFail = false;
      getProfileData = action.profileData.result;
      getProfileStatus = action.profileData.code;
      isDataLoaded = true;
      return {
        ...state,
        loading,
        getProfileSuccess,
        getProfileFail,
        getProfileData,
        getProfileStatus,
        isDataLoaded,
      };

    case 'GETPROFILE_FAIL':
      loading = false;
      getProfileSuccess = false;
      getProfileFail = true;
      getProfileData = action.err.message;
      isDataLoaded = false;
      return {
        ...state,
        loading,
        getProfileSuccess,
        getProfileFail,
        getProfileData,
        isDataLoaded,
      };
    case 'UPDATEPROFILE':
      loading = false;
      getProfileSuccess = true;
      getProfileFail = false;
      getProfileData = action.profileData.result;
      getProfileStatus = action.profileData.code;
      isDataLoaded = true;
      return {
        ...state,
        loading,
        getProfileSuccess,
        getProfileFail,
        getProfileData,
        getProfileStatus,
        isDataLoaded,
      };
    default:
      return state;
  }
};
export default ProfileReducer;
