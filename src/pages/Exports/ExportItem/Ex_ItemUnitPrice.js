import * as React from "react";
import Modal from "@mui/material/Modal";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import InputField from "../../../FormComponents/InputField";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  boxShadow: 20,
  p: 4,
};

export default function Ex_ItemUnitPrice({
  enableSetting,
  setEnableSetting,
  row,
  handleMethodChange,
  handleValueChange,
  handleFromDateChange,
  handleToDateChange,
  duration,
  enableDefine,
  setEnableDefine,
  setEnableDuration,
  enableDuration,
  handleQtyChange,
}) {
  const handleClose = () => {
    setEnableSetting(false);
    setSelectedMethod(null);
    setUnitPriceVal(0);
    setItemQty(0);
    setFromDate(null);
    setToDate(null);
  };
  const [selectedMethod, setSelectedMethod] = useState();
  const [unitPriceVal, setUnitPriceVal] = useState(0);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [itemQty, setItemQty] = useState(0);

  return (
    <div>
      <Modal
        open={enableSetting}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.2)", // Adjust the opacity here
          },
        }}
      >
        <Paper elevation={3} sx={style}>
          <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
            <InputLabel id="demo-select-small">Unit Price Method</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              name="_unitPriceMethod"
              value={selectedMethod ? selectedMethod : row.unitPriceMethod}
              label="Payment Method"
              onChange={(event) => {
                setSelectedMethod(event.target.value);
                handleMethodChange(event, row.importId, event.target.value);
                if (
                  event.target.value === "topMost" ||
                  event.target.value === "average"
                ) {
                  setEnableDuration(true);
                  setFromDate(null);
                  setToDate(null);
                  setEnableDefine(false);
                } else {
                  setEnableDuration(false);
                  setEnableDefine(true);
                }
              }}
            >
              <MenuItem value={"define"}>Define</MenuItem>
              <MenuItem value={"topMost"} disabled={true}>
                Top Most
              </MenuItem>
              <MenuItem value={"average"} disabled={true}>
                Average
              </MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={2}>
            {enableDefine ? (
              <Grid item xs={12} sm={12} sx={12}>
                <InputField
                  name="_total"
                  value={unitPriceVal ? unitPriceVal : row.unitPrice}
                  onChange={(event, newInputValue) => {
                    setUnitPriceVal(newInputValue);
                    handleValueChange(
                      event,
                      row.importId,
                      parseFloat(newInputValue)
                    );
                  }}
                  type="text"
                  label="Total"
                />
              </Grid>
            ) : null}
            {enableDuration ? (
              <Grid item xs={12} sm={8} sx={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} sx={12}>
                    <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                      <InputLabel id="demo-select-small">From Date</InputLabel>
                      <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        name="_fromDate"
                        value={fromDate ? fromDate : row.fromDate}
                        label="From Date"
                        onChange={(event) => {
                          setFromDate(event.target.value);
                          handleFromDateChange(
                            event,
                            row.importId,
                            event.target.value
                          );
                        }}
                      >
                        {duration.map((index) => {
                          return (
                            <MenuItem value={index.value}>
                              {index.label}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6} sx={12}>
                    <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                      <InputLabel id="demo-select-small">To Date</InputLabel>
                      <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        name="_toDate"
                        value={toDate ? toDate : row.toDate}
                        label="To Date"
                        onChange={(event) => {
                          setToDate(event.target.value);
                          handleToDateChange(
                            event,
                            row.importId,
                            event.target.value
                          );
                        }}
                      >
                        {duration.map((index) => {
                          return (
                            <MenuItem value={index.value}>
                              {index.label}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            ) : null}
            <Grid item xs={12} sm={12} sx={12}>
              <InputField
                name="_qty"
                value={itemQty ? itemQty : row.itemQty}
                onChange={(event, newInputValue) => {
                  setItemQty(newInputValue);
                  handleQtyChange(event, row.importId, parseInt(newInputValue));
                }}
                type="number"
                label="Qty"
              />
            </Grid>
          </Grid>
        </Paper>
      </Modal>
    </div>
  );
}
