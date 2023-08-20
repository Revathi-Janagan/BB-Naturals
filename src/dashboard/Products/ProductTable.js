import React, { useState, useEffect } from "react";
import axios from "../../config/axios";
import { Button } from "@mui/material";
import StickyHeader from "../StickyHeader";
import ProductPopover from "./ProductPopover";

const ProductTable = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const visibleColumns = [
    "product_image",
    "product_name",
    "stock",
    "categories",
    "price",
    "regular_price",
    "sale_price",
    "actions",
  ];

  const columns = [
    {
      id: "product_image",
      label: "Product Image",
      align: "left",
      minWidth: 100,
      render: (row) => {
        const imageUrl = row.product_image;
        console.log("Image URL:", imageUrl);
        return (
          <img
            src={imageUrl}
            alt={row.product_name}
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
          />
        );
      },
    },
    { id: "product_name", label: "Product Name", align: "left", minWidth: 170 },
    { id: "stock", label: "Stock", align: "right", minWidth: 100 },
    { id: "categories", label: "Categories", align: "left", minWidth: 170 },
    { id: "price", label: "Price", align: "right", minWidth: 100 },
    {
      id: "regular_price",
      label: "Regular Price",
      align: "right",
      minWidth: 100,
    },
    { id: "sale_price", label: "Sale Price", align: "right", minWidth: 100 },
    {
      id: "actions",
      label: "Actions",
      minWidth: 100,
      align: "right",
      render: (row) => (
        <div>
          <Button onClick={() => handleEditProduct(row)}>Edit</Button>
          <Button onClick={() => handleDeleteProduct(row)}>Delete</Button>
          <Button onClick={() => handleOpenEditPopover(row)}>
            Edit in Popover
          </Button>
        </div>
      ),
    },
  ];
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({});
  const [editProduct, setEditProduct] = useState(null);
  const [isAddPopoverOpen, setIsAddPopoverOpen] = useState(false);
  const [isEditPopoverOpen, setIsEditPopoverOpen] = useState(false);

  const getProducts = () => {
    try {
      axios
        .get("/api/products/getproducts")
        .then((response) => {
          setProducts(response.data.data);
        })
        .catch((error) => {
          console.error("Error handling response:", error);
        });
    } catch (error) {
      console.error("Error making request:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleOpenAddPopover = () => {
    setNewProduct({}); // Reset the new product form fields
    setIsAddPopoverOpen(true);
  };

  const handleCloseAddPopover = () => {
    setIsAddPopoverOpen(false);
  };

  const handleOpenEditPopover = (product) => {
    setEditProduct(product);
    setIsEditPopoverOpen(true);
  };

  const handleCloseEditPopover = () => {
    setIsEditPopoverOpen(false);
    setEditProduct(null);
  };

  const handleInputChange = (e, column, isEditPopover) => {
    const { id, value } = e.target;
    if (isEditPopover) {
      setEditProduct((prevEditProduct) => ({
        ...prevEditProduct,
        [id]: value,
      }));
    } else {
      setNewProduct((prevNewProduct) => ({
        ...prevNewProduct,
        [id]: value,
      }));
    }
  };

  const handleSaveNewProduct = async (e) => {
    e.preventDefault();
    if (Object.keys(newProduct).length > 0) {
      try {
        const formData = new FormData();
        formData.append("product_image", selectedImage);
        formData.append("product_name", newProduct.product_name);
        formData.append("stock", newProduct.stock);
        formData.append("categories", newProduct.categories);
        formData.append("price", newProduct.price);
        formData.append("regular_price", newProduct.regular_price);
        formData.append("sale_price", newProduct.sale_price);
        const response = await axios.post(
          "/api/products/addnewproducts",
          formData
        );
        console.log("Response from server:", response.data);
        getProducts();

        console.log("New product added successfully:", response.data);
        setIsAddPopoverOpen(false);
        setNewProduct({});
        setSelectedImage(null);
      } catch (error) {
        console.error("Error adding new product:", error);
      }
    }
  };

  const handleSaveEditedProduct = async (e) => {
    e.preventDefault();
    if (editProduct) {
      try {
        const response = await axios.put(
          `/api/products/editproductlist/${editProduct.id}`,
          editProduct
        );
        console.log("Product updated successfully:", response.data);
        getProducts();
        handleCloseEditPopover();
      } catch (error) {
        console.error("Error updating product:", error);
      }
    }
  };

  const handleEditProduct = (product) => {
    setEditProduct(product);
    setIsEditPopoverOpen(true);
  };

  const handleDeleteProduct = async (product) => {
    console.log("Deleting product:", product);
    try {
      const response = await axios.delete(
        `/api/products/deletefromproductlist/${product.id}`
      );
      console.log("Product deleted successfully:", response.data);
      getProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={(e) => {
          e.preventDefault();
          handleOpenAddPopover();
        }}
      >
        ADD NEW PRODUCT
      </Button>
      <StickyHeader
        visibleColumns={visibleColumns}
        columns={columns}
        products={products}
        handleOpenEditPopover={handleOpenEditPopover}
        handleDeleteProductAction={handleDeleteProduct}
      />

      {/* Add Product Popover */}
      <ProductPopover
        columns={columns}
        productData={newProduct}
        open={isAddPopoverOpen}
        onClose={handleCloseAddPopover}
        onSubmit={handleSaveNewProduct}
        onChange={(e, column, isEditPopover) =>
          handleInputChange(e, column, isEditPopover)
        }
        title="Add Product"
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />

      {/* Edit Product Popover */}
      <ProductPopover
        columns={columns}
        productData={editProduct}
        open={isEditPopoverOpen}
        onClose={handleCloseEditPopover}
        onSubmit={handleSaveEditedProduct}
        onChange={handleInputChange}
        title="Edit Product"
        editProduct={editProduct}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
    </div>
  );
};

export default ProductTable;
