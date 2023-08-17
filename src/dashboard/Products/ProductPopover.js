import React from "react";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";

const ProductPopover = ({
  columns,
  productData,
  open,
  onClose,
  onSubmit,
  onChange,
  title,
  editProduct,
  selectedImage,
  setSelectedImage,
}) => {
  return (
    <Popover open={open} onClose={onClose}>
      <form onSubmit ={(e)=>onSubmit(e) } enctype="multipart/form-data">
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        {columns.map((column) => {
          if (column.id !== "actions") {
            return (
              <div key={column.id} style={{ padding: "8px" }}>
                <Typography variant="subtitle1" gutterBottom>
                  {column.label}
                </Typography>
                {column.id === "product_image" ? (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSelectedImage(e.target.files[0])}
                  />
                ) : (
                  <input
                    type="text"
                    id={column.id}
                    value={(productData && productData[column.id]) || ""}
                    onChange={(e) =>
                      onChange(e, column, productData === editProduct)
                    }
                    style={{
                      width: "400px",
                      padding: "8px",
                      fontSize: "14px",
                      border: "1px solid #ccc",
                      borderRadius: "10px",
                    }}
                  />
                )}
              </div>
            );
          }
          return null;
        })}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button style={{ marginRight: "8px" }} onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </div>
      </form>
    </Popover>
  );
};

export default ProductPopover;