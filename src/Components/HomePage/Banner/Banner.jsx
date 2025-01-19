// import useFetch from "../../Hooks/useFetch";
import { useState } from "react";
import useFetchPosts from "../../Hooks/useFetchBanner";
import { Navigation,Pagination, Scrollbar,Autoplay,Parallax } from 'swiper/modules';
import   {Swiper, SwiperSlide }from "swiper/react";
import "swiper/css/bundle";
import Banner1 from "../../../assets/banner1.jpeg";
import Banner2 from "../../../assets/banner2.jpg";
import Banner3 from "../../../assets/banner4.jpg";
import useFetchTags from "../../Hooks/useFetchTags";


const Banner = () => {
  const [query, setQuery] = useState("");
//   // const [results, setResults] = useState([]);
const [page, setPage] = useState(1); 
const [sortBy, setSortBy] = useState("newest");

const { data: tags = [] } = useFetchTags();
const { data: posts = [], isLoading: postsLoading, refetch } = useFetchPosts(page, 5, query, sortBy);

//   const { data: tags, isLoading: tagsLoading } = useFetchBanner({});

//   // Fetching posts based on pagination, sorting, and query parameters
//   const {
//     data: posts = [],
//     isLoading,
//     error,
//   } = useFetchBanner(
//     { tag: query }, // Passing query parameters for filtering by tags
//     page,
//     sortBy // Passing sorting preference (newest/popularity)
//   );


//   if (isLoading) return <p>Loading posts...</p>;
//   if (error) return <p>Error fetching posts: {error.message}</p>;
//   // const handleSearch = async () => {
//   //     try {
//   //         const response = await axiosPublic.get(`/posts/search?tag=${query}`);
//   //         setResults(response.data);
//   //     } catch (error) {
//   //         console.error("Error fetching search results:", error);
//   //     }
//   // };

  const handleSearch = () => {
    refetch();
    setPage(1);
  };
//   const handlePagination = (newPage) => {
//     setPage(newPage);
//   };

//   const handleSort = (sortType) => {
//     setSortBy(sortType);
//   };
const handleSortByPopularity = () => {
    setSortBy("popularity");
    refetch();
};
  return (
    <div className="pt-16 mt-1 bg-gray-100">
      <div className="max-w-4xl mx-auto">
       <Swiper
          spaceBetween={30}
          slidesPerView={1}
          navigation ={true}
          loop={true}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          modules={[Navigation,Pagination,Scrollbar,Autoplay,Parallax]}
           autoplay={{
            delay: 3000, 
            disableOnInteraction: false,
          }}
          parallax={true}
          speed={600} 
          className="swiper-container"
        >
          <SwiperSlide>
            <img
              src={Banner2}
              alt="Banner 1"
              className="w-full h-64 md:h-72 lg:h-96 object-cover rounded-lg"
            />
             <div
                className="absolute top-1/2 md:left-64 left-12  transform -translate-y-1/2 text-white text-xl md:text-2xl lg:text-3xl  font-bold"
                data-swiper-parallax="-100"
              >
                Welcome to the Forum
              </div>
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={Banner3}
              alt="Banner 2"
              className="w-full lg:h-96 md:h-72 h-64 object-cover rounded-lg"
            />
             <div
                className="absolute top-1/2 left-12 md:left-64 transform -translate-y-1/2 text-white text-xl md:text-2xl lg:text-3xl font-bold"
                data-swiper-parallax="-100"
              >
                Engage in the big  Discussions
              </div>
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={Banner1}
              alt="Banner 3"
              className="w-full lg:h-96 md:h-72 h-64 object-cover rounded-lg"
            />
             <div
                className="absolute top-1/2 left-16 md:left-64 transform -translate-y-1/2 text-white text-xl md:text-2xl lg:text-3xl font-bold"
                data-swiper-parallax="-100"
              >
               Join the Biggest Community
              </div>
          </SwiperSlide>
        </Swiper>

        {/* </div> */}
         <h1 className="text-2xl font-bold mb-4">Search by Tags</h1>
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Search tags"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="mt-2 p-2 bg-blue-500 text-white rounded"
        >
          Search
        </button> 
        <button
                    onClick={handleSortByPopularity}
                    className="mt-2 ml-2 p-2 bg-green-500 text-white rounded"
                >
                    Sort by Popularity
                </button>
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Available Tags</h2>
          <div className="flex flex-wrap mt-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                onClick={() => setQuery(tag)}
                className="p-2 bg-blue-200 rounded m-1 cursor-pointer"
              >
                {tag}
              </span>
            ))}
        </div>

  </div>
  <div className="mt-4">
    {postsLoading ? (
      <p>Loading posts...</p>
    ) : posts.length > 0 ? (
      posts.map((post) => (
        <div key={post._id} className="p-4 bg-white shadow mb-4">
             <div className="flex items-center mb-2">
                                <img
                                    src={post.authorImage || "/default-avatar.png"}
                                    alt="Author"
                                    className="w-12 h-12 rounded-full mr-3"
                                />
                                <div>
                                <h3 className="text-lg font-bold">{post.authorName}</h3>
                                    <p className="text-sm text-gray-500">{post.createdAt}</p>
                                </div>
                            </div>
          <h3 className="text-lg font-bold">{post.title}</h3>
          <p>{post.description}</p>
          <p>
            <strong>Tags:</strong> {post.tags.join(", ")}
          </p>
          <p>
            <strong>Comments:</strong> {post.commentsCount}
          </p>
          <p>
            <strong>Votes:</strong> {post.upVote - post.downVote}
          </p>
        </div>
      ))
    ) : (
      <p>No results found</p>
    )}
  </div>
    <div className="mt-4 flex justify-center">
                    <button
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        className="p-2 bg-gray-300 rounded mr-2"
                        disabled={page === 1}
                    >
                        Previous
                    </button>
                    <span>Page {page}</span>
                    <button
                        onClick={() => setPage((prev) => prev + 1)}
                        className="p-2 bg-gray-300 rounded ml-2"
                    >
                        Next
                    </button>
                </div>
</div>
</div>

    );
    };

export default Banner;
