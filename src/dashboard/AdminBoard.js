import React from 'react';
import HeaderDash from './HeaderDash';
import GridForDisplay from './GridForDisplay';

const AdminBoard = () => {
  return (
    <div className="admin-dashboard">
     
     <HeaderDash pageName="Products"/>
     <GridForDisplay />
    </div>
  )
}

export default AdminBoard
