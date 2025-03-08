
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Navigation,Pagination, Scrollbar,Autoplay,Parallax } from 'swiper/modules';
// import   {Swiper, SwiperSlide }from "swiper/react";
// import "swiper/css/bundle";
// import Banner1 from "../../../assets/banner1.jpeg";
import Banner2 from "../../../assets/banner2.jpg";
// import Banner3 from "../../../assets/banner4.jpg";
import useFetchTags from "../../Hooks/useFetchTags.jsx";
import { FaSearch } from "react-icons/fa";
import useAxiosPublic from "../../Hooks/useAxiosPublic.jsx";
// import Posts from "../../Pages/Posts/Posts.jsx";


const Banner = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  

const {data: tags , isLoading, isError} = useFetchTags();
if (isLoading) return <p>Loading tags...</p>;
    if (isError) return <p>Error fetching tags!</p>;


// const handleSortByPopularity = () => {
//     setSortBy("popularity");
//     refetch();
// };
const onTagClick = (tag) => {
  navigate(`/posts?query=${tag}`);
};

const onSearch = () => {
  navigate (`/posts?query=${query}`);
}
  return (
    <div className=" mt-1 bg-gray-100 flex flex-col items-center">
      <div className="mx-auto">
       {/* <Swiper
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
              className="w-full lg:h-80 md:h-72 h-64 object-cover rounded-lg"
            />
             <div
                className="absolute top-1/2 left-16 md:left-64 transform -translate-y-1/2 text-white text-xl md:text-2xl lg:text-3xl font-bold"
                data-swiper-parallax="-100"
              >
               Join the Biggest Community
              </div>
          </SwiperSlide>
        </Swiper> */}

        {/* </div> */}
         {/* <h1 className="md:text-2xl text-xl mt-4 font-bold mb-4">Search by Tags</h1>
         <div className="flex items-center">
         <input
          type="text"
          className="w-full p-2  border-r-0 border-l-2 border-t-2 border-b-2 rounded"
          placeholder="Search tags"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          
        />
         <button
          onClick={handleSearch}
          className=" flex border p-2 text-sm md:text-base bg-lime-300 bg-opacity-50 text-gray rounded hover:bg-lime-400 "
        >
       
        <p className="">Search</p>
        <p className="mt-1 ml-1"> <FaSearch></FaSearch> </p>
        </button> 
         </div> */}

<div className="relative">
          <img src={Banner2} alt="Banner" className="w-full h-64 md:h-72 lg:h-96 object-cover rounded-lg" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
            <h1 className="text-3xl font-bold ">Search </h1>
            <div className="flex items-center mt-4">
              <input
                type="text"
                className="w-full p-2  border-r-0 border-l-2 border-t-2 border-b-2 rounded text-black"
                placeholder="Search tags"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                
              />
              <button
                onClick={onSearch}
                className=" flex border p-2 text-sm md:text-base bg-lime-300 bg-opacity-50 text-gray rounded hover:bg-lime-400 "
              >
                <p className="">Search</p>
                <p className="mt-1 ml-1"> <FaSearch></FaSearch> </p>
              </button> 
              <div className="mt-4">
          <h2 className="text-lg font-semibold">Popular Tags</h2>
          <div className="flex flex-wrap mt-2"> {tags.length > 0 ? (
                 (typeof tags === "string" ? tags.split(",") :tags ).slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    onClick={() => onTagClick(tag)}
                    className="p-2 bg-lime-300 bg-opacity-40 rounded m-1 cursor-pointer"
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <p>No tags found.</p>
            )}
        </div></div>
            </div>
        

    {/* //                 tags.map((tagGroup, index) => (
    //                     // <div key={index} className="mb-4">
    //                     //     <h3 className="text-md font-medium">Tag Group {index + 1}</h3>
    //                         < className="flex flex-wrap">
    //                             {tagGroup.map((tag, tagIndex) => ( */}
    {/* //                                <span
    //                                     key={tagIndex}
    //                                     onClick={() => handleTagClick(tag)}
    //                                     className="p-2 bg-lime-300 bg-opacity-40 rounded m-1 cursor-pointer"
    //                                 >
    //                                     {tag}
    //                                 </>
    //                             ))}
    //                             </div>
    //     // </div>
    // ))
               

  // </div>
  {/* <div className="mt-4 bg-base-200 rounded-lg">
        <button
                    onClick={handleSortByPopularity}
                    className=" mt-2 flex p-2 bg-lime-300 bg-opacity-50 text-sm md:text-base text-gray rounded  hover:bg-lime-400 "
                >
                   <p>Sort by Popularity</p>
                    <p className="mt-1 ml-1"> <FaArrowTrendUp></FaArrowTrendUp> </p>
                </button>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
               
 
    {postsLoading ? (
      <p>Loading posts...</p>
    ) : posts.length > 0 ? (
      posts.map((post) => (
        <div key={post._id} className="p-4 bg-white shadow mb-4">
             <div className="flex items-center mb-2">
                                <img
                                    src={post.authorPicture || "/default-avatar.png"}
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
  </div> */}
                {/* <div className="mt-4 flex items-center justify-center space-x-4">
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
</div> */} 

                  </div>
                  </div>
        </div>
                  <div className="mt-4">
          <h2 className="text-lg font-semibold">Available Tags</h2>
          <div className="flex flex-wrap mt-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                // onClick={() => setQuery(tag)}
                onClick={() => handleTagClick(tag)}
                className="p-2 bg-lime-300 bg-opacity-40 rounded m-1 cursor-pointer"
              >
                {tag}
              </span>
            ))}
            {/* {tags.length > 0 ? (
                 (typeof tags === "string" ? tags.split(",") :tags ).slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    onClick={() => onTagClick(tag)}
                    className="p-2 bg-lime-300 bg-opacity-40 rounded m-1 cursor-pointer"
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <p>No tags found.</p>
            )} */}
        </div>
      </div>
</div>

    );
  };

export default Banner;
