export const getUser=() =>{
    const userStr = sessionStorage.getItem("user");
    if(userStr) return JSON.parse(userStr);
}

export const getToken=()=>{
    return sessionStorage.getItem("token") || null;
}

export const getRefreshToken=()=>{
    return sessionStorage.getItem("refresh_token") || null;
}

export const setUserSession=(token_data, user)=>{
    sessionStorage.setItem("token",token_data.access_token);
    sessionStorage.setItem("refresh_token",token_data.refresh_token);
    sessionStorage.setItem("user", JSON.stringify(user));
}

export const setAccessToken=(token_data)=>{
    sessionStorage.setItem("token",token_data.access_token);
}

export const removeUserSession = ()=>{
    sessionStorage.clear();
}