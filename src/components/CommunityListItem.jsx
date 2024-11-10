import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CommunityListItem({ name, id }) {
    const userId = +localStorage.getItem("user_id");
    const navigate = useNavigate();
    const [isMember, setIsMember] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        const checkMembership = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/communities/user/${userId}/communities`);
                const userCommunities = response.data;
                setIsMember(userCommunities.some(community => community.id === id));
            } catch (error) {
                console.error('Error checking membership:', error);
            }
        };
        checkMembership();
    }, [userId, id]);

    const view = () => {
        navigate(`/community/${id}`);
    };

    const handleAction = useCallback(async (action) => {
        if (isProcessing) return;
        setIsProcessing(true);
        const body = { user_id: userId, community_id: id };
        try {
            await axios.post(`http://localhost:5000/communities/${action}`, body);
            setIsMember(action === 'add_user');
        } catch (e) {
            console.error(`Error ${action === 'add_user' ? 'joining' : 'leaving'} community:`, e);
        } finally {
            setIsProcessing(false);
        }
    }, [isProcessing, userId, id]);

    return (
        <div className="bg-[#CCD5AE] rounded-lg p-4 mb-4 transition transform hover:scale-105 shadow-lg z-10">
            <div className="bg-[#FEFAE0] rounded-md border border-[#D4A373] p-4 shadow-md">
                <div className="flex items-center justify-between mb-4">
                    <div onClick={view} className="cursor-pointer">
                        <h2 className="font-semibold text-lg text-[#D4A373] hover:text-[#A97D51] transition-colors duration-200">
                            {name}
                        </h2>
                    </div>
                    {isMember ? (
                        <button
                            onClick={() => handleAction('remove_user')}
                            type="button"
                            className="py-2 px-4 bg-red-200 text-red-800 font-semibold rounded-md shadow-md hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition ease-in-out duration-150 disabled:opacity-50"
                            disabled={isProcessing}
                        >
                            Leave Community
                        </button>
                    ) : (
                        <button
                            onClick={() => handleAction('add_user')}
                            type="button"
                            className="py-2 px-4 bg-green-200 text-green-800 font-semibold rounded-md shadow-md hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition ease-in-out duration-150 disabled:opacity-50"
                            disabled={isProcessing}
                        >
                            Join Community
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
