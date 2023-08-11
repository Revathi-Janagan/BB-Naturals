import React, { useState, useEffect } from "react";
import SplitPane from "react-split-pane";
import LeftContent from "./LeftContent";
import RightContent from "./RightContent";
import "./POSMain.css";

const POSMain = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [initialPaneWidth, setInitialPaneWidth] = useState("50%");

  useEffect(() => {
    const screenWidth = window.innerWidth;
    const calculatedWidth = Math.min(screenWidth * 0.6, "100%"); 
    setInitialPaneWidth(calculatedWidth);
  }, []);

  const handleAddToCart = (item) => {
    setSelectedItems((prevItems) => [...prevItems, item]);
  };

  const handleRemoveItem = (index) => {
    setSelectedItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems.splice(index, 1);
      return updatedItems;
    });
  };

  return (
    <div className="pos-style">
      <SplitPane
        split="vertical"
        defaultSize={initialPaneWidth}
        minSize={"20%"}
        maxSize={"90%"}
        resizerStyle={{
          background: "#dcdcdc",
          width: "10px",
          cursor: "col-resize",
        }}
      >
        <div className="left-pane">
          <LeftContent onAddToCart={handleAddToCart} />
        </div>
        <div className="right-pane">
          <RightContent selectedItems={selectedItems} onRemoveItem={handleRemoveItem} />
        </div>
      </SplitPane>
    </div>
  );
};

export default POSMain;
