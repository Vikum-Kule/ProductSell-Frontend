import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Slider,
} from "@mui/material";
import InputField from "../../../FormComponents/InputField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function Ex_ItemUnitPrice({ enableSetting, setEnableSetting }) {
  const handleClose = () => setEnableSetting(false);

  const [unitPriceDetails, setUnitPriceDetails] = React.useState({
    _method: "",
    _dateRange: 0,
    _unitPrice: 0.0,
  });
  const handlePaymentChange = (event) => {
    console.log(event);
    setUnitPriceDetails({
      ...unitPriceDetails,
      _method: event.target.value,
    });
    console.log(unitPriceDetails._method);
  };

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
              value={unitPriceDetails._method}
              label="Payment Method"
              onChange={handlePaymentChange}
            >
              <MenuItem value={"define"}>Define</MenuItem>
              <MenuItem value={"topMost"}>Top Most</MenuItem>
              <MenuItem value={"average"}>Average</MenuItem>
            </Select>
          </FormControl>
          <Slider
            aria-label="Temperature"
            defaultValue={30}
            getAriaValueText={null}
            valueLabelDisplay="auto"
            shiftStep={30}
            step={10}
            marks
            min={10}
            max={110}
          />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Paper>
      </Modal>
    </div>
  );
}
