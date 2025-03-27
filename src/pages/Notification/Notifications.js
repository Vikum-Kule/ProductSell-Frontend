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
import { makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";
import { useHistory } from "react-router";
import {
  deleteNotificationById,
  getNotificationData,
  markNotificationById,
} from "../../services/Notification";
import NotificationComponent from "../../components/NotificationComponent";

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

  useEffect(() => {
    fetchData();
    // console.log("notifications: ", notifications);
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const notificationResult = await getNotificationData(
      page,
      rowsPerPage,
      filter
    );
    if (notificationResult !== "Something went wrong...") {
      console.log("Notification data: ", notificationResult);
      let notificationList = notificationResult.content;
      setNotifications(notificationList);
    }
    console.log("notifications: ", notifications);
    setLoading(false);
  };

  const deleteNotification = async (id) => {
    let result = await deleteNotificationById(id);
    if (result) {
      console.log("Notification deleted successfully");
    } else {
      console.log("Failed to delete notification");
    }
    console.log("Delete notification id: ", id);
    fetchData();
  };

  const markAsRead = async (id, mark) => {
    let result = await markNotificationById(id, mark);
    if (result) {
      console.log("Notification marked as read successfully");
    } else {
      console.log("Failed to mark notification as read");
    }
    console.log("Mark as read notification id: ", id);
    console.log("Mark as read notification mark: ", mark);
    fetchData();
  };

  return (
    <Paper className={classes.container} elevation={8}>
      {isLoading ? (
        <Box
          sx={{ display: "flex", justifyContent: "center", padding: "20px" }}
        >
          <CircularProgress />
        </Box>
      ) : (
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
          <Grid container spacing={2}>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <Grid item xs={12} sm={12} sx={12}>
                  <Box sx={{ padding: "5px" }}>
                    <NotificationComponent
                      notificication={notification}
                      deleteNotification={deleteNotification}
                      markAsRead={markAsRead}
                    />
                  </Box>
                </Grid>
              ))
            ) : (
              <Box sx={{ padding: "20px", textAlign: "center" }}>
                <Typography>No data available</Typography>
              </Box>
            )}
            <Grid item xs={12} sm={12} sx={12}></Grid>
          </Grid>
        </>
      )}
    </Paper>
  );
}

export default Notifications;
