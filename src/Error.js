import React from 'react';

const Error = ({ error }) => (
  <div className="alert alert-danger" role="alert">
    {error.toString()}
  </div>
);

export default Error;