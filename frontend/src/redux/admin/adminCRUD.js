import axios from "axios"
import axiosInstance from "../../axios";


export const LoginVerification=async (data)=>{
    console.log("crud data",data);
    console.log(axiosInstance)
    return axiosInstance.post("/api/adminVerification",data);
}