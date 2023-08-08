import React, { useState , useEffect} from "react";
import { TextField, Button } from "@mui/material";

const CustomerForm = ({ open, onClose, columns, onSubmit, customerData }) => {
  const [formData, setFormData] = useState({});
  const getDefaultFormData = () => {
    return columns.reduce((initialData, column) => ({ ...initialData, [column.id]: "" }), {});
  };

  useEffect(() => {
    setFormData(customerData || getDefaultFormData());
  }, [customerData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h4>{customerData ? "Edit Customer" : "Add New Customer"}</h4>
      {columns.map((column) => (
        <TextField
          key={column.id}
          label={column.label}
          variant="outlined"
          fullWidth
          margin="normal"
          name={column.id}
          value={formData[column.id]}
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

export default CustomerForm;
