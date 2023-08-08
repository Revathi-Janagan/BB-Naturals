import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";

const OrderForm = ({ columns, onClose, onSubmit, formData }) => {
  const [formValues, setFormValues] = useState({});
  const getDefaultFormValues = () => {
    return columns.reduce((initialValues, column) => ({ ...initialValues, [column.id]: "" }), {});
  };

  useEffect(() => {
    setFormValues(formData || getDefaultFormValues());
  }, [formData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit(formValues);
    onClose();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h4>{formData ? "Edit Order" : "Add New Order"}</h4>
      {columns.map((column) => (
        <TextField
          key={column.id}
          label={column.label}
          variant="outlined"
          fullWidth
          margin="normal"
          name={column.id}
          value={formValues[column.id]}
          onChange={handleInputChange}
        />
      ))}
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Save
      </Button>{" "}
      <Button variant="contained" color="primary" onClick={onClose}>
        Cancel
      </Button>
    </div>
  );
};

export default OrderForm;
