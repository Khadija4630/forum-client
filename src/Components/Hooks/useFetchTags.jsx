import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useFetchTags = () => {
    const axiosPublic = useAxiosPublic();

    const fetchTags = async () => {
        const response = await axiosPublic.get('/tags');
        const tagsData= response.data[0]?.tags || [];

    const flattenedTags = [...new Set(tagsData.flat())];
        return flattenedTags;
    };

    return useQuery({
        queryKey: ["tags"],
        queryFn: fetchTags,
    });
};

export default useFetchTags;
