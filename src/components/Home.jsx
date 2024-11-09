import { useState, useEffect } from 'react';
import Post from './Post';
import fakeData from '../fakeData';

export default function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Simulate fetching posts data
        const allPosts = fakeData.communities.flatMap(community => community.posts);
        setPosts(allPosts);
    }, []);

    return (
        <section className="flex-1 p-4">
            {posts.map(post => (
                <Post key={post.id} title={post.title} body={post.body} />
            ))}
        </section>
    );
}