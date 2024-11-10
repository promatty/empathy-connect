import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Post({ title, body, username,id }) {
    const navigate = useNavigate();
    const loggedInUsername = localStorage.getItem("username")
    const redirectToEdit = ()=> {
        navigate('/postForm/'+id);
    }
    const handleDelete = async()=> {
        await axios.delete(`http://localhost:5000/posts/delete/${id}`)
    }
   
    return (
        <div className="bg-[#E9EDC9] rounded-md p-4 mb-2">
            <div className="bg-[#FEFAE0] rounded-md border-black border-2 p-2 shadow-xl">
                <div className="flex items-center space-x-4 mb-4">
                    <div>
                        <h2 className="font-semibold text-xl text-black">{title}</h2>
                        <p className="text-sm text-gray-600">Posted by {username}</p>
                    </div>
                    <div>
                  { username === loggedInUsername && <div className='flex items-center space-x-4'> <button onClick={redirectToEdit}
                    type="button"
                    className="w-full py-2 px-4 bg-green-200 text-green-800 font-semibold rounded-md shadow-md hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition ease-in-out duration-150"
                    >
                    Edit
                    </button> <button
                    onClick={handleDelete}
                    type="button"
                    className="w-full py-2 px-4 bg-red-200 text-red-800 font-semibold rounded-md shadow-md hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition ease-in-out duration-150"
                    >
                    Delete
                    </button></div> }
                    </div>
                    
                </div>
                <div className="text-black">
                    <p>{body}</p>
                </div>
            </div>
        </div>
    );
}
