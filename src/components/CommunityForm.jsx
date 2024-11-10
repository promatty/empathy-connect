import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CommunityForm = () => {
    const [name, setName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) {
            alert("Community name cannot be empty.");
            return;
        }
        try {
            await axios.post('http://localhost:5000/communities/', { name });
            toast.success("Community created!", { position: "top-center" });
            setName("");
        } catch (error) {
            toast.error("Error creating community");
            console.error('Error creating community:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#E9EDC9]">
            <div className="bg-[#FEFAE0] p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-[#D4A373] mb-6">Create Community</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-[#D4A373]">Community Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="mt-1 block w-full p-3 border border-[#CCD5AE] rounded-md focus:ring-[#D4A373] focus:border-[#D4A373]"
                            placeholder="Enter the community name"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-[#D4A373] text-white font-semibold rounded-md shadow-md hover:bg-[#FAEDCD] focus:outline-none focus:ring-2 focus:ring-[#D4A373] transition ease-in-out duration-150"
                    >
                        Create Community
                    </button>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
};

export default CommunityForm;