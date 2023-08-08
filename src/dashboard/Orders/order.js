import React, { useState, useEffect } from "react";
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
import OrderForm from "./OrderForm";

const columns = [
  { id: "status", label: "Status", minWidth: 100 },
  { id: "order_number", label: "Order Number", minWidth: 100 },
  { id: "customer_name", label: "Customer", minWidth: 150 },
  { id: "billing_address", label: "Billing Address", minWidth: 200 },
  { id: "date_created", label: "Date Created", minWidth: 150 },
  { id: "payment_method", label: "Payment Method", minWidth: 150 },
  { id: "total", label: "Total", minWidth: 100, align: "right" },
  { id: "actions", label: "Actions", minWidth: 100, align: "right" },
];

const OrderContent = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderList, setOrderList] = useState([]);
  const [isFormOpen, setFormOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    getOrderList();
  }, []);

  const getOrderList = () => {
    axios
      .get("/api/order/getorder")
      .then((response) => {
        console.log("Order List:", response.data);
        const ordersWithActions = response.data.data.map((order) => ({
          ...order,
          actions: (
            <FaEllipsisV
              onClick={(e) => handleEllipsisClick(e, order.order_id)}
              style={{ cursor: "pointer" }}
            />
          ),
        }));
        setOrderList(ordersWithActions);
      })
      .catch((error) => console.error("Error fetching orders:", error));
  };

  const handleAddNew = (event) => {
    setAnchorEl(event.currentTarget);
    setFormOpen(true);
    setOrderData(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEllipsisClick = (event, orderId) => {
    console.log("Clicked on order number:", orderId);
    setAnchorEl(event.currentTarget);
    setSelectedOrder(orderId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedOrder(null);
    setFormOpen(false);
  };

  const updateOrder = async (orderId, data) => {
    try {
      await axios.put(`/api/order/editorder/${orderId}`, data);
      console.log("Data updated successfully!");
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const handleEdit = (orderID) => {
    console.log(orderID);
    console.log(
      "Order Data:",
      orderList.find((order) => order.order_id === orderID)
    );

    setAnchorEl(null);
    setSelectedOrder(null);
    setFormOpen(true);
    setOrderData(orderList.find((order) => order.order_id === orderID));
  };

  const handleDelete = (selectedOrder) => {
    console.log("Deleting order with order_id:", selectedOrder);
    if (!isNaN(selectedOrder)) {
      axios
        .delete(`/api/order/deletefromorderlist/${selectedOrder}`)
        .then((response) => {
          console.log("Order deleted successfully:", response.data);
          getOrderList();
        })
        .catch((error) => {
          console.error("Error deleting order:", error);
        })
        .finally(() => {
          handleMenuClose();
        });
    } else {
      console.error("Invalid order_id:", selectedOrder);
    }
  };

  const addNewOrder = (orderData) => {
    axios
      .post("/api/order/addneworder", orderData)
      .then((response) => {
        console.log("New order added:", response.data);
        getOrderList();
        handleMenuClose();
      })
      .catch((error) => {
        console.error("Error adding new order:", error);
      });
  };

  const handleFormSubmit = (formData) => {
    console.log("Date before conversion:", formData.date_created);
    const newOrderData = {
      order_id: selectedOrder,
      status: formData.status,
      customer_name: formData.customer_name,
      order_number: formData.order_number,
      billing_address: formData.billing_address,
      date_created: new Date(formData.date_created)
        .toISOString()
        .slice(0, 19)
        .replace("T", " "),
      payment_method: formData.payment_method,
      total: formData.total,
    };

    if (orderData) {
      updateOrder(orderData.order_id, newOrderData) // Use order_id here
        .then(() => {
          getOrderList();
        })
        .catch((error) => {
          console.error("Error updating order:", error);
        })
        .finally(() => {
          handleMenuClose();
        });
    } else {
      addNewOrder(newOrderData);
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
              {orderList
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
                                selectedOrder?.order_id === row.id
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
                                  onClick={() => handleEdit(row.order_id)}
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
                                  onClick={() => handleDelete(row.order_id)}
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
          count={orderList.length}
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
        <OrderForm
          columns={columns}
          onClose={handleMenuClose}
          onSubmit={handleFormSubmit}
          formData={orderData}
        />
      </Popover>
    </>
  );
};

export default OrderContent;
