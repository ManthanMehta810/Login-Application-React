/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import Login from '../components/login/login';
import LoginMobile from '../components/loginMobile/loginMobile';
import LoginPassword from '../components/loginPassword/loginPassword';
import Signup from '../components/signup/signup';
import Profile from '../components/profile/profile';
import UpdateProfile from '../components/updateProfile/updateProfile';

function MainNavigation({ LoginReducer }) {
  // let location = useLocation();
  return (
    <Router>
      <Switch>
        <PublicRoute path="/" exact LoginReducer={LoginReducer}>
          <Login />
        </PublicRoute>
        <PublicRoute path="/login" exact LoginReducer={LoginReducer}>
          <LoginMobile />
        </PublicRoute>
        <PublicRoute
          path="/login/:phoneNumber"
          exact
          LoginReducer={LoginReducer}
        >
          <LoginPassword />
        </PublicRoute>
        <PublicRoute
          path="/signUp/:phoneNumber"
          exact
          LoginReducer={LoginReducer}
        >
          <Signup />
        </PublicRoute>
        <PrivateRoute path="/profile" exact LoginReducer={LoginReducer}>
          <Profile />
        </PrivateRoute>
        <PrivateRoute path="/updateProfile" exact LoginReducer={LoginReducer}>
          <UpdateProfile />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}
const mapStateToProps = (state) => {
  const { LoginReducer } = state;
  return { LoginReducer };
};
export default connect(mapStateToProps, null)(MainNavigation);

// Define public Route

function PublicRoute({ children, LoginReducer, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        LoginReducer.isLogin === true ? (
          <Redirect
            to={{
              pathname: '/profile',
              state: { from: location },
            }}
          />
        ) : (
          children
        )
      }
    />
  );
}

// Define Private Route
function PrivateRoute({ children, LoginReducer, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        LoginReducer.isLogin === true ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
