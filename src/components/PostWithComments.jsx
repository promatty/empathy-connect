import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Comment from './Comment';
import CommentForm from './CommentForm';

export default function PostWithComments() {
    const { postId } = useParams(); 
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchPostAndComments = async () => {
            try {
                const postResponse = await axios.get(`http://localhost:5000/posts/${postId}`);
                setPost(postResponse.data);

                const commentsResponse = await axios.get(`http://localhost:5000/comments/post/${postId}`);
                setComments(commentsResponse.data);
            } catch (error) {
                console.error('Error fetching post or comments:', error);
            }
        };

        fetchPostAndComments();
    }, [postId]);

    const handleCommentAdded = (newComment) => {
        setComments((prevComments) => [...prevComments, newComment]);
    };

    const handleCommentDeleted = (commentId) => {
        setComments((prevComments) => prevComments.filter(comment => comment.id !== commentId));
    };

    if (!post) return <p className="flex justify-center items-center h-screen text-lg">Loading post...</p>;

    return (
        <div className="min-h-screen bg-[#E9EDC9] flex flex-col items-center py-8">
            <div className="w-full max-w-3xl bg-[#E9EDC9] p-6 rounded-md shadow-md border-2 border-[#D4A373]">
                <h1 className="text-3xl font-bold mb-4 text-[#3E4B35]">{post.title}</h1>
                <p className="text-sm text-gray-600 mb-2 ">Posted by {post.username}</p>
                <p className="text-[#3E4B35] mb-6">{post.body}</p>

                <h3 className="font-semibold text-xl text-black mb-4">Comments</h3>
                <hr className="mb-1" style={{ borderColor: '#D4A373', borderWidth: '1px' }} />

                {comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <div key={comment.id}>
                            <Comment
                                id={comment.id}
                                contentProp={comment.content}
                                username={comment.username}
                                userId={comment.user_id}
                                onDelete={handleCommentDeleted}
                            />
                            {index !== comments.length - 1 && (
                                <hr className="my-1" style={{ borderColor: '#D4A373', borderWidth: '1px' }} />
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-gray-600">No comments yet.</p>
                )}
                <CommentForm postId={post.id} onCommentAdded={handleCommentAdded} />
            </div>
        </div>
    );
}
