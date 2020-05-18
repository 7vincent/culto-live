import React from 'react';
import ReactLoading from 'react-loading';

export default function Loading() {
  return (
    <ReactLoading
      type="bubbles"
      color="#fff"
      height="20%"
      width="20%"
      className="loading"
    />
  );
}
