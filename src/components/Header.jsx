import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import empathyLogo from '../empathy-connect-logo.png'; // Adjust the path for your PNG file

export default function Header() {
    const [toggleDropdown, setToggleDropdown] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search?q=${searchQuery}`);
    }

    // Handle logout logic
    const handleLogout = () => {
        localStorage.removeItem('userId'); 
        navigate('/login');
    };

    return (
        <header className="bg-[#E9EDC9] text-[#D4A373] p-4 flex justify-between items-center border-b border-gray-300 relative">
            {/* Logo on the left */}
            <Link to="/" className="flex items-center">
                <img 
                    src={empathyLogo} 
                    alt="Empathy Connect Logo" 
                    className="h-12 w-12 rounded-full mr-2" 
                />
                <span className="text-[#D4A373] text-xl font-bold">Empathy Connect</span>
            </Link>
            
            {/* Search bar */}
            <form onSubmit={handleSearch} className="flex items-center w-1/2"> 
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="p-2 rounded-md bg-[#FEFAE0] border border-gray-300 w-3/4 focus:outline-none focus:ring-2 focus:ring-[#D4A373] focus:border-[#D4A373]" // Adjusted width and added border on focus
                />

                <button type="submit"  className="bg-[#D4A373] mx-2 text-white select-none border-2 border-transparent py-2 px-4 cursor-pointer rounded-md hover:bg-[#FAEDCD] hover:text-[#D4A373] hover:border-[#D4A373] transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#D4A373] focus:ring-offset-2"
>Search</button>
            </form>
            
            {/* Profile Dropdown */}
            <div
                onClick={() => setToggleDropdown(!toggleDropdown)}
                className="bg-[#D4A373] text-white select-none border-2 border-transparent py-2 px-4 cursor-pointer rounded-md hover:bg-[#FAEDCD] hover:text-[#D4A373] hover:border-[#D4A373] transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#D4A373] focus:ring-offset-2"
            >
                Profile
            </div>

            {/* Dropdown menu */}
            {toggleDropdown && (
                <div
                    className="absolute right-0 mt-40 mr-4 w-48 px-1 rounded-md bg-[#FEFAE0] shadow-lg z-50"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                >
                    <div className="py-2">
                        <Link
                            to="/profile"
                            className="block w-full pl-3 py-2 text-[#D4A373] text-sm rounded-md hover:bg-[#FAEDCD] hover:text-[#D4A373]"
                            role="menuitem"
                        >
                            Profile
                        </Link>
                        <hr />
                        <button
                            onClick={handleLogout}
                            className="block w-full text-left pl-2 py-2 text-[#D4A373] text-sm rounded-md hover:bg-[#FAEDCD] hover:text-[#D4A373]"
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
