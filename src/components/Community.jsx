import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Post from './Post';
import axios from 'axios';

export default function Community() {
    const { id } = useParams();
    const [community, setCommunity] = useState(null);

    useEffect(() => {
        const fetchCommunity = async () => {
            
            
            const response = await axios.get(`http://localhost:5000/communities/${id}`);
            setCommunity(response.data);
        };

        fetchCommunity();
    }, [id]);

    const deletePost = (id)=> {
        const newPosts = community.posts.filter(x=> x.id !== id)
        setCommunity({...community,posts:newPosts})
    }

    if (!community) {
        return <div>Loading...</div>;
    }

    return (
        <section className="flex-1 p-4">
            <h2 className="text-xl font-medium mb-4">{community.name}</h2>
            {community.posts.map(post => (
                <Post deletePostCallback={()=> {deletePost(post.id)}} key={post.id} title={post.title} body={post.body} username={post.username} id={post.id} />
            ))}
        </section>
    );
}