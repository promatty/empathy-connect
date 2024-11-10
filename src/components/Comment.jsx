import React, { useState } from 'react';
import axios from 'axios';

export default function Comment({ id, content, username, userId, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(content);
    const loggedInUserId = localStorage.getItem("user_id");

    const toggleEdit = () => {
        setIsEditing(!isEditing);
        setEditedContent(content);
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:5000/comments/${id}`, { content: editedContent });
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
        <div className="bg-[#E9EDC9] hover:bg-[#CCD5AE] rounded-lg p-4 mb-1 transition-all duration-200">
                <p className="text-sm text-[#6B7B57]">Commented by {username}</p>
                {isEditing ? (
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            className="w-full p-2 border-2 border-[#D4A373] rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                        />
                        <button
                            onClick={handleSave}
                            className="py-2 px-4 bg-[#D4A373] text-white font-semibold rounded-md hover:bg-[#E9C29B] focus:outline-none focus:ring-2 focus:ring-[#D4A373] transition ease-in-out duration-200"
                        >
                            Save
                        </button>
                        <button
                            onClick={toggleEdit}
                            className="py-2 px-4 bg-[#FAEDCD] text-[#D44A37] font-semibold rounded-md hover:bg-[#F9D0A3] focus:outline-none focus:ring-2 focus:ring-[#D44A37] transition ease-in-out duration-200"
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <p className="text-[#4A5D40] mt-2">{content}</p>
                )}
                {isAuthor && !isEditing && (
                    <div className="flex items-center space-x-4 mt-3">
                        <button
                            onClick={toggleEdit}
                            className="py-2 px-4 bg-[#D4A373] text-white font-semibold rounded-md hover:bg-[#E9C29B] focus:outline-none focus:ring-2 focus:ring-[#D4A373] transition ease-in-out duration-200"
                        >
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className="py-2 px-4 bg-[#FAEDCD] text-[#D44A37] font-semibold rounded-md hover:bg-[#F9D0A3] focus:outline-none focus:ring-2 focus:ring-[#D44A37] transition ease-in-out duration-200"
                        >
                            Delete
                        </button>
                    </div>
                )}
        </div>
    );
}
