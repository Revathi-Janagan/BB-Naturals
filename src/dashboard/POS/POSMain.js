import React, { useState } from 'react';
import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css';
import LeftContent from './LeftContent';
import RightContent from './RightContent';
import './POSMain.css'; // Import your custom CSS file

const POSMain = () => {
  const [sizes, setSizes] = useState([750, '50%', 'auto']); 
  const [selectedItems, setSelectedItems] = useState([]);

  const handleAddToCart = (item) => {
    setSelectedItems((prevItems) => [...prevItems, item]);
  };
  const handleRemoveItem = (index) =>{
    setSelectedItems((prevItems) =>{
      const updatedItems = [...prevItems];
      updatedItems.splice(index,1);
      return updatedItems;
    })

  }

  const layoutCSS = {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
   

  };

  return (
    <div style={{ height: '75vh', position: 'relative' }}>
      <SplitPane split="vertical" sizes={sizes} onChange={setSizes}>
        <Pane>
          <div style={{ ...layoutCSS, background: '#ddd' }} >
          <LeftContent onAddToCart={handleAddToCart} />
          </div>
        </Pane>
        <Pane>
          <div style={{ ...layoutCSS, background: '#d5d7d9' }}>
          <RightContent selectedItems={selectedItems} onRemoveItem = {handleRemoveItem} />
          </div>
        </Pane>
      </SplitPane>
      
    </div>
  );
};

export default POSMain;
