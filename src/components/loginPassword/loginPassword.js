import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import RightBackground from '../../shared/components/rightBackground';

function LoginPassword({ LoginSuccess }) {
  const [password, changePassword] = useState('');
  const { Loader, apiConfig, ApiCall } = global;
  const [ActiveLoader, changeLoader] = useState(false);
  const history = useHistory();
  const { phoneNumber } = useParams();
  const handlePassword = (e) => {
    changePassword(e.target.value);
  };
  const apiCall = async () => {
    try {
      const reqBody = {
        phoneNumber: `+91${phoneNumber}`,
        password,
      };
      changeLoader(true);
      const response = await ApiCall(
        apiConfig[apiConfig.currentEnv],
        apiConfig.login.url,
        apiConfig.login.method,
        '',
        reqBody,
      );
      changeLoader(false);
      if (response.data.code === 200) {
        LoginSuccess(response.data);
        history.push(`/profile`);
      } else {
        toast(response.data.message);
      }
    } catch (error) {
      toast(error.message);
      changeLoader(false);
    }
  };
  return (
    <div className="containerFluid flexDirectionRow rightBaground height100">
      {ActiveLoader ? (
        <div className="displayFlex flexOne center">
          <Loader height={100} width={100} />
        </div>
      ) : (
        <>
          <div className="displayFlex container flexOne  flexDirectionColum center ">
            <p className="displayFlex flexOne selfFlexStart welcome">
              Welcome Back
            </p>
            <div className=" displayFlex flexEight flexDirectionColum center">
              <input
                type="password"
                placeholder="Enter Password"
                onChange={handlePassword}
                value={password}
                className="input"
              />
              <div className="space20" />
              <button
                type="button"
                className="button blueBackground"
                disabled={password.length === 0}
                style={password.length === 0 ? { opacity: 0.5 } : null}
                onClick={() => apiCall()}
              >
                Login
              </button>
            </div>
            <p className="displayFlex flexOne selfFlexEnd welcome">login.io</p>
          </div>
          <div className="flexTwo" />
        </>
      )}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      LoginSuccess: global.Actions.LoginSuccess,
    },
    dispatch,
  );
};

export default connect(null, mapDispatchToProps)(LoginPassword);
