
    // import { useQuery } from "@tanstack/react-query";
    // import useAxiosPublic from "./useAxiosPublic";
    
    // const useFetchBanner = (query = {}, page = 1, sortBy = "newest") => {
    //     const axiosPublic = useAxiosPublic();
    
    //     const fetchBannerData = async () => {
    //         const response = await axiosPublic.get("/posts", {
    //         params: { page, limit: 5, sortBy, ... query },
    //     });
    //         return response.data;
    //     };
    
    //     const { data, isLoading, error } = useQuery(
    //         ["posts", page, query, sortBy], // Query keys
    //         fetchBannerData
    //     );
    
    //     return { data, isLoading, error };
    // };
    
    // export default useFetchBanner;
    






    import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useFetchPosts = (page, limit, tag, sortBy) => {
    const axiosPublic = useAxiosPublic();

    const fetchPosts = async () => {
        const response = await axiosPublic.get('/posts', {
            params: { page, limit, tag, sortBy },
        });
        return response.data;
        
    };
    // } catch (error) {
    //     console.error('Error fetching posts:', error.response || error);
    //     throw error;
    //   }
    // };

    return useQuery({
        queryKey: ["posts", { page, limit, tag, sortBy }],
        queryFn: fetchPosts,
        staleTime: 5 * 60 * 1000,
        retry: 3, 
        refetchOnWindowFocus: false, 
      });
};

    // return useQuery(['posts', page, limit, tag, sortBy], fetchPosts);
// };

export default useFetchPosts;