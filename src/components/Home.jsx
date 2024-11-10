import { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post';
import { useLocation } from 'react-router-dom';

export default function Home() {
    const [posts, setPosts] = useState([]);
    const location = useLocation();
    const userId = location.state?.userId || localStorage.getItem('userId'); 

    useEffect(() => {
        if (!userId) {
            console.error('User is not logged in');
            return;
        }

        const fetchPosts = async () => {
            try {
                const response = await fetch(`http://localhost:5000/posts/user/${userId}`);
                const data = await response.json();
                console.log('Fetched posts:', data);
                setPosts(data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, [userId]);  

    return (
        <section className="flex-1 p-4">
            {posts.length > 0 ? (
                posts.map(post => (
                    <Post key={post.id} title={post.title} body={post.body} />
                ))
            ) : (
                <p>No posts available.</p>
            )}
        </section>
    );
}
