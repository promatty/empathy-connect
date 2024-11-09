import { Link } from "react-router-dom";

export default function Header() {
	return (
		<header className="bg-[#E9EDC9] text-[#D4A373] p-4 flex justify-between items-center border-b border-gray-300">
			<Link to="/" className="text-[#D4A373] text-xl font-bold">
				Empathy Connect
			</Link>
			<Link
				to="/user/profile"
				className="bg-white text-green-500 border-none py-2 px-4 cursor-pointer"
			>
				Profile
			</Link>
		</header>
	);
}
