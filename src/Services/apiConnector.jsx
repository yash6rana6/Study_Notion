import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: process.env.BASE_URL,
});

export const apiConnector = async (method, url, bodyData = null, headers = {}, params = {}) => {
    try {
        const response = await axiosInstance({
            method,
            url,
            data: bodyData,
            headers,
            params,
        });
        return response.data; 
    } catch (error) {
        console.error("API Error:", error?.response?.data || error.message);
        return {
            success: false,
            message: error?.response?.data?.message || "Server Error",
            error: error?.response?.data || null,
        };
    }
};

// export default apiConnector;
