import axios from "axios";

export const publicAPI = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})