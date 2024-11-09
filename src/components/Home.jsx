import { useState } from 'react';
import Post from './Post';

export default function Home() {
    const [posts, setPosts] = useState([
        { id: 1, title: 'First Post', body: 'This is the first post.', user_id: 1, community_id: 1 },
        { id: 2, title: 'Second Post', body: 'This is the second post.', user_id: 2, community_id: 1 }
    ]);

    return (
        <div>
            {posts.map(post => (
                <Post key={post.id} title={post.title} body={post.body} />
            ))}
        </div>
    );
}