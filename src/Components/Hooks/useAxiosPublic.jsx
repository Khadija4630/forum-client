import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://forum-server-12.vercel.app',
    withCredentials: true
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;