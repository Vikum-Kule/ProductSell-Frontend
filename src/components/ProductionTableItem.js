import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import { Grid } from "@mui/material";
import Ex_ItemUnitPrice from "../pages/Exports/ExportItem/Ex_ItemUnitPrice";
import { getImportUpdateDurationByImportId } from "../services/Import";

function ProductionTableItem({
  columns,
  rows,
  setRows,
  handleAction,
  showActions,
  enableSetting,
  setEnableSetting,
  editingRow,
  setEditingRow,
}) {

  const [duration, setDuration] = useState([]);

  const handleMethodChange = (event, rowId, unitPriceMethod) => {
    console.log(rowId);
    let updatedRows = rows.map((row) =>
      row.importId === rowId ? { ...row, unitPriceMethod } : row
    );
    console.log(updatedRows);
    setRows(updatedRows);
  };

  const handlefromDateChange = (event, rowId, fromDate) => {
    console.log(rowId);
    let updatedRows = rows.map((row) =>
      row.importId === rowId ? { ...row, fromDate } : row
    );
    console.log(updatedRows);
    setRows(updatedRows);
  };

  const handletoDateChange = (event, rowId, toDate) => {
    console.log(rowId);
    let updatedRows = rows.map((row) =>
      row.importId === rowId ? { ...row, toDate } : row
    );
    console.log(updatedRows);
    setRows(updatedRows);
  };

  const handleValueChange = (event, rowId, unitPrice) => {
    console.log(rowId);
    let updatedRows = rows.map((row) =>
      row.importId === rowId ? { ...row, unitPrice } : row
    );
    console.log(updatedRows);
    setRows(updatedRows);
  };

  //fetch updated duration of the import item
  const fetchUpdatedDuration = async (importId) => {
    let updatedDetails = await getImportUpdateDurationByImportId(importId);
    if (updatedDetails.updatedMonths) {
      let durationData = [];
      updatedDetails.updatedMonths.map((duration) => {
        let label = duration.year + "/" + duration.month;
        durationData.push(createDataForDuration(label, label));
      });
      console.log(duration);
      setDuration(durationData);
    }
  };

  function createDataForDuration(value, label) {
    return {
      value,
      label,
    };
  }

  return (
    <>
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
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        if (column.id === "action") {
                          const value = row[column.id];
                          return (
                            <Grid container spacing={1} sx={{ pt: 1.5 }}>
                              {showActions.includes("settings") ? (
                                <Grid item>
                                  <IconButton
                                    aria-label="SettingsIcon"
                                    size="small"
                                    onClick={() => {
                                      fetchUpdatedDuration(row.importId)
                                      handleAction("settings", row);
                                    }}
                                  >
                                    <SettingsIcon fontSize="inherit" />
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
                      <Ex_ItemUnitPrice
                        enableSetting={enableSetting}
                        setEnableSetting={setEnableSetting}
                        row={editingRow}
                        handleMethodChange={handleMethodChange}
                        handleValueChange={handleValueChange}
                        handleToDateChange = {handletoDateChange}
                        handleFromDateChange={handlefromDateChange}
                        duration = {duration}
                        setDuration = {setDuration}
                      />
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

export default ProductionTableItem;
