import React from 'react';
import HeaderDash from '../HeaderDash';
import GridForDisplay from './GridForDisplay';
import Layout from '../Layout';
import ProductTable from './ProductTable';

const AdminBoard = () => {
  return (
    <Layout pageName="Products">
    {/* <GridForDisplay /> */}
    <ProductTable />

  </Layout>
  )
}

export default AdminBoard
