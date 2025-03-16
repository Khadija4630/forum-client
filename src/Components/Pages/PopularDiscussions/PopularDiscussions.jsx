import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const discussions = [
    { id: 1, title: "How to learn React?", user: "Alice", replies: 15 },
    { id: 2, title: "Best JavaScript Libraries in 2024", user: "Bob", replies: 25 },
    { id: 3, title: "Node.js vs Django", user: "Charlie", replies: 18 },
];

const PopularDiscussions = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto text-center">
                <h2 className="text-4xl font-bold mb-6">Trending Discussions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {discussions.map((discussion) => (
                        <div
                            key={discussion.id}
                            className="bg-gray-100 p-6 rounded-lg shadow-md"
                            data-aos="fade-up"
                        >
                            <h3 className="text-2xl font-semibold">{discussion.title}</h3>
                            <p className="text-sm text-gray-600">Started by {discussion.user}</p>
                            <p className="text-blue-500">{discussion.replies} Replies</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PopularDiscussions;
