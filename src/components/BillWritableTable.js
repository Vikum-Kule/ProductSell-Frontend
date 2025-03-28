import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TextField } from "@mui/material";

function BillWritableTable({ columns, rows, setRows, setTotalCount }) {
  const handleChange = (event, row, column_id, value) => {
    console.log("rowQTY: " + row.qty);
    if (column_id === "unitPrice" && row.qty !== 0) {
      console.log("unitPrice");
    } else if (column_id === "price" && row.qty !== 0) {
      console.log("price");
    } else if (
      column_id === "discountPerItem" &&
      row.qty !== 0 &&
      row.price !== 0
    ) {
      console.log("discountPerItem");
    }
    row[column_id] = value;
    setRows([...rows]);
  };

  return (
    <Paper elevation={3} sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontSize: "0.8rem" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody style={{ fontSize: 80 }}>
            {rows
              // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{fontSize: '0.8rem', padding: '10px'}}
                        >
                          {column.editable ? (
                            <TextField
                              onChange={(event) =>
                                handleChange(
                                  event,
                                  row,
                                  column.id,
                                  event.target.value
                                )
                              }
                              label={""}
                              id="outlined-size-small"
                              size="small"
                              type={column.type}
                              value={
                                column.isDecimal ? parseFloat(value) : value
                              }
                              disabled={
                                column.id !== "qty" && row.qty === 0
                                  ? true
                                  : false
                              }
                              InputProps={{
                                sx: {
                                  height: 40, // controls the total input height
                                  fontSize: "0.8rem", // optional: controls text size
                                  padding: "0 10px", // optional: padding inside input
                                },
                              }}
                            />
                          ) : column.editable === false &&
                            column.format &&
                            typeof value === "number" ? (
                            column.format(value)
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default BillWritableTable;
