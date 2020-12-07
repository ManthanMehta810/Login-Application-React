import React from 'react';
import './App.scss';
import Images from './config/imageConfig';
import MainNavigation from './navigation/mainNavigation';
import ActiveLoader from './shared/components/loader';
import ApiCall from './shared/services/globalApiService';
import * as Actions from './store/actions/index';
import apiConfig from './config/apiConfig';

function App() {
  global.Images = Images;
  global.Loader = ActiveLoader;
  global.ApiCall = ApiCall;
  global.Actions = Actions;
  global.apiConfig = apiConfig;
  return <MainNavigation />;
}

export default App;
