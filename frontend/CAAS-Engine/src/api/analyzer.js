import axiosClient from './axiosClient';

export const Analyze = (code)=>{
    return axiosClient.post("/analyze" , {sourceCode: code})
}