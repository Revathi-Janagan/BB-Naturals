import React, { useEffect, useState } from "react";
import axios from "../../config/axios";
import StickyHeader from "../StickyHeader";
import { IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import "./LeftDiv.css";

const columnsForLeftDiv = [
  { id: "product_name", label: "Product", minWidth: 150 },
  { id: "price", label: "Price", minWidth: 150, align: "right" },
  { id: "add", label: "Add to Cart", minWidth: 100, align: "center" },
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

  const handleAddToCart = (product) => {
    console.log("Adding to cart:", product);
    
    onAddToCart(product);
    
  };

  const visibleColumnsForLeftDiv = ["product_name", "price", "add"];

  return (
    <div className="left-div-container custom-left-table">
      <StickyHeader
        className="specify-table-size"
        visibleColumns={visibleColumnsForLeftDiv}
        columns={columnsForLeftDiv}
        products={products}
        onAddToCart={handleAddToCart}
      />
       
    </div>
  );
};

export default LeftDiv;
