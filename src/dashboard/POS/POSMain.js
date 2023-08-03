import React, { useState } from "react";
import SplitPane, { Pane } from "split-pane-react";
import LeftContent from "./LeftContent";
import RightContent from "./RightContent";
import "./POSMain.css"; 

const POSMain = () => {
  const [sizes, setSizes] = useState([750, "50%", "auto"]);
  const [selectedItems, setSelectedItems] = useState([]);

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

  const layoutCSS = {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

  };

  return (
    <div className="Pos-style" style={{ height: "75vh", position: "relative" }}>
      <SplitPane split="vertical" sizes={sizes} onChange={setSizes} className='POSMain'>
        <Pane>
          <div style={{ ...layoutCSS, background: "#ddd" }} className="left-pane">
            <LeftContent onAddToCart={handleAddToCart} />
          </div>
        </Pane>
        <Pane>
          <div style={{ ...layoutCSS, background: "#d5d7d9" }} className="right-pane">
            <RightContent selectedItems={selectedItems} onRemoveItem={handleRemoveItem} />
          </div>
        </Pane>
      </SplitPane>
    </div>
  );
};

export default POSMain;
