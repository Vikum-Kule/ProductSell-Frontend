import axios from "axios";
import { getRefreshToken, getToken, setAccessToken, setRefreshToken, setUserSession } from "../Utils/Common";

const userLogin =async(email, password)=>{
    console.log(email+" "+password);
    let apiResponse="Not";

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
        if (error.response.status == 403 || error.response.status == 400) {
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
        //  console.log(error);
        // if (error.response.statuscode == 403) {
        //     console.log(error);
        // } else {
        //   console.log("something else");
        // }
    });
}

const RefreshToken = async()=>{
    console.log("Refreshhhh")

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
        return "Something went wrong...";
        //  console.log(error);
    });
}


export {userLogin, RefreshToken};