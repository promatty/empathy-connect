export default function Post({ title, body, username }) {
    return (
        <div className="bg-[#E9EDC9] rounded-md p-4 mb-2">
            <div className="bg-[#FEFAE0] rounded-md border-black border-2 p-2 shadow-xl">
                <div className="flex items-center space-x-4 mb-4">
                    <div>
                        <h2 className="font-semibold text-xl text-black">{title}</h2>
                        <p className="text-sm text-gray-600">Posted by {username}</p>
                    </div>
                </div>
                <div className="text-black">
                    <p>{body}</p>
                </div>
            </div>
        </div>
    );
}
