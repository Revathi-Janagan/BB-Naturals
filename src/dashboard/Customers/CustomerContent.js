import React, { useEffect, useState } from "react";
import axios from "../../config/axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { FaEllipsisV } from "react-icons/fa";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { FaPlus } from "react-icons/fa";
import CustomerForm from "./CustomerForm";
import "./CustomerContent.css";

const columns = [
 // { id: "customer_id", label: "Id", minWidth: 100 },
  { id: "first_name", label: "First Name", minWidth: 100 },
  { id: "last_name", label: "Last Name", minWidth: 150 },
  { id: "email", label: "Email", minWidth: 200 },
  { id: "billing_address", label: "Billing Address", minWidth: 150 },
  { id: "payment_method", label: "Payment Method", minWidth: 150 },
  { id: "date_created", label: "Date Created", minWidth: 150 },
  { id: "actions", label: "Actions", minWidth: 100 },
];

const CustomerContent = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [customerList, setCustomerList] = useState([]);
  const [isFormOpen, setFormOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerData, setCustomerData] = useState(null);

  useEffect(() => {
    getCustomerList();
  }, []);

  const getCustomerList = () => {
    axios
      .get("/api/customer/getcustomer")
      .then((response) => {
        console.log("Customer List:", response.data);
        const customersWithActions = response.data.data.map((customer) => ({
          ...customer,
          actions: (
            <FaEllipsisV
              onClick={(e) => handleEllipsisClick(e, customer.customer_id)}
              style={{ cursor: "pointer" }}
            />
          ),
        }));
        setCustomerList(customersWithActions);
      })
      .catch((error) => console.error("Error fetching customers:", error));
  };

  const handleAddNew = (event) => {
    setAnchorEl(event.currentTarget);
    setFormOpen(true);
    setCustomerData(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEllipsisClick = (event, customerId) => {
    console.log("Clicked on customer ID:", customerId);
    setAnchorEl(event.currentTarget);
    setSelectedCustomer(customerId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCustomer(null);
    setFormOpen(false);
  };

  const updateCustomer = async (customerId, data) => {
    try {
      await axios.put(`/api/customer/editcustomer/${customerId}`, data);
      console.log("Data updated successfully!");
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  const handleEdit = (customerId) => {
    console.log(customerId);
    console.log(
      "Customer Data:",
      customerList.find((customer) => customer.id === customerId)
    );

    setAnchorEl(null);
    setSelectedCustomer(null);
    setFormOpen(true);
    setCustomerData(
      customerList.find((customer) => customer.id === customerId)
    );
  };

  const handleDelete = (customerId) => {
    console.log("Deleting customer with ID:", selectedCustomer);
    if (!isNaN(selectedCustomer)) {
      axios
        .delete(`/api/customer/deletefromcustomerlist/${selectedCustomer}`)
        .then((response) => {
          console.log("Customer deleted successfully:", response.data);
          getCustomerList();
        })
        .catch((error) => {
          console.error("Error deleting customer:", error);
        })
        .finally(() => {
          handleMenuClose();
        });
    } else {
      console.error("Invalid customerId:", selectedCustomer);
    }
  };

  const addNewCustomer = (customerData) => {
    axios
      .post("/api/customer/addnewcustomer", customerData)
      .then((response) => {
        console.log("New customer added:", response.data);
        getCustomerList();
        handleMenuClose();
      })
      .catch((error) => {
        console.error("Error adding new customer:", error);
      });
  };

  const handleFormSubmit = (formData) => {
    console.log("Date before conversion:", formData.date_created);
    const newCustomerData = {
      id: formData.id,
      status: "active",
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      billing_address: formData.billing_address,
      payment_method: formData.payment_method,
      date_created: new Date(formData.date_created)
        .toISOString()
        .slice(0, 19)
        .replace("T", " "),
    };

    if (customerData) {
      updateCustomer(customerData.customer_id, newCustomerData)
        .then(() => {
          getCustomerList();
        })
        .catch((error) => {
          console.error("Error updating customer:", error);
        })
        .finally(() => {
          handleMenuClose();
        });
    } else {
      addNewCustomer(newCustomerData);
    }
  };

  return (
    <>
      <button
        className="btn btn-outline add-button-new"
        type="submit"
        onClick={handleAddNew}
      >
        <FaPlus className="star-fill-icon" /> {""}Add New
      </button>
      <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "30px" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {customerList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === "actions" ? (
                          <>
                            {row.actions}
                            {/* Popover for Edit and Delete options */}
                            <Popover
                              open={
                                Boolean(anchorEl) &&
                                selectedCustomer?.id === row.id
                              }
                              anchorEl={anchorEl}
                              onClose={handleMenuClose}
                              anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                              }}
                              transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                              }}
                            >
                              <Typography
                                sx={{
                                  p: 2,
                                  display: "flex",
                                  alignItems: "center",
                                  flexDirection: "column",
                                }}
                              >
                                <div
                                  style={{
                                    cursor: "pointer",
                                    marginBottom: "8px",
                                    color: "blue",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                  onClick={() => handleEdit(row.id)}
                                >
                                  <EditIcon style={{ marginRight: "4px" }} />
                                  Edit
                                </div>
                                <div
                                  style={{
                                    cursor: "pointer",
                                    color: "red",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                 
                                  onClick={handleDelete}
                                >
                                  <DeleteIcon style={{ marginRight: "4px" }} />
                                  Delete
                                </div>
                              </Typography>
                            </Popover>
                          </>
                        ) : (
                          row[column.id]
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Add TablePagination */}
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={customerList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Popover
        open={isFormOpen}
        onClose={handleMenuClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        sx={{
          "& .MuiPopover-paper": {
            width: "500px",
            maxHeight: "600px",
          },
        }}
      >
        <CustomerForm
          columns={columns}
          onClose={handleMenuClose}
          onSubmit={handleFormSubmit}
          customerData={customerData}
        />
      </Popover>
    </>
  );
};

export default CustomerContent;
