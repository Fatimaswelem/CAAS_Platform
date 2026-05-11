import axiosClient from "./axiosClient"


export const Login = (data)=>{
    return axiosClient.post("/auth/login" , data);
}

export const Register = (data)=>{
    return axiosClient.post("/auth/register" , data);
}