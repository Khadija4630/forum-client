// import {toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetchPosts from "../../Hooks/useFetchBanner";
import { FaArrowTrendUp } from "react-icons/fa6";

const Posts = () => {
    const [searchParams] = useSearchParams();
    // const [query, setQuery] = useState(searchParams.get("query") || "");
    const query = decodeURIComponent(searchParams.get('query') || '');
    const [page, setPage] = useState(1); 
    const [sortBy, setSortBy] = useState("newest");
    
    const { data: posts = [], isLoading: postsLoading, refetch } = useFetchPosts(page, 5, query, sortBy);
    useEffect(() => {
      refetch();
    }, [query, page, sortBy,refetch]);


    const handleSortByPopularity = () => {
        setSortBy("popularity");
        refetch();
    };
    
    
   
    return (
              <div className="pt-8 mt-1 bg-gray-100">
              <div className="mt-4 bg-base-200 rounded-lg">
        <button
                    onClick={handleSortByPopularity}
                    className=" mt-2 flex p-2 bg-lime-300 bg-opacity-50 text-sm md:text-base text-gray rounded  hover:bg-lime-400 "
                >
                   <p>Sort by Popularity</p>
                    <p className="mt-1 ml-1"> <FaArrowTrendUp></FaArrowTrendUp> </p>
                </button>
                
                <Link to={`/post/${post._id}`} key={post._id} onClick={() => console.log("Navigating to", post._id)}>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
               
 

     { postsLoading ? (
        <p>Loading...</p> 
      ) :
     posts.map((post) => (
      
        <div className="p-5 bg-white shadow-sm mb-4 dark:bg-zinc-900 dark:text-white  hover:shadow-md hover:scale-[1.01] transition-all duration-200  rounded-2xl border dark:border-zinc-800">
             <div className="flex items-center mb-3">
                                <img
                                    src={post.authorPicture || "/default-avatar.png"}
                                    alt="Author"
                                    className="w-12 h-12 rounded-full mr-3"
                                />
                                <div>
                                <h3 className="text-lg font-bold">{post.authorName}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{post.createdAt}</p>
                                </div>
                            </div>
          <h3 className="text-lg font-bold mb-2">{post.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-2">{post.description}</p>
          {/* <p>
            <strong>Tags:</strong> {post.tags.join(", ")}
          </p>
          <p>
            <strong>Comments:</strong> {post.commentsCount}
          </p>
          <p>
            <strong>Votes:</strong> {post.upVote - post.downVote}
          </p> */}
           <div className="flex flex-wrap justify-between text-sm text-gray-500 dark:text-gray-400">
      <span>💬 {post.commentsCount} comments</span>
      <span>⬆️ {post.upVote - post.downVote} votes</span>
      <span>🏷️ {post.tags.join(", ")}</span>
    </div>
   
        </div>
       
      ))
}

  </div>
  </Link>
  </div> 
                <div className="mt-4 flex items-center justify-center space-x-4">
    <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        className={`p-3 rounded-lg font-medium mb-2 ${
            page === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-lime-500 bg-opacity-50  text-white hover:bg-lime-600 "
        }`}
        disabled={page === 1}
    >
        Prev
    </button>
    <span className="px-2 py-2 text-lg font-semibold bg-gray-100 rounded-lg">
         {page}
    </span>
    <button
        onClick={() => setPage((prev) => prev + 1)}
        className={`p-3 rounded-lg font-medium ${
            posts.length === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-lime-500 bg-opacity-50  text-white hover:bg-lime-600 mb-2"
        }`}
        disabled={posts.length === 0}
    >
        Next
    </button>
</div>

</div>
            // {/* <div className="flex justify-between mb-4">
            //     <h2 className="text-2xl font-semibold">Posts</h2>
            //     <button
            //         onClick={() => setSort(sort === "new" ? "popular" : "new")}
            //         className="bg-blue-500 text-white p-2 rounded"
            //     >
            //         Sort by {sort === "new" ? "Popularity" : "Newest"}
            //     </button>
            // </div>

            // {loading ? (
            //     <p>Loading...</p>
            // ) : (
            //     data.posts.map((post) => (
            //         <div key={post._id} className="p-4 bg-gray-100 shadow mt-2">
            //             <h3 className="text-lg font-semibold">{post.title}</h3>
            //             <p className="text-sm text-gray-600">{post.description}</p>
            //             <p className="text-xs text-gray-400">{new Date(post.createdAt).toLocaleString()}</p>
            //             <p>Votes: {post.upVote - post.downVote}</p>
            //         </div>
            //     ))
            // )}

            // <div className="pagination mt-4 flex justify-between">
            //     <button
            //         disabled={page === 1}
            //         onClick={() => setPage(page - 1)}
            //         className="p-2 bg-gray-300 rounded"
            //     >
            //         Prev
            //     </button>
            //     <span className="p-2">{`Page ${page}`}</span>
            //     <button
            //         disabled={page === data.totalPages}
            //         onClick={() => setPage(page + 1)}
            //         className="p-2 bg-gray-300 rounded"
            //     >
            //         Next
            //     </button>
            // </div> */}
    );
};

export default Posts;