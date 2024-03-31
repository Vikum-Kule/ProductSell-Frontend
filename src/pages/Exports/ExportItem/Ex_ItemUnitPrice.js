import * as React from "react";
import Modal from "@mui/material/Modal";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tooltip,
} from "@mui/material";
import InputField from "../../../FormComponents/InputField";
import { useState, useEffect } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

export default function Ex_ItemUnitPrice({
  enableSetting,
  setEnableSetting,
  row,
  handleMethodChange,
  handleValueChange,
  handleFromDateChange,
  handleToDateChange,
  duration,
}) {
  const handleClose = () => {
    setEnableSetting(false);
    setSelectedMethod(null);
    setUnitPriceVal(0);
    setFromDate(null);
    setToDate(null);
  };
  const [selectedMethod, setSelectedMethod] = useState();
  const [unitPriceVal, setUnitPriceVal] = useState(0);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();

  return (
    <div>
      <Modal
        open={enableSetting}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
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
              }}
            >
              <MenuItem value={null}></MenuItem>
              <MenuItem value={"define"}>Define</MenuItem>
              <MenuItem value={"topMost"}>Top Most</MenuItem>
              <MenuItem value={"average"}>Average</MenuItem>
            </Select>
          </FormControl>
          {selectedMethod === "define" || row.unitPriceMethod === "define" ? (
            <>
              <Grid item xs={12} sm={3} sx={12}>
                <InputField
                  name="_total"
                  value={unitPriceVal ? unitPriceVal : row.unitPrice}
                  onChange={(event, newInputValue) => {
                    setUnitPriceVal(newInputValue);
                    handleValueChange(
                      event,
                      row.importId,
                      parseInt(newInputValue)
                    );
                  }}
                  type="text"
                  label="Total"
                />
              </Grid>
            </>
          ) : null}
          {duration.length !== 0 || row.fromDate || row.toDate ? (
            <Grid item xs={12} sm={12} sx={12}>
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
                          <MenuItem value={index.value}>{index.label}</MenuItem>
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
                          <MenuItem value={index.value}>{index.label}</MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          ) : null}
        </Paper>
      </Modal>
    </div>
  );
}
