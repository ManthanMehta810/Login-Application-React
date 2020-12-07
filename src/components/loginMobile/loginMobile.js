import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
// import RightBackground from '../../shared/components/rightBackground';

function LoginMobile() {
  const [mobile, channgeMobile] = useState('');
  const { Loader, apiConfig, ApiCall } = global;
  const [ActiveLoader, changeLoader] = useState(false);
  const history = useHistory();
  const handleMobile = (e) => {
    channgeMobile(e.target.value);
  };
  const apiCall = async () => {
    try {
      const reqBody = {
        phoneNumber: `+91${mobile}`,
      };
      changeLoader(true);
      const response = await ApiCall(
        apiConfig[apiConfig.currentEnv],
        apiConfig.getStatus.url,
        apiConfig.getStatus.method,
        '',
        reqBody,
      );
      changeLoader(false);
      if (response.data.code === 200) {
        if (response.data.result.isRegistered) {
          history.push(`/login/${mobile}`);
        } else {
          history.push(`/signUp/${mobile}`);
        }
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
            <p className="displayFlex flexOne selfFlexStart welcome">Welcome</p>
            <div className=" displayFlex flexEight flexDirectionColum center">
              <input
                type="text"
                placeholder="Enter phone number"
                maxLength="10"
                pattern="[1-9]{1}[0-9]{9}"
                onChange={handleMobile}
                value={mobile}
                className="input"
              />
              <div className="space20" />
              <button
                type="button"
                className="button blueBackground"
                disabled={mobile.length !== 10}
                style={mobile.length !== 10 ? { opacity: 0.5 } : null}
                onClick={() => apiCall()}
              >
                Next
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

export default LoginMobile;
