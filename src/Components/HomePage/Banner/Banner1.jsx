

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaSearch } from "react-icons/fa";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import Banner2 from "../../../assets/banner2.jpg";
import useFetchTags from "../../Hooks/useFetchTags.jsx";
import { useSearchParams } from "react-router-dom";
import useFetchPosts from "../../Hooks/useFetchBanner";
import { Link } from "react-router-dom";

const Banner = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("query") || "");
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState(searchParams.get("sort") || "newest");

    const { data: posts = [], isLoading: postsLoading, refetch } = useFetchPosts(page, 5, query, sortBy);

    useEffect(() => {
        refetch();
    }, [query, page, sortBy, refetch]);

    const navigate = useNavigate();

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const { data: tags, isLoading, isError } = useFetchTags();
    if (isLoading) return <p>Loading tags...</p>;
    if (isError) return <p>Error fetching tags!</p>;

    const onSearch = () => {
        setSearchParams({ query: encodeURIComponent(query.trim()), sort: sortBy });
    };
    const onTagClick = (tag) => {
        setQuery(tag);
        setSearchParams({ query: encodeURIComponent(tag), sort: sortBy });
    };

    
    const handleSort = (order) => {
        setSortBy(order);
        setSearchParams({ query: encodeURIComponent(query.trim()), sort: order });
    };

    return (
        <div className="dark:!text-black dark:!bg-white">
           
            <div className="relative w-full h-80 md:h-96 lg:h-[500px]">
                <img
                    src={Banner2}
                    alt="Forum Banner"
                    className="w-full h-full object-cover rounded-lg "
                    data-aos="fade-up"
                />

                <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-50">
                    <motion.h1
                        className="text-3xl md:text-4xl font-bold text-center mb-4"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Welcome to the Forum
                    </motion.h1>

                    <motion.div
                        className="w-full max-w-lg bg-white p-2 rounded-lg flex items-center shadow-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <input
                            type="text"
                            className="w-full p-2 text-black rounded-l-lg focus:outline-none dark:bg-white dark:text-black dark:outline-none"
                            placeholder="Search tags..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button
                            onClick={onSearch}
                            className="px-4 py-2 bg-lime-500 text-white rounded-r-lg hover:bg-lime-600 flex items-center  "
                        >
                            <FaSearch className="mr-1" />
                            Search
                        </button>
                    </motion.div>

                    <div className="mt-4 text-center">
                        <h2 className="text-lg font-semibold">Popular Tags</h2>
                        <div className="flex flex-wrap justify-center mt-2">
                            {tags.length > 0 ? (
                                tags.slice(0, 6).map((tag, index) => (
                                    <motion.button
                                        key={index}
                                        onClick={() => onTagClick(tag)}
                                        className="px-4 py-2 bg-lime-400 bg-opacity-30 rounded-lg m-1 cursor-pointer hover:bg-lime-600 transition"
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        #{tag}
                                    </motion.button>
                                ))
                            ) : (
                                <p className="text-gray-200">No tags found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 w-full max-w-5xl mx-auto text-center">
                <h2 className="text-xl font-semibold">Available Tags</h2>
                <div className="flex flex-wrap justify-center mt-2">
                    {tags.length > 0 ? (
                        tags.map((tag, index) => (
                            <motion.span
                                key={index}
                                onClick={() => onTagClick(tag)}
                                className="px-4 py-2 bg-lime-300  rounded-lg m-2 cursor-pointer hover:bg-lime-400 transition"
                                whileHover={{ scale: 1.1 }}
                            >
                                {tag}
                            </motion.span>
                        ))
                    ) : (
                        <p className="text-gray-600">No tags available.</p>
                    )}
                </div>
            </div>

            <div className="mt-4 w-full text-center">
                <h2 className="text-lg font-semibold">Sort Posts By</h2>
                <div className="flex justify-center space-x-4 mt-2">
                    <button
                        onClick={() => handleSort("newest")}
                        className={`px-4 py-2 bg-lime-300  rounded-lg hover:bg-lime-400 transition ${
                            sortBy === "newest" ? "bg-lime-500 text-white" : ""
                        }`}
                    >
                        Newest
                    </button>
                    <button
                        onClick={() => handleSort("popularity")}
                        className={`px-4 py-2 bg-lime-300 rounded-lg hover:bg-lime-400 transition ${
                            sortBy === "popularity" ? "bg-lime-500 text-white" : ""
                        }`}
                    >
                        <FaArrowTrendUp className="inline-block mr-1" />
                        Most Popular
                    </button>
                    <button
                        onClick={() => handleSort("least")}
                        className={`px-4 py-2 bg-lime-300 rounded-lg hover:bg-lime-400 transition ${
                            sortBy === "least" ? "bg-lime-500 text-white" : ""
                        }`}
                    >
                        <FaArrowTrendDown className="inline-block mr-1" />
                        Least Popular
                    </button>
                </div>
            </div>
           
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
                {postsLoading ? (
                    <p>Loading...</p>
                ) : posts.length > 0 ? (
                    posts.map((post) => (
                        <Link to={`/post/${post._id}`} key={post._id} onClick={() => console.log("Navigating to", post._id)}>
                        <motion.div
 className="p-5 bg-white shadow-sm mb-4 rounded-large dark:bg-zinc-900 dark:text-white  hover:shadow-md hover:scale-[1.01] transition-all duration-200  rounded-2xl border dark:border-zinc-800"
                           
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <img
                                src={post.authorPicture  || "/default-image.jpg"}
                                alt={post.title}
                                className="w-full h-40 object-cover rounded-lg mb-3"
                            />
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
                            <div>
                                <h3 className="text-lg font-medium">{post.authorName}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{post.createdAt}</p>
                                </div>
                        </motion.div>
                        </Link>
                        
                    ))
                ) : (
                    <p>No posts found.</p>
                )}
            </div>
          
        </div>
    );
};

export default Banner;
