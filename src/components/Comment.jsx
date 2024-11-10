import React, { useState } from 'react';
import axios from 'axios';

export default function Comment({ id, contentProp, username, userId, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [content,setContent] = useState(contentProp)
    const [editedContent, setEditedContent] = useState(contentProp);
    const loggedInUserId = localStorage.getItem("user_id");
    

    const toggleEdit = () => {
        setIsEditing(!isEditing);
        setEditedContent(content);
    };

    const handleSave = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/comments/${id}`, { content: editedContent });
            setContent(response.data.content)
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating comment:", error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/comments/${id}`);
            onDelete(id);
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    const isAuthor = loggedInUserId === String(userId);

    return (
        <div className="bg-[#D9E8B4] hover:bg-[#c4d697] rounded-md p-3 mb-2 transition-colors duration-200">
            <div className="bg-[#FEFAE0] rounded-md border-black border p-2 shadow-md">
                <p className="text-sm text-gray-600">Commented by {username}</p>
                {isEditing ? (
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                        <button
                            onClick={handleSave}
                            className="py-1 px-3 bg-green-200 text-green-800 font-semibold rounded-md hover:bg-green-300"
                        >
                            Save
                        </button>
                        <button
                            onClick={toggleEdit}
                            className="py-1 px-3 bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <p className="text-black mt-1">{content}</p>
                )}
                {isAuthor && !isEditing && (
                    <div className="flex items-center space-x-2 mt-2">
                        <button
                            onClick={toggleEdit}
                            className="py-1 px-3 bg-blue-200 text-blue-800 font-semibold rounded-md hover:bg-blue-300"
                        >
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className="py-1 px-3 bg-red-200 text-red-800 font-semibold rounded-md hover:bg-red-300"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
