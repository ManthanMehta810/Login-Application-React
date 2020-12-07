/* eslint-disable no-useless-escape */
import React, { useRef, useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import moment from 'moment';

function UpdateProfile({
  UpdateProfileAction,
  ProfileReducer,
  LoginReducer,
  LogOutSuccess,
}) {
  const history = useHistory();
  const fileInputRef = useRef(null);
  const [profile, changeProfile] = useState(false);
  const [firstName, changeFirstName] = useState(
    ProfileReducer.getProfileData.firstName || '',
  );
  const [lastName, changeLastName] = useState(
    ProfileReducer.getProfileData.lastName || '',
  );
  const [dOB, changeDOB] = useState(
    moment(ProfileReducer.getProfileData.dOB).format('YYYY-MM-DD') || '',
  );
  const [address, changeAddress] = useState(
    ProfileReducer.getProfileData.address || '',
  );
  const { Loader, apiConfig, ApiCall } = global;
  const [ActiveLoader, changeLoader] = useState(false);
  useEffect(() => {
    changeFirstName(ProfileReducer.getProfileData.firstName);
    changeLastName(ProfileReducer.getProfileData.lastName);
    changeDOB(moment(ProfileReducer.getProfileData.dOB).format('YYYY-MM-DD'));
    changeAddress(ProfileReducer.getProfileData.address);
  }, [ProfileReducer.getProfileData]);
  let disabled = true;

  const updateProfile = async () => {
    try {
      let response = {};
      changeLoader(true);
      if (profile !== false) {
        const form = new FormData();
        form.append('phoneNumber', ProfileReducer.getProfileData.phoneNumber);
        form.append('profilePhoto', profile);
        response = await ApiCall(
          apiConfig[apiConfig.currentEnv],
          apiConfig.uploadImageToS3.url,
          apiConfig.uploadImageToS3.method,
          '',
          form,
          {
            'Content-Type': 'multipart/form-data',
          },
        );
      }
      if (profile === false || response.data.code === 200) {
        const reqBody = {
          userId: LoginReducer.loginUserId,
          firstName,
          lastName,
          dOB,
          address,
          phoneNumber: ProfileReducer.getProfileData.phoneNumber,
          profilePhoto: ProfileReducer.getProfileData.profilePhoto,
        };
        if (profile !== false) reqBody.profilePhoto = response.data.result.url;
        response = await ApiCall(
          apiConfig[apiConfig.currentEnv],
          apiConfig.updateUser.url,
          apiConfig.updateUser.method,
          LoginReducer.loginToken,
          reqBody,
        );
        changeLoader(false);
        if (response.data.code === 200) {
          UpdateProfileAction(response.data);
          toast(response.data.message);
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
    firstName.length > 0 &&
    lastName.length > 0 &&
    dOB.length > 0 &&
    address.length > 0
  ) {
    disabled = false;
  }

  if (ProfileReducer.isDataLoaded === false) {
    history.push('/profile');
    return <></>;
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
            <p className="displayFlex flexOne selfFlexStart welcome">
              Update Profile
            </p>
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
                      : ProfileReducer.getProfileData.profilePhoto
                  }
                  alt="profile"
                  className="profilePhoto"
                />
                <FontAwesomeIcon
                  icon={faCamera}
                  style={{ position: 'absolute', left: 285, bottom: 500 }}
                />
              </div>
              <p>
                {ProfileReducer.getProfileData.phoneNumber.substring(
                  3,
                  ProfileReducer.getProfileData.phoneNumber.length,
                )}
              </p>
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
              <div className="space20" />
              <button
                type="button"
                className="button blueBackground marginBottom"
                disabled={disabled}
                style={disabled ? { opacity: 0.5 } : null}
                onClick={() => {
                  console.log('in on click');
                  updateProfile();
                }}
              >
                Update Profile
              </button>
              <button
                type="button"
                className="button blueBackground"
                onClick={() => {
                  LogOutSuccess();
                  history.push('/');
                }}
              >
                Logout
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

const mapStateToProps = (state) => {
  const { ProfileReducer, LoginReducer } = state;
  return { ProfileReducer, LoginReducer };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      UpdateProfileAction: global.Actions.UpdateProfile,
      LogOutSuccess: global.Actions.LogOutSuccess,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
