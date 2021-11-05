import axios from "axios";
import { setUserSession } from "../Utils/Common";

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
        console.log("Response--",response.data.jwtToken);
        return await getUserData(response.data.jwtToken, email);
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

const getUserData = async(token, email)=>{
    return axios.get("/api/users/find/email/"+email,
    {
        headers: { 
            "Content-Type": "application/json",
            "Authorization": "Bearer "+token
      }}
    ).then(response=>{
        console.log(response);
        console.log("Response user--",response.data);
        setUserSession(token, response.data);
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


export {userLogin};