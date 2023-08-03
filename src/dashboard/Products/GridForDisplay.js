import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import StickyHeader from "../StickyHeader";
import axios from "../../config/axios";

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

  return (
    <div>
      <Container style={{ marginTop: "20px" }}>
        <Row>
          <Col xs={12}>
            <StickyHeader visibleColumns={visibleColumns} columns={columns} products={products} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GridForDisplay;
