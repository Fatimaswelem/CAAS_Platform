import axios from "axios";


const axiosClient = axios.create({
    baseURL: "/api",
    timeout: 5000
});

axiosClient.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem('token');

        if(token){
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config;
    }, (error) =>{
        return Promise.reject(error);
    }
)

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            if (error.response?.status === 401 && window.location.pathname !== "/login") {
                localStorage.removeItem("token");
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default axiosClient;