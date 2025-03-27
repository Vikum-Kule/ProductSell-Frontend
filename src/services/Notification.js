import axios from "axios";
import { getToken, getUser } from "../Utils/Common";
import token_valid from "./TokenValid";

//get unread notification count
const getUnreadNotificationCount = async () => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();
    return axios
      .get("/api/notification/unread/count", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response);
        console.log("Response all--", response.data);
        return response.data;
      })
      .catch((error) => {
        // return "Something went wrong...";
        console.log("get unread notifications " + error);
        return "Something went wrong...";
      });
  }
};

//get notification data with pagination
const getNotificationData = async (offset, pageSize, filter) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();

    return axios
      .post(
        "/api/notification/all/" + offset + "/" + pageSize,
        {
          type: filter.type ? filter.type.trim() : null,
          status: filter.status ? filter.status.trim() : null,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        console.log(response);
        console.log("Response --", response.data.content);
        return response.data;
      })
      .catch(async (error) => {
        // return "Something went wrong...";
        console.log("get notification " + error);
        return "Something went wrong...";
      });
  }
};

//get sale product according to the given Id
const deleteNotificationById = async (notificationId) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();
    return axios
      .delete("/api/notification/delete/" + notificationId, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response);
        return true;
      })
      .catch((error) => {
        // return "Something went wrong...";
        console.log("Delete notification " + error);
        return false;
      });
  }
};

//get sale product according to the given Id
const markNotificationById = async (notificationId, mark) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();
    return axios
      .put(
        "/api/notification/mark/" + notificationId + "/" + mark,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        console.log(response);
        return true;
      })
      .catch((error) => {
        // return "Something went wrong...";
        console.log("Mark Notification " + error);
        return false;
      });
  }
};

export {
  getUnreadNotificationCount,
  getNotificationData,
  deleteNotificationById,
  markNotificationById,
};
