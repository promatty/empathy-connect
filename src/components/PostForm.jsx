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
            if (id && id != -1) {
                const postResponse = await axios.get(`http://localhost:5000/posts/${id}`);
                const data = postResponse.data;
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
            const payload = {
                title,
                body,
                user_id: userId,
                community_id: selectedCommunity.value
            };
            if (id == -1) {
                await axios.post('http://localhost:5000/posts/create', payload);
            } else {
                await axios.put(`http://localhost:5000/posts/${id}`, payload);
            }
            toast.success("Saved Post!", { position: "top-center" });
        } catch (error) {
            toast.error("Error saving post.");
            console.error('Error creating post:', error);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-8 rounded-lg shadow-lg" style={{ backgroundColor: '#FEFAE0' }}>
            <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: '#D4A373' }}>Post Form</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium" style={{ color: '#CCD5AE' }}>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full mt-1 p-3 rounded-md bg-[#E9EDC9] border-[#CCD5AE] text-[#5B5B5B] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium" style={{ color: '#CCD5AE' }}>Body</label>
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                        className="w-full mt-1 p-3 rounded-md bg-[#E9EDC9] border-[#CCD5AE] text-[#5B5B5B] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium" style={{ color: '#CCD5AE' }}>Community</label>
                    <Select
                        options={communities}
                        value={selectedCommunity}
                        onChange={setSelectedCommunity}
                        placeholder="Select a community"
                        className="mt-1"
                        styles={{
                            control: (base) => ({
                                ...base,
                                backgroundColor: '#E9EDC9',
                                borderColor: '#CCD5AE',
                                color: '#5B5B5B',
                                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                                '&:hover': { borderColor: '#A0AEC0' },
                                '&:focus': { borderColor: '#D4A373' } // Focus state to match desired color
                            }),
                            singleValue: (base) => ({
                                ...base,
                                color: '#5B5B5B'
                            })
                        }}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-3 rounded-md shadow-md font-semibold transition duration-150 bg-[#D4A373] text-white border-[#CCD5AE]"
                >
                    Save Post
                </button>
                <ToastContainer />
            </form>
        </div>
    );
};

export default PostForm;
