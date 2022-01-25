import axios from "axios";
import {getToken} from "../Utils/Common"

const getExportProducts= async (offset, pageSize, search)=>{
    
    let token = getToken();
    return axios.post("/api/Export/product/all/"+ offset +"/"+pageSize,{
        "search":search.trim()
    },
    {
        headers: { 
            "Content-Type": "application/json",
            "Authorization": "Bearer "+token
      }}
    ).then(response=>{
        console.log(response);
        console.log("Response --",response.data.content);
        return response.data;
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

export {getExportProducts};