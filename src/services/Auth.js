import axios from "axios";
import { getRefreshToken, setAccessToken, setUserSession, removeUserSession } from "../Utils/Common";

const userLogin =async(email, password)=>{
    console.log(email+" "+password);

    return axios.post("/api/users/login",{
        "email":email,
        "password":password
    },
    {
        headers: { 
            "Content-Type": "application/json",
      }}
    ).then( async response=>{
        console.log(response);
        console.log("Response--",response.data);
        return await getUserData(response.data, email);
        // setUserSession(response.data.token, response.data.user)
        
    })
    .catch(error =>{
        // return error.response.data.message.toString;
         console.log(error.response.status );
        if (error.response.status === 403 || error.response.status === 400) {
            return "Invalid credentials."
        } else {
          return "Something went wrong..."
        }
    });

    // return apiResponse;
}

const getUserData = async(token_data, email)=>{

    console.log("Access"+ token_data.access_token);
    return axios.get("/api/users/find/email/"+email,
    {
        headers: { 
            "Content-Type": "application/json",
            "Authorization": "Bearer "+token_data.access_token

      }}
    ).then(response=>{
        console.log(response);
        console.log("Response user--",response.data);
        setUserSession(token_data, response.data);
        return "done";
    }).catch(error =>{
        return "Something went wrong...";
    });
}

const RefreshToken = async()=>{

    let refresh_token = getRefreshToken();
    return axios.get("/api/users/token/refresh",
    {
        headers: { 
            "Authorization": "Bearer "+ refresh_token
        }
    }
    ).then(response=>{
        console.log(response);
        console.log("Response user--",response.data);
        setAccessToken(response.data);
        return "done";
    }).catch(error =>{
        if (error.response) {
            if (error.response.status === 403) {
                const errorMessage = error.response.data.error_message;
                console.log("Token expired:", errorMessage);
                return "Token expired";
            } else {
                console.log("Server error:", error.response.data);
                return "Server error";
            }
        }
    });
}


export {userLogin, RefreshToken};