import { Link } from 'react-router-dom';

export default function Sidebar() {
    return (
        <aside className="w-48 bg-[#E9EDC9] text-[#D4A373] p-4 border-r border-gray-300">
            <ul className="list-none p-0">
                <li className="my-4">
                    <Link to="/" className="text-[#D4A373] block py-2 px-4 bg-[#E9EDC9] rounded-md text-left hover:bg-[#D4A373] hover:text-[#E9EDC9] inline-block">Home</Link>
                </li>
                <li className="my-4">
                    <Link to="/communities" className="text-[#D4A373] block py-2 px-4 bg-[#E9EDC9] rounded-md text-left hover:bg-[#D4A373] hover:text-[#E9EDC9] inline-block">Communities</Link>
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