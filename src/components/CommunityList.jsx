import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CommunityListItem from './CommunityListItem'

export default function CommunityList() {
    const [communities, setCommunities] = useState([])

    useEffect(() => {
        const getData = async () => {
            try {
                // Fetch communities, including `isMember` information for each community
                const response = await axios.get(`http://localhost:5000/communities`)
                setCommunities(response.data)
            } catch (error) {
                console.error('Error fetching communities:', error)
            }
        }
        getData()
    }, [])

    // Function to handle leaving a community
    const handleLeaveCommunity = async (communityId) => {
        try {
            // Send a DELETE request to leave a community by its ID
            await axios.delete(`http://localhost:5000/communities/${communityId}/leave`)
            // Update the communities list to reflect the user no longer being a member
            setCommunities(prevCommunities =>
                prevCommunities.map(c =>
                    c.id === communityId ? { ...c, isMember: false } : c
                )
            )
        } catch (error) {
            console.error('Error leaving community:', error)
        }
    }

    return (
        <div className="m-4">
            {communities.map(c => (
                <div key={c.id} className="community-item">
                    {/* Render community name using CommunityListItem */}
                    <CommunityListItem name={c.name} id={c.id} />
                    
                    {/* Conditionally render Leave button only if the user is a member */}
                    {c.isMember && (
                        <button 
                            onClick={() => handleLeaveCommunity(c.id)}
                            className="leave-button bg-red-500 text-white px-2 py-1 rounded ml-2"
                        >
                            Leave
                        </button>
                    )}
                </div>
            ))}
        </div>
    )
}
