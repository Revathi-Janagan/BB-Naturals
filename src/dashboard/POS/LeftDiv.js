import React, { useEffect, useState } from "react";
import axios from "../../config/axios";
import StickyHeader from "../StickyHeader";
import { IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import "./LeftDiv.css";

const columnsForLeftDiv = [
  { id: "product_name", label: "Product", minWidth: 150 },
  { id: "price", label: "Price", minWidth: 100, align: "right" },
  {
    id: "add",
    label: "Add to Cart",
    minWidth: 100,
    align: "center",
    format: (value, row, handleAddToCart) => (
      <IconButton
        variant="outlined"
        onClick={() => handleAddToCart(row)}
        size="small"
      >
        <AddShoppingCartIcon />
      </IconButton>
    ),
  },
];

const LeftDiv = ({ onAddToCart }) => {
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

  const handleAddToCart = (row) => {
    onAddToCart(row);
  };

  const visibleColumnsForLeftDiv = ["product_name", "price", "add"];

  const columnsWithActions = columnsForLeftDiv.map((column) =>
    column.id === "add"
      ? {
          ...column,
          format: (value, row) => column.format(value, row, handleAddToCart),
        }
      : column
  );

  return (
    <div className="left-div-container custom-left-table">
      <StickyHeader
        className="specify-table-size"
        visibleColumns={visibleColumnsForLeftDiv}
        columns={columnsWithActions}
        products={products}
        handleAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default LeftDiv;
