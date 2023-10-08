import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TextField } from "@mui/material";

function ExportProductItemWritableTable({ columns, rows, setRows, setTotalCount }) {
  const handleChange = (event, row, column_id, value) => {
    console.log(row, column_id);
    row[column_id] = value;
    row.price = (value*row.unitPrice).toFixed(2);

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
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
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
                              label={column.label}
                              id="outlined-size-small"
                              size="small"
                              type={column.type}
                              value={
                                column.isDecimal ? parseFloat(value) : value
                              }
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

export default ExportProductItemWritableTable;
