import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosSecure } from "../utils/axiosInstances"; // your reusable axios hook
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FacebookShareButton, WhatsappShareButton } from 'react-share';
import { toast } from "react-toastify";

const PostDetails = () => {
    const { _id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [post, setPost] = useState(null);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [upvoteCount, setUpvoteCount] = useState(0);
    const [downvoteCount, setDownvoteCount] = useState(0);

    // Fetch post details
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data } = await axiosSecure.get(`/posts/${_id}`);
                setPost(data.post);
                setUpvoteCount(data.post.upvote);
                setDownvoteCount(data.post.downvote);
                setComments(data.comments);
            } catch (err) {
                console.error(err);
            }
        };
        fetchPost();
    }, [_id]);

    // Handle comment submission
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

    // Handle voting
    const handleVote = async (type) => {
        if (!user) {
            toast.error("You must be logged in to vote.");
            return;
        }

        try {
            const { data } = await axiosSecure.post(`/posts/${_id}/vote`, { voteType: type });
            if (type === "upvote") {
                setUpvoteCount(data.upvoteCount);
            } else {
                setDownvoteCount(data.downvoteCount);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const shareUrl = `${window.location.origin}/post/${_id}`;

    if (!post) return <p>Loading...</p>;

    return (
        <div className="post-details">
            <div className="author-info">
                <img src={post.author.imageUrl} alt={post.author.name} className="author-image" />
                <h2>{post.author.name}</h2>
            </div>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <div className="tags">
                {post.tags.map((tag, index) => <span key={index} className="tag">{tag}</span>)}
            </div>
            <div className="post-time">
                <p>{new Date(post.createdAt).toLocaleString()}</p>
            </div>
            <div className="vote-buttons">
                <button onClick={() => handleVote("upvote")}><FaThumbsUp /> {upvoteCount}</button>
                <button onClick={() => handleVote("downvote")}><FaThumbsDown /> {downvoteCount}</button>
            </div>
            <div className="share-buttons">
                <FacebookShareButton url={shareUrl}>
                    Share on Facebook
                </FacebookShareButton>
                <WhatsappShareButton url={shareUrl}>
                    Share on WhatsApp
                </WhatsappShareButton>
            </div>

            <div className="comment-section">
                <h4>Comments</h4>
                <textarea 
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write a comment..."
                />
                <button onClick={handleCommentSubmit}>Comment</button>
                <div className="comments">
                    {comments.map((comment, index) => (
                        <div key={index} className="comment">
                            <p>{comment.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PostDetails;
