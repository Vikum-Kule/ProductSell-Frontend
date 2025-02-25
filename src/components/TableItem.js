import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import SettingsIcon from "@mui/icons-material/Settings";
import ForwardIcon from "@mui/icons-material/Forward";
import { Grid } from "@mui/material";

function TableItem({ dropDown, columns, rows, handleAction, showActions }) {
  return (
    <>
      <Paper elevation={3} sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {dropDown ? <TableCell></TableCell> : null}
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
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        if (column.id === "action") {
                          const value = row[column.id];
                          console.log("row value", row);
                          console.log("value", value);
                          return (
                            <Grid container spacing={1} sx={{ pt: 1.5 }}>
                              {showActions.includes("view") ? (
                                <Grid item>
                                  <IconButton
                                    aria-label="view"
                                    size="small"
                                    onClick={() => {
                                      handleAction("view", value);
                                    }}
                                  >
                                    <VisibilityIcon fontSize="inherit" />
                                  </IconButton>
                                </Grid>
                              ) : null}
                              {showActions.includes("edit") ? (
                                <Grid item>
                                  <IconButton
                                    aria-label="edit"
                                    size="small"
                                    onClick={() => {
                                      handleAction("edit", value);
                                    }}
                                  >
                                    <EditIcon fontSize="inherit" />
                                  </IconButton>
                                </Grid>
                              ) : null}
                              {showActions.includes("delete") ? (
                                <Grid item>
                                  <IconButton
                                    aria-label="delete"
                                    size="small"
                                    onClick={() => {
                                      handleAction("delete", value);
                                    }}
                                  >
                                    <DeleteIcon fontSize="inherit" />
                                  </IconButton>
                                </Grid>
                              ) : null}
                              {showActions.includes("disable") ? (
                                <Grid item>
                                  <IconButton
                                    aria-label="disable"
                                    size="small"
                                    onClick={() => {
                                      handleAction("disable", value);
                                    }}
                                  >
                                    <CloseIcon fontSize="inherit" />
                                  </IconButton>
                                </Grid>
                              ) : null}
                              {showActions.includes("production") ? (
                                <Grid item>
                                  <IconButton
                                    aria-label="AddCircleOutlineIcon"
                                    size="small"
                                    onClick={() => {
                                      handleAction("production", value);
                                    }}
                                  >
                                    <AddCircleOutlineIcon fontSize="inherit" />
                                  </IconButton>
                                </Grid>
                              ) : null}
                              {showActions.includes("settings") ? (
                                <Grid item>
                                  <IconButton
                                    aria-label="SettingsIcon"
                                    size="small"
                                    onClick={() => {
                                      handleAction("settings", row);
                                    }}
                                  >
                                    <SettingsIcon fontSize="inherit" />
                                  </IconButton>
                                </Grid>
                              ) : null}
                              {showActions.includes("saleProduct") ? (
                                <Grid item>
                                  <IconButton
                                    aria-label="ForwardIcon"
                                    size="small"
                                    onClick={() => {
                                      handleAction("saleProduct", row);
                                    }}
                                  >
                                    <ForwardIcon fontSize="inherit" />
                                  </IconButton>
                                </Grid>
                              ) : null}
                            </Grid>
                          );
                        } else {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        }
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}

export default TableItem;
