
    import { useQuery } from "@tanstack/react-query";
    import useAxiosPublic from "./useAxiosPublic";
    
    const useFetchBanner = (query = {}, page = 1, sortBy = "newest") => {
        const axiosPublic = useAxiosPublic();
    
        const fetchBannerData = async () => {
            const response = await axiosPublic.get("/posts", {
            params: { page, limit: 5, sortBy, ... query },
        });
            return response.data;
        };
    
        const { data, isLoading, error } = useQuery(
            ["posts", page, query, sortBy], // Query keys
            fetchBannerData
        );
    
        return { data, isLoading, error };
    };
    
    export default useFetchBanner;
    