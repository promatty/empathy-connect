import { useState, useEffect } from "react";
import Post from "./Post";
import axios from "axios";

export default function Profile() {
    const [posts, setPosts] = useState([]);
	const username = localStorage.getItem("user_id")

    const getData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/posts/user/' + username);
            setPosts(response.data);
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => { getData() }, []);

	const deletePost = (id)=> {
		
        setPosts(posts.filter(p => p.id !== id))
    }

    return (
        <section className="flex-1 p-4">
            <h2>Your Posts</h2>
            {posts.map((post) => (
                <Post deletePostCallback={()=> {deletePost(post.id)}} key={post.id} title={post.title} body={post.body} username={post.username} id={post.id} />
            ))}
        </section>
    );
}
