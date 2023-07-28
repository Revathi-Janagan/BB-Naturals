import React from 'react'
import RightHeader from './RightHeader'
import RightDiv from './RightDiv'
import "./RightContent.css";

const RightContent = () => {
  return (
    <div className="right-content-container">
      <RightHeader/>
      <RightDiv />
    </div>
  )
}

export default RightContent
