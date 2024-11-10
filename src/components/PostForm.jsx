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
    const [communities,setCommunities] = useState([])
    const userId = 1

   

    useEffect(()=> {
        const getData = async()=> {
            const response = await axios.get(`http://localhost:5000/communities/user/${userId}/communities`)
            setCommunities(response.data)
            if(id) {
                const response = axios.get(`http://localhost:5000/posts/${id}`)
                const data = response.data
                setTitle(data.title)
                setBody(data.body)
                setSelectedCommunity(data.selectedCommunity)
                }

        }

        getData()

    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!selectedCommunity) {
            alert("Please select a community.");
            return;
        }

        try {
            if(id === -1) {
            const response = await axios.post('http://localhost:5000/posts/create', {
                title,
                body,
                user_id: 1, 
                community_id: selectedCommunity.value
            });
            
            }
            else {
                const response = await axios.put('http://localhost:5000/posts/create', {
                    title,
                    body,
                    user_id: 1, 
                    community_id: selectedCommunity.value
                });

            }
            toast.success("Saved Post !", {
                position: "top-center"
              });
        } catch (error) {
            toast.error("Error Notification")
            console.error('Error creating post:', error);
        }
    };

    const communityOptions = communities.map(community => ({
        value: community.id,
        label: community.name
    }));

    return (
        <div className="max-w-lg mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create a New Post</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700">Body</label>
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Community</label>
                    <Select
                        options={communityOptions}
                        value={selectedCommunity}
                        onChange={setSelectedCommunity}
                        placeholder="Select a community"
                        className="mt-1"
                        styles={{
                            control: (base) => ({
                                ...base,
                                borderColor: '#D1D5DB', 
                                boxShadow: 'none',
                                '&:hover': { borderColor: '#A0AEC0' },
                            })
                        }}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150"
                >
                    Create Post
                </button>
                <ToastContainer className={{maxHeight:"200px",maxWidth:"200px"}} />
            </form>
                     
         
        </div>
    );
};

export default PostForm;
