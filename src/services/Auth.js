import axios from "axios";
import { setUserSession } from "../Utils/Common";

const userLogin =async(email, password)=>{
    console.log(email+" "+password);
    let apiResponse="Not";

    axios.post("/api/users/login",{
        "email":email,
        "password":password
    },
    {
        headers: { 
            "Content-Type": "application/json",
      }}
    ).then(response=>{
        console.log(response);
        setUserSession(response.data.token, response.data.user)
        return "done";
    }).catch(error =>{
        return error.response.data.message.toString;
        //  console.log(error);
        // if (error.response.statuscode == 403) {
        //     console.log(error);
        // } else {
        //   console.log("something else");
        // }
    });

    // return apiResponse;
}


export {userLogin};