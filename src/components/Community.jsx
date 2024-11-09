import { useState } from 'react';
import Post from './Post';

export default function Community() {
    const [communityData, setCommunityData] = useState([
        { id: 1, name: 'Community One', posts: [
            { id: 1, title: 'First Post', body: 'This is the first post.' },
            { id: 2, title: 'Second Post', body: 'This is the second post.' }
        ]},
        { id: 2, name: 'Community Two', posts: [
            { id: 3, title: 'Third Post', body: 'This is the third post.' }
        ]}
    ]);

    return (
        <div className="flex flex-1 p-4">
            <aside className="w-48 bg-[#E9EDC9] text-[#D4A373] p-4">
                {communityData.map(community => (
                    <div key={community.id}>
                        <h2>{community.name}</h2>
                        {community.posts.map(post => (
                            <Post key={post.id} title={post.title} body={post.body} />
                        ))}
                    </div>
                ))}
            </aside>
        </div>
    );
}