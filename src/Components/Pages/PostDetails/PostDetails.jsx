import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";
import { FacebookShareButton, WhatsappShareButton } from 'react-share';
import { toast } from "react-toastify";

const PostDetails = () => {
    const { _id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();


    const [post, setPost] = useState(null);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [upvoteCount, setUpvoteCount] = useState(0);
    const [downvoteCount, setDownvoteCount] = useState(0);


    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data } = await axiosSecure.get(`/posts/${_id}`);
                setPost(data.post);
                setUpvoteCount(data.post.upVote);
                setDownvoteCount(data.post.downVote);
                setComments(data.comments);
            } catch (err) {
                console.error(err);
            }
        };
        fetchPost();
    }, [_id]);


    const handleCommentSubmit = async () => {
        if (!user) {
            toast.error("You must be logged in to comment.");
            return;
        }
        try {
            const { data } = await axiosSecure.post(`/posts/${_id}/comments`, { comment });
            setComments((prevComments) => [...prevComments, data.comment]);
            setComment("");
        } catch (err) {
            console.error(err);
        }
    };

    const handleVote = async (type) => {
        if (!user) {
            toast.error("You must be logged in to vote.");
            return;
        }

        try {
            const { data } = await axiosSecure.post(`/posts/${_id}/vote`, { voteType: type });
            if (type === "upvote") {
                setUpvoteCount(data.upVote);
            } else {
                setDownvoteCount(data.downVote);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const shareUrl = `${window.location.origin}/post/${_id}`;

    if (!post) return <p>Loading...</p>;

    return (
        <div className="max-w-3xl mx-auto bg-white dark:bg-zinc-900 text-gray-900 dark:text-white p-6 rounded-2xl shadow-md mt-6 space-y-6">
            <div className="flex items-center space-x-4">
                <img src={post.author.imageUrl} alt={post.author.name} className="w-14 h-14 rounded-full border border-gray-300 dark:border-zinc-700" />
                <h2 className="text-lg font-semibold">{post.author.name}</h2>
            </div>
            <div>
    <h3 className="text-2xl font-bold mb-2">{post.title}</h3>
    <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">{post.description}</p>
  </div>
            <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => <span key={index} className="px-3 py-1 text-sm bg-lime-200 dark:bg-lime-700 text-gray-800 dark:text-white rounded-full">{tag}</span>)}
            </div>
            <div className="post-time">
                <p>{new Date(post.createdAt).toLocaleString()}</p>
            </div>
            <div className="flex items-center space-x-4">
    <button
      onClick={() => handleVote("upVote")}
      className="flex items-center space-x-1 px-4 py-2 bg-green-100 dark:bg-green-800 text-green-800 dark:text-white rounded-lg hover:bg-green-200 transition"
    >
      <FaThumbsUp />
      <span>{post.upVote}</span>
    </button>
    <button
      onClick={() => handleVote("downVote")}
      className="flex items-center space-x-1 px-4 py-2 bg-red-100 dark:bg-red-800 text-red-800 dark:text-white rounded-lg hover:bg-red-200 transition"
    >
      <FaThumbsDown />
      <span>{post.downVote}</span>
    </button>
  </div>
  <div className="flex space-x-4 items-center">
    <FacebookShareButton url={shareUrl}>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
        Share on Facebook
      </button>
    </FacebookShareButton>
    <WhatsappShareButton url={shareUrl}>
      <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
        Share on WhatsApp
      </button>
    </WhatsappShareButton>
  </div>

  <div>
    <h4 className="text-xl font-semibold mb-2">Comments</h4>
    <textarea
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      placeholder="Write a comment..."
      className="w-full p-3 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white mb-3"
    />
    <button
      onClick={handleCommentSubmit}
      className="bg-lime-500 hover:bg-lime-600 text-white px-4 py-2 rounded-lg transition"
    >
      Comment
    </button>

    <div className="mt-4 space-y-3">
      {comments.map((comment, index) => (
        <div
          key={index}
          className="p-3 bg-gray-100 dark:bg-zinc-800 rounded-xl shadow-sm"
        >
          <p className="text-sm text-gray-800 dark:text-gray-200">{comment.text}</p>
        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PostDetails;
