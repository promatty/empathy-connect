import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup
    const navigate = useNavigate(); // Hook to navigate to different routes

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        navigate('/'); // Redirect to the home page
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#E9EDC9]"> {/* Background color: E9EDC9 */}
            <div className="bg-[#FEFAE0] p-8 rounded-lg shadow-lg w-full max-w-md"> {/* Form background color: FEFAE0 */}
                <h2 className="text-2xl font-bold text-center text-[#D4A373] mb-6"> {/* Text color: D4A373 */}
                    {isLogin ? 'Login' : 'Sign Up'}
                </h2>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    {/* Username Field */}
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-[#D4A373]"> {/* Text color: D4A373 */}
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="mt-1 block w-full p-3 border border-[#CCD5AE] rounded-md focus:ring-[#D4A373] focus:border-[#D4A373]"
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-[#D4A373]"> {/* Text color: D4A373 */}
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 block w-full p-3 border border-[#CCD5AE] rounded-md focus:ring-[#D4A373] focus:border-[#D4A373]"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full p-3 bg-[#D4A373] text-white rounded-md hover:bg-[#FAEDCD] focus:outline-none focus:ring-2 focus:ring-[#D4A373] focus:ring-opacity-50" 
                    >
                        {isLogin ? 'Login' : 'Sign Up'}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-sm text-[#D4A373]"> {/* Text color: D4A373 */}
                        {isLogin ? "Don't have an account?" : 'Already have an account?'}
                        <Link
                            to="#"
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-[#CCD5AE] font-semibold ml-1 hover:text-[#D4A373]" 
                        >
                            {isLogin ? 'Sign Up' : 'Login'}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
