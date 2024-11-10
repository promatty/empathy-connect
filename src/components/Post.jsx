import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Post({ title, body, username, id, deletePostCallback }) {
    const navigate = useNavigate();
    const loggedInUsername = localStorage.getItem("username");
    const [comments, setComments] = useState([]);

    const redirectToEdit = () => {
        navigate('/postForm/' + id);
    };

    const handleDelete = async () => {
        await axios.delete(`http://localhost:5000/posts/${id}`);
        deletePostCallback();
    };

    useEffect(() => {
        // Placeholder for any side effects related to the post
    }, [id]);

    return (
        <div className="bg-[#E9EDC9] hover:bg-[#CCD5AE] rounded-lg p-6 mb-4 shadow-md transition-all duration-200">
            <div className="bg-[#FEFAE0] rounded-lg border-2 border-[#D4A373] p-4 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="font-bold text-2xl text-[#3E4B35]">{title}</h2>
                        <p className="text-sm text-[#6B7B57]">Posted by {username}</p>
                    </div>
                    <div>
                        {username === loggedInUsername && (
                            <div className="flex space-x-4">
                                <button
                                    onClick={redirectToEdit}
                                    type="button"
                                    className="py-2 px-4 bg-[#D4A373] text-white font-semibold rounded-lg shadow-lg hover:bg-[#E9C29B] focus:outline-none focus:ring-2 focus:ring-[#D4A373] transition ease-in-out duration-200"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={handleDelete}
                                    type="button"
                                    className="py-2 px-4 bg-[#FAEDCD] text-[#D44A37] font-semibold rounded-lg shadow-lg hover:bg-[#F9D0A3] focus:outline-none focus:ring-2 focus:ring-[#D44A37] transition ease-in-out duration-200"
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="text-[#4A5D40] mb-6">
                    <p>{body}</p>
                </div>
                <Link to={`/posts/${id}`} className="text-[#A3C9D6] hover:underline mt-4 block">
                    View Full Post with Comments
                </Link>
            </div>
        </div>
    );
}
