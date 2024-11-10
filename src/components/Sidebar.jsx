import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
    const [isCommunitiesOpen, setIsCommunitiesOpen] = useState(false);
    const [communities, setCommunities] = useState([]);

    // Hardcode userId to 5 for now
    const userId = 5;

    useEffect(() => {
        // Fetch communities associated with the specific user
        const fetchUserCommunities = async () => {
            try {
                // Adjusted URL path to match your backend
                const response = await fetch(`http://localhost:5000/communities/user/${userId}/communities`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCommunities(data);
            } catch (error) {
                console.error('Error fetching communities:', error);
            }
        };

        // Fetch communities on component load
        fetchUserCommunities();
    }, []);

    return (
        <aside className="w-48 bg-[#E9EDC9] text-[#D4A373] p-4 border-r border-gray-300">
            <ul className="list-none p-0">
                <li className="my-4">
                    <Link to="/" className="text-[#D4A373] block py-2 px-4 bg-[#E9EDC9] rounded-md text-left hover:bg-[#D4A373] hover:text-[#E9EDC9] inline-block">Home</Link>
                </li>
                <li className="my-4">
                    <button 
                        onClick={() => setIsCommunitiesOpen(!isCommunitiesOpen)} 
                        className="text-[#D4A373] block py-2 px-4 bg-[#E9EDC9] rounded-md text-left hover:bg-[#D4A373] hover:text-[#E9EDC9] inline-block w-full text-left"
                    >
                        Communities
                    </button>
                    {isCommunitiesOpen && (
                        <ul className="list-none p-0 mt-2 ml-4">
                            {communities.map(community => (
                                <li key={community.id} className="my-2">
                                    <Link to={`/community/${community.id}`} className="text-[#D4A373] block py-1 px-2 bg-[#FEFAE0] rounded-md text-left hover:bg-[#D4A373] hover:text-[#E9EDC9] inline-block text-sm">
                                        {community.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
                <li className="my-4">
                    <Link to="/messages" className="text-[#D4A373] block py-2 px-4 bg-[#E9EDC9] rounded-md text-left hover:bg-[#D4A373] hover:text-[#E9EDC9] inline-block">Messages</Link>
                </li>
                <li className="my-4">
                    <Link to="/settings" className="text-[#D4A373] block py-2 px-4 bg-[#E9EDC9] rounded-md text-left hover:bg-[#D4A373] hover:text-[#E9EDC9] inline-block">Settings</Link>
                </li>
            </ul>
        </aside>
    );
}
