import React from 'react';
import LeftHeader from './LeftHeader';
import LeftDiv from './LeftDiv';
import "./LeftContent.css";

const LeftContent = ({onAddToCart}) => {
  return (
    <div className="left-content-container">
      <LeftHeader />
      <LeftDiv onAddToCart={onAddToCart} />
    </div>
  );
};

export default LeftContent;
