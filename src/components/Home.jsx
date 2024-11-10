import { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post';

export default function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Fetch posts data from the database
        axios.get('/posts')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    }, []);

    return (
        <section className="flex-1 p-4">
            {posts.map(post => (
                <Post key={post.id} title={post.title} body={post.body} username={post.username} />
            ))}
        </section>
    );
}