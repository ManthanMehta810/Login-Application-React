/* eslint-disable no-useless-escape */
import React, { useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

function Signup({ LoginSuccess }) {
  const fileInputRef = useRef(null);
  const [profile, changeProfile] = useState(false);
  const [firstName, changeFirstName] = useState('');
  const [lastName, changeLastName] = useState('');
  const [dOB, changeDOB] = useState('');
  const [password, changePassword] = useState('');
  const [address, changeAddress] = useState('');
  const { Images, Loader, apiConfig, ApiCall } = global;
  const [ActiveLoader, changeLoader] = useState(false);
  const history = useHistory();
  const { phoneNumber } = useParams();
  let disabled = true;

  const register = async () => {
    try {
      const form = new FormData();
      form.append('phoneNumber', `+91${phoneNumber}`);
      form.append('profilePhoto', profile);
      changeLoader(true);
      let response = await ApiCall(
        apiConfig[apiConfig.currentEnv],
        apiConfig.uploadImageToS3.url,
        apiConfig.uploadImageToS3.method,
        '',
        form,
        {
          'Content-Type': 'multipart/form-data',
        },
      );
      if (response.data.code === 200) {
        const reqBody = {
          firstName,
          lastName,
          dOB,
          password,
          address,
          phoneNumber: `+91${phoneNumber}`,
          profilePhoto: response.data.result.url,
        };
        response = await ApiCall(
          apiConfig[apiConfig.currentEnv],
          apiConfig.signUp.url,
          apiConfig.signUp.method,
          '',
          reqBody,
        );
        changeLoader(false);
        if (response.data.code === 200) {
          LoginSuccess(response.data);
          history.push('/profile');
        } else {
          toast(response.data.message);
        }
      } else {
        changeLoader(false);
        toast(response.data.message);
      }
    } catch (error) {
      toast(error.message);
      changeLoader(false);
    }
  };

  if (
    phoneNumber.length === 10 &&
    profile &&
    firstName.length > 0 &&
    lastName.length > 0 &&
    dOB.length > 0 &&
    password.length > 0 &&
    address.length > 0
  ) {
    disabled = false;
  }
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
              <div
                onClick={() => {
                  fileInputRef.current.click();
                }}
                aria-hidden="true"
                className="marginBottom"
              >
                <img
                  src={
                    profile
                      ? URL.createObjectURL(profile)
                      : Images.profile.default
                  }
                  alt="profile"
                  className="profilePhoto"
                />
                <FontAwesomeIcon
                  icon={faCamera}
                  style={{ position: 'absolute', left: 285, bottom: 490 }}
                />
              </div>
              <input
                ref={fileInputRef}
                accept="image/*"
                type="file"
                placeholder="Enter First Name"
                maxLength="10"
                onChange={(e) => {
                  changeProfile(e.target.files[0]);
                }}
                // value={mobile}
                style={{ display: 'none' }}
                // className="circle"
              />
              <input
                type="text"
                placeholder="Enter First Name"
                onChange={(e) => {
                  changeFirstName(e.target.value);
                }}
                value={firstName}
                className="inputSignUp"
              />
              <input
                type="text"
                placeholder="Enter Last Name"
                onChange={(e) => {
                  changeLastName(e.target.value);
                }}
                value={lastName}
                className="inputSignUp"
              />
              <input
                type="text"
                placeholder="Enter Address"
                onChange={(e) => {
                  changeAddress(e.target.value);
                }}
                value={address}
                className="inputSignUp"
              />
              <input
                type="date"
                placeholder="Enter Date Of Birth"
                onChange={(e) => {
                  changeDOB(e.target.value);
                }}
                value={dOB}
                className="inputSignUp"
              />
              <input
                type="password"
                placeholder="Enter Password"
                onChange={(e) => {
                  changePassword(e.target.value);
                }}
                value={password}
                className="inputSignUp"
              />
              <div className="space20" />
              <button
                type="button"
                className="button blueBackground"
                disabled={disabled}
                style={disabled ? { opacity: 0.5 } : null}
                onClick={() => {
                  console.log('in on click');
                  register();
                }}
              >
                Sign Up
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

export default connect(null, mapDispatchToProps)(Signup);
