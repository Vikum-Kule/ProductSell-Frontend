import axios from "axios";
import {getToken} from "../Utils/Common"

const getImportData = async (offset, pageSize)=>{
    let token = getToken();
    return axios.get("/api/import/all/"+ offset +"/"+pageSize,
    {
        headers: { 
            "Content-Type": "application/json",
            "Authorization": "Bearer "+token
      }}
    ).then(response=>{
        console.log(response);
        console.log("Response --",response.data.content);
        return response.data.content;
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

const getAllImportData = async ()=>{
    let token = getToken();
    return axios.get("/api/import/all",
    {
        headers: { 
            "Content-Type": "application/json",
            "Authorization": "Bearer "+token
      }}
    ).then(response=>{
        console.log(response);
        console.log("Response all--",response.data);
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
export {getImportData, getAllImportData};