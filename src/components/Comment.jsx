import React from 'react';

export default function Comment({ content, username }) {
    return (
        <div className="bg-[#D9E8B4] hover:bg-[#c4d697] rounded-md p-3 mb-2 transition-colors duration-200">
            <div className="bg-[#FEFAE0] rounded-md border-black border p-2 shadow-md">
                <p className="text-sm text-gray-600">Commented by {username}</p>
                <p className="text-black mt-1">{content}</p>
            </div>
        </div>
    );
}
