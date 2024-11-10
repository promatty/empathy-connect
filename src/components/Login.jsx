import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                // Login request
                const response = await axios.post('http://localhost:5000/users/login', {
                    username,
                    password,
                });

                console.log('Login successful:', response.data);

                // Save user info to localStorage (e.g., save userId or token)
                localStorage.setItem('userId', response.data.user_id); // Or save the token: response.data.token

                // Navigate to the home page on successful login
                navigate('/');
            } else {
                // Signup request
                const response = await axios.post('http://localhost:5000/users/signup', {
                    username,
                    password,
                });

                console.log('Signup successful:', response.data);

                // Save user info to localStorage after signup (e.g., userId or token)
                localStorage.setItem('userId', response.data.user_id); // Or save the token: response.data.token

                // Navigate to the homepage after signup (no need to go to the login page)
                navigate('/');
            }
        } catch (error) {
            setErrorMessage(error.response ? error.response.data.message : 'An error occurred');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#E9EDC9]">
            <div className="bg-[#FEFAE0] p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-[#D4A373] mb-6">
                    {isLogin ? 'Login' : 'Sign Up'}
                </h2>

                {errorMessage && (
                    <p className="text-center text-red-500 mb-4">{errorMessage}</p>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-[#D4A373]">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 block w-full p-3 border border-[#CCD5AE] rounded-md focus:ring-[#D4A373] focus:border-[#D4A373]"
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-[#D4A373]">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full p-3 border border-[#CCD5AE] rounded-md focus:ring-[#D4A373] focus:border-[#D4A373]"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full p-3 bg-[#D4A373] text-white rounded-md hover:bg-[#FAEDCD] focus:outline-none focus:ring-2 focus:ring-[#D4A373] focus:ring-opacity-50"
                    >
                        {isLogin ? 'Login' : 'Sign Up'}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-sm text-[#D4A373]">
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
