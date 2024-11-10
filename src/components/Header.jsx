import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import empathyLogo from '../empathy_connect_logo.png'; // Adjust the path for your PNG file

export default function Header() {
    const [toggleDropdown, setToggleDropdown] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search?q=${searchQuery}`);

    // Handle logout logic
    const handleLogout = () => {
        localStorage.removeItem('userId'); 
        navigate('/login');
    };

    return (
        <header className="bg-[#E9EDC9] text-[#D4A373] p-4 flex justify-between items-center border-b border-gray-300">
            {/* Logo on the left */}
            <Link to="/" className="flex items-center">
                <img 
                    src={empathyLogo} 
                    alt="Empathy Connect Logo" 
                    className="h-12 w-12 rounded-full mr-2"  // Increased size (h-12, w-12) and added rounded-full
                />
                <span className="text-[#D4A373] text-xl font-bold">Empathy Connect</span>
            </Link>
            {/* Search bar */}
            <form onSubmit={handleSearch} className="flex items-center">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="p-2 rounded-md border border-gray-300"
                />
                <button type="submit" className="ml-2 p-2 bg-[#D4A373] text-white rounded-md">Search</button>
            </form>
            {/* Profile Dropdown */}
            <div
                onClick={() => setToggleDropdown(!toggleDropdown)}
                className="bg-[#FAEDCD] select-none text-[#D4A373] border-1 border-black py-2 px-4 cursor-pointer rounded-md hover:bg-[#D4A373] hover:text-white transition-all duration-200 ease-in-out"
            >
                Profile
            </div>
            {/* Dropdown menu */}
            {toggleDropdown && (
                <div
                    className="absolute right-0 mt-40 mr-4 w-48 rounded-md bg-[#FEFAE0] shadow-lg"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                >
                    <div className="py-2 px-3">
                        <Link
                            to="/profile"
                            className="block pr-12 select-none pl-3 py-2 text-[#D4A373] text-sm rounded-md hover:bg-[#FAEDCD] hover:text-[#D4A373]"
                            role="menuitem"
                        >
                            Account
                        </Link>
                        <hr />
                        <button
                            onClick={handleLogout} // Call handleLogout on click
                            className="block pr-12 select-none pl-3 py-2 text-[#D4A373] text-sm rounded-md hover:bg-[#FAEDCD] hover:text-[#D4A373]"
                            role="menuitem"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}