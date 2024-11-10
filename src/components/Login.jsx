import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';

const PostForm = () => {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [selectedCommunity, setSelectedCommunity] = useState(null);
    const [communities, setCommunities] = useState([]);
    const userId = localStorage.getItem("user_id");

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get(`http://localhost:5000/communities/user/${userId}/communities`);
            const communityOptions = response.data.map(community => ({
                value: community.id,
                label: community.name
            }));
            setCommunities(communityOptions);

            if (id && id !== -1) {
                const response = await axios.get(`http://localhost:5000/posts/${id}`);
                const data = response.data;
                setTitle(data.title);
                setBody(data.body);
                setSelectedCommunity(communityOptions.find(x => x.value === data.community_id));
            }
        };

        getData();
    }, [id, userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!selectedCommunity) {
            alert("Please select a community.");
            return;
        }

        try {
            if (id === -1) {
                await axios.post('http://localhost:5000/posts/create', {
                    title,
                    body,
                    user_id: userId,
                    community_id: selectedCommunity.value
                });
            } else {
                await axios.put(`http://localhost:5000/posts/${id}`, {
                    title,
                    body,
                    user_id: userId,
                    community_id: selectedCommunity.value
                });
            }
            toast.success("Saved Post!", { position: "top-center" });
        } catch (error) {
            toast.error("Error creating post");
            console.error('Error creating post:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#E9EDC9]">
            <div className="bg-[#FEFAE0] p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-[#D4A373] mb-6">Post Form</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-[#D4A373]">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="mt-1 block w-full p-3 border border-[#CCD5AE] rounded-md focus:ring-[#D4A373] focus:border-[#D4A373]"
                            placeholder="Enter the post title"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#D4A373]">Body</label>
                        <textarea
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            required
                            className="mt-1 block w-full p-3 border border-[#CCD5AE] rounded-md focus:ring-[#D4A373] focus:border-[#D4A373]"
                            placeholder="Enter the post body"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#D4A373]">Community</label>
                        <Select
                            options={communities}
                            value={selectedCommunity}
                            onChange={setSelectedCommunity}
                            placeholder="Select a community"
                            className="mt-1"
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    borderColor: '#CCD5AE',
                                    boxShadow: 'none',
                                    '&:hover': { borderColor: '#A0AEC0' },
                                })
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-[#D4A373] text-white font-semibold rounded-md shadow-md hover:bg-[#FAEDCD] focus:outline-none focus:ring-2 focus:ring-[#D4A373] transition ease-in-out duration-150"
                    >
                        Save Post
                    </button>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
};

export default PostForm;
