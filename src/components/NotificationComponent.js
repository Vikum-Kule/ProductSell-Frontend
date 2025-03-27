import React from "react";
import {
  Typography,
  Paper,
  Box,
  colors,
  Chip,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const NotificationComponent = ({ notificication , deleteNotification, markAsRead}) => {
  // Function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // yyyy-MM-dd format
  };

  return (
    <Paper
      elevation={3}
      style={{
        padding: "10px",
        display: "flex",
        alignItems: "center",
        color: notificication.read ? colors.grey[500] : colors.grey[900],
        backgroundColor: notificication.read ? colors.grey[200] : null,
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12} sm={10} sx={12}>
          {notificication.type === `LOW_STOCK` ? (
            <Chip
              label="Low Stock"
              //   variant="outlined"
              size="small"
              color="primary"
              style={{
                float: "left",
                marginRight: "10px",
              }}
            />
          ) : null}
        </Grid>
        <Grid item xs={2} sm={2} sx={12} style={{ textAlign: "right" }}>
          {notificication.read ? (
            <>
              <Tooltip title="Mark as Unread">
                <IconButton aria-label="mark as unread" color="primary" onClick={() => markAsRead(notificication.id, false)}>
                  <VisibilityOffIcon />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <Tooltip title="Mark as Read">
              <IconButton aria-label="mark as read" color="primary" onClick={() => markAsRead(notificication.id, true)}>
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Delete">
            <IconButton aria-label="delete" color="primary" onClick={() => deleteNotification(notificication.id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          sx={12}
          style={{ textAlign: "left", marginLeft: "10px" }}
        >
          <Typography component="div">{notificication.message}</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          sx={12}
          style={{ textAlign: "right", marginLeft: "10px" }}
        >
          <Typography component="div" style={{ color: colors.grey[500] }}>
            {formatDate(notificication.createdAt)}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default NotificationComponent;
