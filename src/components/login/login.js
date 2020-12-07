import React from 'react';
import { useHistory } from 'react-router-dom';
// import RightBackground from '../../shared/components/rightBackground';

function Login() {
  const history = useHistory();
  return (
    <div className="containerFluid flexDirectionRow rightBaground height100">
      <div className="displayFlex container flexOne  flexDirectionColum center ">
        <p className="displayFlex flexOne selfFlexStart welcome">Welcome</p>
        <div className=" displayFlex flexEight flexDirectionColum center">
          <button
            type="button"
            className="button blueBackground"
            onClick={() => {
              history.push('/login');
            }}
          >
            Login
          </button>
          <div className="space20" />
          <button
            type="button"
            className="button greenBackground"
            onClick={() => {
              history.push('/login');
            }}
          >
            Sign Up
          </button>
        </div>
        <p className="displayFlex flexOne selfFlexEnd welcome">login.io</p>
      </div>
      <div className="flexTwo" />
    </div>
  );
}

export default Login;
