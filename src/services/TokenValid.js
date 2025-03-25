import jwtDecode from "jwt-decode";
import { getToken, removeUserSession } from "../Utils/Common";
import { RefreshToken } from "./Auth";

const TokenValid = async () => {
  let token = getToken();

  if (!token) {
    console.error("No token found. Redirecting to login...");
    removeUserSession();
    window.location.href = "/"; // Redirect to login
    return false;
  }

  try {
    const decodedJwt = jwtDecode(token);
    const isTokenExpired = decodedJwt.exp * 1000 < Date.now();

    if (!isTokenExpired) {
      console.log("Token is still valid.");
      return true;
    } else {
      console.log("Token expired. Attempting to refresh...");
      let refresh_result = await RefreshToken();

      if (refresh_result === "Token expired" || !refresh_result) {
        console.error("Refresh failed. Redirecting to login...");
        removeUserSession();
        window.location.href = "/"; // Redirect to login
        return false;
      }

      console.log("Token refreshed successfully.");
      return true;
    }
  } catch (error) {
    console.error("Invalid token. Redirecting to login...", error);
    removeUserSession();
    window.location.href = "/"; // Redirect to login
    return false;
  }
};

export default TokenValid;
