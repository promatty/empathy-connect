import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
export default function CommunityListItem({ name, id }) {
    const userId = +localStorage.getItem("user_id")
    const navigate = useNavigate();

    const view = () => {
        navigate(`/community/${id}`);
    };

    const addCommunity = async()=> {
        const body = {user_id:userId,community_id:id}
        try{
        const response = await axios.post(`http://localhost:5000/communities/add_user`,body)
        toast.success("Saved Post !", {
            position: "top-center"
          });
        }
        catch(e) {

        }
    }

    return (
        <div
            
            className="bg-[#E9EDC9] rounded-md p-4 mb-2  hover:bg-[#DDE7B3]"
        >
            <div className="bg-[#FEFAE0] rounded-md border-black border-2 p-2 shadow-xl">
                <div className="flex items-center space-x-4 mb-4">
                    <div onClick={view} className='cursor-pointer'>
                        <h2 className="font-semibold text-xl text-black">{name}</h2>
                    </div>
                    <button
                    onClick={addCommunity}
                    type="button"
                    className="flex-grow-0 py-2 px-4 bg-green-200 text-green-800 font-semibold rounded-md shadow-md hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition ease-in-out duration-150"
                    >
                    Join Community
                    </button>
                </div>
            </div>
            <ToastContainer className={{maxHeight:"200px",maxWidth:"200px"}} />

        </div>
    );
}
