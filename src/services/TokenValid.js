import jwtDecode from "jwt-decode";
import { getToken } from "../Utils/Common";
import { RefreshToken } from "./Auth";

const tocken_valid = async()=>{
    let token = getToken();
    //decode the access tocken
    const decodedJwt = jwtDecode(token);
    console.log("decode data"+decodedJwt.exp + " "+(Date.now()-(10*1000)))

    //check the expiration of the decoded tocken in miliseconds
    if (decodedJwt.exp*1000 > (Date.now()-(10*1000))) {
      console.log("Not required to Refresh ");
        return true;
     }
     else{
        let refresh_result = await RefreshToken();
        console.log("Refresh Result "+refresh_result);
        return true;
     }
}


export default tocken_valid

