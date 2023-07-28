// POSMain.js
import React, { useState, useEffect, useCallback } from 'react';
import { Container } from 'react-bootstrap';
import './POSMain.css'; 
import LeftDiv from './LeftDiv';
import RightDiv from './RightDiv';
import RightContent from './RightContent';
import LeftContent from './LeftContent';

const POSMain = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [resizing, setResizing] = useState(false);

  const handleSliderMouseDown = () => {
    setResizing(true);
  };

  const handleSliderMouseUp = () => {
    setResizing(false);
  };

  const handleSliderMouseMove = useCallback((event) => {
    if (resizing) {
      const containerWidth = document.getElementById('main-container').offsetWidth;
      const newSliderPosition = (event.clientX / containerWidth) * 100;
      setSliderPosition(Math.max(30, Math.min(newSliderPosition, 70))); // Limit resizing between 30% and 70%
    }
  }, [resizing]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      handleSliderMouseMove(event);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleSliderMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleSliderMouseUp);
    };
  }, [resizing, handleSliderMouseMove]);

  return (
    <Container fluid className="main-container" id="main-container">
      <div className="left-content" style={{ flex: sliderPosition }}>
        <LeftContent />
      </div>
      <div
        className="slider"
        style={{ left: `calc(${sliderPosition}% - 5px)` }}
        onMouseDown={handleSliderMouseDown}
      ></div>
      <div className="right-content" style={{ flex: 100 - sliderPosition }}>
        <RightContent />
      </div>
    </Container>
  );
};

export default POSMain;
