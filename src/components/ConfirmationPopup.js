import { Button, Grid, Modal, Paper, Stack, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import InputField from "../FormComponents/InputField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function ConfirmationPopup({
  setOpenPopup,
  openPopup,
  handleOpenPopup,
  matchingText,
  message,
  isMatched,
  setIsMatched,
}) {
  const [inputText, setInputText] = useState("");

  const handleInputTextChange = (name, val) => {
    setInputText(val);
  };

  useEffect(() => {
    setIsMatched(inputText === matchingText);
  }, [inputText, matchingText, setIsMatched]);

  const handleConfirm = () => {
    setIsMatched(true);
    handleOpenPopup();
  };

  return (
    <Grid item xs={12} sm={9} sx={{ mt: 2 }}>
      <Modal
        keepMounted
        open={openPopup}
        onClose={handleOpenPopup}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Paper sx={style}>
          <Grid container>
            <Grid item xs={12} sm={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography>{message}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <InputField
                    name="inputText"
                    value={inputText}
                    onChange={(event, newInputValue) =>
                      handleInputTextChange(event, newInputValue)
                    }
                    type="text"
                    label="Product Code"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Stack direction="row" spacing={2}>
                    <Button variant="contained" onClick={handleOpenPopup}>
                      Close
                    </Button>
                    <Button
                      variant="contained"
                      disabled={!isMatched}
                      onClick={handleConfirm}
                    >
                      Confirm
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
    </Grid>
  );
}
