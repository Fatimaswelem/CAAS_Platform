import axiosClient from "./axiosClient"


export const GetUserHistory = async (params) => {
    const response = await axiosClient.get('/history', { params });
    return response.data;
  }