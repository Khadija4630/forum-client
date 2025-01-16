import {Helmet } from 'react-helmet-async';
import {toast } from 'react-toastify';
import { useState } from "react";
import useFetch from "../../Hooks/useFetch";

const Posts = () => {
    const [sort, setSort] = useState("new");
    const [page, setPage] = useState(1);
    const { data, loading } = useFetch(`/posts?sort=${sort}&page=${page}&limit=5`);

    return (
        <div className="p-6">
            <Helmet>
                <title>Forum || Posts</title>
            </Helmet>
            <div className="flex justify-between mb-4">
                <h2 className="text-2xl font-semibold">Posts</h2>
                <button
                    onClick={() => setSort(sort === "new" ? "popular" : "new")}
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    Sort by {sort === "new" ? "Popularity" : "Newest"}
                </button>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                data.posts.map((post) => (
                    <div key={post._id} className="p-4 bg-gray-100 shadow mt-2">
                        <h3 className="text-lg font-semibold">{post.title}</h3>
                        <p className="text-sm text-gray-600">{post.description}</p>
                        <p className="text-xs text-gray-400">{new Date(post.createdAt).toLocaleString()}</p>
                        <p>Votes: {post.upVote - post.downVote}</p>
                    </div>
                ))
            )}

            <div className="pagination mt-4 flex justify-between">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="p-2 bg-gray-300 rounded"
                >
                    Prev
                </button>
                <span className="p-2">{`Page ${page}`}</span>
                <button
                    disabled={page === data.totalPages}
                    onClick={() => setPage(page + 1)}
                    className="p-2 bg-gray-300 rounded"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Posts;