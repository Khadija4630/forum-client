import useFetch from "../../Hooks/useFetch";
import { useState } from "react";

const Banner = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const { data: tags, loading: tagsLoading } = useFetch("/posts/tags");

    const handleSearch = async () => {
        try {
            const response = await axiosPublic.get(`/posts/search?tag=${query}`);
            setResults(response.data);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    return (
        <div className="py-6 px-4 bg-gray-100">
            <div className="max-w-4xl mx-auto">
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
                <div className="mt-4">
                    <h2 className="text-lg font-semibold">Available Tags</h2>
                    {!tagsLoading &&
                        tags.map((tag, index) => (
                            <span
                                key={index}
                                onClick={() => setQuery(tag)}
                                className="p-2 bg-blue-200 rounded m-1 cursor-pointer"
                            >
                                {tag}
                            </span>
                        ))}
                </div>
                <div className="mt-4">
                    {results.map((post) => (
                        <div key={post._id} className="p-4 bg-white shadow mb-4">
                            <h3 className="text-lg font-bold">{post.title}</h3>
                            <p>{post.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Banner;
