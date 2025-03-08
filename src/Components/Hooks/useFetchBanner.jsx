
    import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import axios from "axios";

const useFetchPosts = (page = 1, limit =5 ,query ="", sortBy= "newest") => {

    const axiosPublic = useAxiosPublic();

    const fetchPosts = async () => {
        const response = await axiosPublic.get('/posts'
            , {
            params: { page: Number(page),
                limit: Number(limit),
                query: encodeURIComponent(query),
                sortBy },
        });
        return response.data;

        
    };
    // } catch (error) {
    //     console.error('Error fetching posts:', error.response || error);
    //     throw error;
    //   }
    // };

    return useQuery({
        queryKey: ["posts",{ page, limit, query, sortBy }],
        queryFn:fetchPosts,
        staleTime: 5 * 60 * 1000,
        retry: 3, 
        refetchOnWindowFocus: false, 
      });
};



export default useFetchPosts;