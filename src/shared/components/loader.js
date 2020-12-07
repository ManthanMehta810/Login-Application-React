import React from 'react';
import Loader from 'react-loader-spinner';

function ActiveLoader({ height, width, loaderColor }) {
  return (
    <Loader
      type="Oval"
      color={loaderColor || '#000000'}
      height={height}
      width={width}
    />
  );
}
export default ActiveLoader;
