import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import StickyHeader from "../StickyHeader";
import axios from "../../config/axios";
import { Button } from "@mui/material";

const GridForDisplay = () => {
  const visibleColumns = [
    "product_name",
    "stock",
    "categories",
    "price",
    "regular_price",
    "sale_price",
  ];
  const columns = [
    { id: "product_name", label: "Product Name", align: "left", minWidth: 170 },
    { id: "stock", label: "Stock", align: "right", minWidth: 100 },
    { id: "categories", label: "Categories", align: "left", minWidth: 170 },
    { id: "price", label: "Price", align: "right", minWidth: 100 },
    { id: "regular_price", label: "Regular Price", align: "right", minWidth: 100 },
    { id: "sale_price", label: "Sale Price", align: "right", minWidth: 100 },
  ];

  const [products, setProducts] = useState([]);
  const [newRow, setNewRow] = useState(null);

  const getProducts = () => {
    axios
      .get("/api/products/getproducts")
      .then((response) => {
        console.log(response);
        setProducts(response.data.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  };

  useEffect(() => {
    console.log("Fetching products...");
    getProducts();
  }, []);

  const handleAddRow = () => {
    const newRowData = {
      product_name: "New Product",
      stock: 0,
      categories: "",
      price: 0,
      regular_price: 0,
      sale_price: 0,
    };
    setNewRow(newRowData);
  };

  const handleSaveRow = () => {
    if (newRow) {
      setProducts([...products, newRow]);
      setNewRow(null);
    }
  };

  const handleEditRow = (index, updatedRowData) => {
    const updatedProducts = [...products];
    updatedProducts[index] = updatedRowData;
    setProducts(updatedProducts);
  };

  const handleDeleteRow = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };
  const handleAddRowWithinTable = (newRowData) => {
    setProducts([...products, newRowData]);
    setNewRow(null);
  };

  return (
    <div>
      <Button onClick={handleAddRow}>ADD</Button>
      <Button onClick={handleSaveRow}>Save</Button>
      <Button>Edit</Button>
      <Container style={{ marginTop: "20px" }}>
        <Row>
          <Col xs={12}>
            <StickyHeader
              visibleColumns={visibleColumns}
              columns={columns}
              products={products}
              newRow={newRow}
              onEditRow={handleEditRow}
              onDeleteRow={handleDeleteRow}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GridForDisplay;
