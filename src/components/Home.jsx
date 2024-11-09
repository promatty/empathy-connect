import { useState } from 'react';
import Post from './Post';

export default function Home() {
    const [posts, setPosts] = useState([
        { id: 1, title: 'First Post', body: 'This is the first post.', user_id: 1, community_id: 1 },
        { id: 2, title: 'Second Post', body: 'This is the second post.', user_id: 2, community_id: 1 }
    ]);

    return (
        <div className="flex flex-1 p-4">
            <aside className="w-48 bg-[#E9EDC9] text-[#D4A373] p-4">
                <ul className="list-none p-0">
                    <li className="my-4">Home</li>
                    <li className="my-4">Communities</li>
                    <li className="my-4">Messages</li>
                    <li className="my-4">Settings</li>
                </ul>
            </aside>
            <section className="flex-1 p-4">
                {posts.map(post => (
                    <Post key={post.id} title={post.title} body={post.body} />
                ))}
            </section>
        </div>
    );
}