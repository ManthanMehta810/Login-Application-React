import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

function Profile({ ProfileReducer, LoginReducer, GetProfile }) {
  const { Loader, apiConfig } = global;
  useEffect(() => {
    const reqBody = {
      userId: LoginReducer.loginUserId,
    };
    GetProfile(
      apiConfig[apiConfig.currentEnv],
      apiConfig.getUserData.url,
      apiConfig.getUserData.method,
      LoginReducer.loginToken,
      reqBody,
    );
  }, [LoginReducer, apiConfig, GetProfile]);
  const history = useHistory();

  if (ProfileReducer.loading === true) {
    return (
      <div className="containerFluid flexDirectionRow rightBaground height100">
        <div className="displayFlex flexOne center">
          <Loader height={100} width={100} />
        </div>
      </div>
    );
  }
  if (
    ProfileReducer.getProfileSuccess === true &&
    ProfileReducer.getProfileFail === false
  ) {
    history.push('/updateProfile');
    return <></>;
  }
  toast(ProfileReducer.getProfileData);
  return (
    <div className="containerFluid flexDirectionRow rightBaground height100">
      <div className="displayFlex flexOne center">
        <Loader height={100} width={100} />
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  const { ProfileReducer, LoginReducer } = state;
  return { ProfileReducer, LoginReducer };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      GetProfile: global.Actions.GetProfile,
    },
    dispatch,
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
