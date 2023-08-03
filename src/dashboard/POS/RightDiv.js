// RightDiv.js

import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";

const columnsForRightDiv = [
  {
    id: "remove",
    label: "-",
    minWidth: 100,
    align: "center",
    format: (value, row, onRemoveItem) => (
      <Button variant="outlined" onClick={() => onRemoveItem(row)}>
        -
      </Button>
    ),
  },
  { id: "product_name", label: "Product", minWidth: 150 },
  { id: "price", label: "Price", minWidth: 100, align: "right" },
];

const RightDiv = ({ selectedRows, onRemoveItem }) => {
  return (
    <div className="right-div-container">
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columnsForRightDiv.map((column) => (
                  <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedRows.map((row) => (
                <TableRow key={row.id}>
                  {columnsForRightDiv.map((column) => (
                    <TableCell key={column.id} align={column.align}>
                      {/* Check if the column is the "remove" column */}
                      {column.id === "remove" ? (
                        column.format && typeof column.format === "function" ? (
                          column.format(column.id, row, onRemoveItem)
                        ) : (
                          ""
                        )
                      ) : (
                        // Render the cell content for other columns
                        row[column.id]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default RightDiv;
