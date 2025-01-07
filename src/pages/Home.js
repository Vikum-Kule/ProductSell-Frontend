import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  container: {
    padding: "20px",
  },
});

// Dummy Data
const dummyData = {
  lastDay: {
    profitData: [
      { time: "Morning", profit: 300 },
      { time: "Afternoon", profit: 500 },
      { time: "Evening", profit: 400 },
    ],
    productData: [
      { product: "Product A", sales: 40 },
      { product: "Product B", sales: 70 },
      { product: "Product C", sales: 30 },
    ],
  },
  lastMonth: {
    profitData: [
      { week: "Week 1", profit: 1200 },
      { week: "Week 2", profit: 2100 },
      { week: "Week 3", profit: 800 },
      { week: "Week 4", profit: 1600 },
    ],
    productData: [
      { product: "Product A", sales: 400 },
      { product: "Product B", sales: 700 },
      { product: "Product C", sales: 300 },
    ],
  },
  lastFiveMonths: {
    profitData: [
      { month: "Jan", profit: 1200 },
      { month: "Feb", profit: 2100 },
      { month: "Mar", profit: 800 },
      { month: "Apr", profit: 1600 },
      { month: "May", profit: 1900 },
    ],
    productData: [
      { product: "Product A", sales: 1200 },
      { product: "Product B", sales: 1500 },
      { product: "Product C", sales: 800 },
    ],
  },
};

function Home() {
  const classes = useStyles();
  const [selectedPeriod, setSelectedPeriod] = useState("lastDay");
  const [profitData, setProfitData] = useState([]);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    // Load data based on selected period
    const data = dummyData[selectedPeriod];
    setProfitData(data.profitData);
    setProductData(data.productData);
  }, [selectedPeriod]);

  return (
    <Paper className={classes.container} elevation={8}>
      <Grid container spacing={2}>
        {/* Dropdown for Date Adjustment */}
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Time Period</InputLabel>
            <Select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <MenuItem value="lastDay">Last Day</MenuItem>
              <MenuItem value="lastMonth">Last Month</MenuItem>
              <MenuItem value="lastFiveMonths">Last 5 Months</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Profit Trend Chart */}
        <Grid item xs={12} sm={6} md={8}>
          <Card>
            <CardContent>
              <Typography
                gutterBottom
                sx={{ color: "text.secondary", fontSize: 14 }}
              >
                Profit Trend ({selectedPeriod})
              </Typography>
              <LineChart width={500} height={300} data={profitData}>
                <CartesianGrid stroke="#ccc" />
                <XAxis
                  dataKey={
                    selectedPeriod === "lastDay"
                      ? "time"
                      : selectedPeriod === "lastMonth"
                      ? "week"
                      : "month"
                  }
                />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="profit" stroke="#8884d8" />
              </LineChart>
            </CardContent>
          </Card>
        </Grid>

        {/* Most Sold Products Chart */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography
                gutterBottom
                sx={{ color: "text.secondary", fontSize: 14 }}
              >
                Most Sold Products ({selectedPeriod})
              </Typography>
              <BarChart width={300} height={200} data={productData}>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="product" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#8884d8" />
              </BarChart>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Home;
