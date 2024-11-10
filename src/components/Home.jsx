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
                // Fetch communities the user is part of
                const communitiesResponse = await axios.get(`http://localhost:5000/communities/user/${userId}/communities`);
                const communities = communitiesResponse.data;

                let allPosts = [];
                const postIds = new Set(); // To keep track of unique post IDs

                // Fetch posts from the user's communities
                for (let community of communities) {
                    const postsResponse = await axios.get(`http://localhost:5000/posts/community/${community.id}`);
                    const communityPosts = postsResponse.data;

                    // Add only unique posts (based on post.id)
                    for (let post of communityPosts) {
                        if (!postIds.has(post.id)) {
                            allPosts.push(post);
                            postIds.add(post.id);
                        }
                    }
                }

                // Fetch the posts created by the user
                const userPostsResponse = await axios.get(`http://localhost:5000/posts/user/${userId}`);
                const userPosts = userPostsResponse.data;

                // Add only unique posts (based on post.id)
                for (let post of userPosts) {
                    if (!postIds.has(post.id)) {
                        allPosts.push(post);
                        postIds.add(post.id);
                    }
                }

                // Update the state with the unique posts
                debugger
                setPosts(allPosts);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, [userId]);

    const deletePost = (id)=> {
        setPosts(posts.filter(p => p.id !== id))
    }

    return (
        <section className="flex-1 p-4">
            {posts.length > 0 ? (
                posts.map(post => (
                    <Post key={post.id} username={post.username} id={post.id} title={post.title} body={post.body} deletePostCallback={()=> {deletePost(post.id)}} />
                ))
            ) : (
                <p>No posts available.</p>
            )}
        </section>
    );
}
