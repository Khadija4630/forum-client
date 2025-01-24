import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useFetchTags = () => {
    const axiosPublic = useAxiosPublic();

    const fetchTags = async () => {
        const response = await axiosPublic.get('/posts/tags');
        return response.data;
    };

    return useQuery({
        queryKey: ["tags"],
        queryFn: fetchTags,
        staleTime: 10 * 60 * 1000, 
        retry: 3, 
    });
};

export default useFetchTags;
