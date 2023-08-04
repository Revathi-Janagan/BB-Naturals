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

const Order = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orders, setOrders] = useState([]);

  const getOrder = () => {
    axios
      .get("/api/order/getorder")
      .then((response) => {
        console.log(response);
        setOrders(response.data.data);
      })
      .catch((error) => console.error("Error fetching Orders:", error));
  };

  useEffect(() => {
    console.log("Fetching Order...");
    getOrder();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEdit = (row) => {
    // Implement the edit operation based on the row data (e.g., open an edit dialog)
    console.log("Edit row:", row);
  };

  const handleDelete = (row) => {
    // Implement the delete operation based on the row data
    console.log("Delete row:", row);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
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
            {orders
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.orderNumber}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      if (column.id === "actions") {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <button onClick={() => handleEdit(row)}>
                              Edit
                            </button>
                            <button onClick={() => handleDelete(row)}>
                              Delete
                            </button>
                          </TableCell>
                        );
                      }
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={orders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default Order;
