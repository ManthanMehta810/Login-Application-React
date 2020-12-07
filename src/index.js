import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { ToastContainer } from 'react-toastify';
import WebFont from 'webfontloader';
import './index.scss';
import App from './App';
import storePersist from './store';
import 'react-toastify/dist/ReactToastify.css';
import reportWebVitals from './reportWebVitals';

WebFont.load({
  google: {
    families: ['Arimo:400,700', 'sans-serif'],
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={storePersist.store}>
      <PersistGate persistor={storePersist.persistor}>
        <App />
        <ToastContainer
          toastClassName="toster"
          bodyClassName="toster"
          position="bottom-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
