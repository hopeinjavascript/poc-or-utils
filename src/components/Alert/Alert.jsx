import React from 'react';
import './Alert.css';

const Alert = ({ children }) => {
  return <div className="alert-text">{children}</div>;
};

export default Alert;
