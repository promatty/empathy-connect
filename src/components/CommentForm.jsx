import React, { useState } from 'react';
import axios from 'axios';

export default function CommentForm({ postId, onCommentAdded }) {
    const [newComment, setNewComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
   

    const handleAddComment = async () => {
        if (!newComment.trim()) {
            alert("Comment cannot be empty.");
            return;
        }

        setIsSubmitting(true);

        try {
            
            const response = await axios.post(`http://localhost:5000/comments/add`, {
                content: newComment,
                user_id: localStorage.getItem("user_id"), 
                post_id: postId,
            });
            onCommentAdded(response.data.comment); 
            setNewComment('');
        } catch (error) {
            console.error("Error adding comment:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mt-4">
            <h4 className="font-semibold text-md text-black mb-1">Add a Comment</h4>
            <div className="flex items-center space-x-2">
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Type your comment..."
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <button
                    onClick={handleAddComment}
                    disabled={isSubmitting}
                    className={`py-2 px-4 font-semibold rounded-md shadow-md transition ease-in-out duration-150 ${
                        isSubmitting
                            ? "bg-green-100 text-green-400 cursor-not-allowed"
                            : "bg-green-200 text-green-800 hover:bg-green-300"
                    }`}
                >
                    {isSubmitting ? "Submitting..." : "Add"}
                </button>
            </div>
        </div>
    );
}
