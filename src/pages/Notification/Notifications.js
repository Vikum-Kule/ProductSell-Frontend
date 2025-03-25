import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import {
  Grid,
  Paper,
  Typography,
  Divider,
  Box,
  Tooltip,
  IconButton,
  Button,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import TableItem from "../../../components/TableItem";
import { makeStyles } from "@mui/styles";
import {
  getSaleBillById,
  getSaleBillPaymentsById,
} from "../../../services/Sales";
import CloseIcon from "@mui/icons-material/Close";
import { useHistory } from "react-router";
import PaymentList from "../../../components/PaymentList";
import SalesmanDataComponent from "../../../components/SalesmanDataComponent";
import { retailBillSendingForApproval } from "../../../services/RetailSales";

const useStyles = makeStyles({
  container: {
    padding: "20px",
    margin: "20px",
    backgroundColor: "#f9f9f9",
  },
});

function Notifications() {
  const classes = useStyles();
  const history = useHistory();
  const [notifications, setNotifications] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [filter, setFilter] = React.useState({
    type: "",
    status: "",
  });

  const fetchData = async () => {
    setLoading(true);
    const notificationResult = await getSaleBillById(billId);
    if (notificationResult !== "Something went wrong...") {
      setNotifications(notificationResult);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Paper className={classes.container} elevation={8}>
      {isLoading ? (
        <Box
          sx={{ display: "flex", justifyContent: "center", padding: "20px" }}
        >
          <CircularProgress />
        </Box>
      ) : retailBill ? (
        <>
          <Grid>
            <Tooltip title="Close">
              <IconButton
                onClick={() => {
                  history.goBack();
                }}
                aria-label="close"
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Grid>
          <Typography
            variant="h5"
            className={classes.sectionHeader}
            align="center"
          >
            Notifications
          </Typography>
          <Divider />
        </>
      ) : (
        <Box sx={{ padding: "20px", textAlign: "center" }}>
          <Typography>No data available</Typography>
        </Box>
      )}
    </Paper>
  );
}

export default Notifications;
