import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Paper,
} from "@mui/material";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const ProfitCard = ({ totalPrice, profit, profitMargin }) => {
  const isProfitMarginPositive = profitMargin >= 0;
  const displayMargin = Math.min(Math.abs(profitMargin), 100); // Cap the circular progress at 100%

  return (
    <Paper
      elevation={3}
      style={{
        width: 400,
        padding: "20px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <CardContent style={{ flex: 1 }}>
        <Typography variant="h6" component="div">
          Total Price (Rs):
        </Typography>
        <Typography variant="h5" color="primary">
          Rs {totalPrice.toLocaleString()}
        </Typography>
        <Typography variant="h6" component="div">
          Total Profit (Rs):
        </Typography>
        <Typography variant="h5" color="primary">
          Rs {profit.toLocaleString()}
        </Typography>
      </CardContent>

      <Box style={{ position: "relative", display: "inline-flex" }}>
        {/* Background Circle */}
        <CircularProgress
          variant="determinate"
          value={100}
          size={150}
          thickness={4}
          style={{ color: "#e0e0e0", position: "absolute" }}
        />

        {/* Dynamic Circular Progress */}
        <CircularProgress
          variant="determinate"
          value={displayMargin}
          size={150}
          thickness={4}
          color={isProfitMarginPositive ? "success" : "error"}
          sx={{
            transform: `rotate(${isProfitMarginPositive ? -90 : 90}deg)`,
          }}
        />

        {/* Center Content */}
        <Box
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h6"
            component="div"
            color={isProfitMarginPositive ? "green" : "red"}
            style={{ display: "flex", alignItems: "center" }}
          >
            {profitMargin}%{" "}
            {isProfitMarginPositive ? (
              <ArrowDropUpIcon fontSize="large" />
            ) : (
              <ArrowDropDownIcon fontSize="large" />
            )}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default ProfitCard;
