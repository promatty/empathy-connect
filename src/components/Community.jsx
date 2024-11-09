import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Post from './Post';
import axios from 'axios';

export default function Community() {
    const { id } = useParams();
    const [community, setCommunity] = useState(null);

    useEffect(() => {
       
        const fetchCommunity = async () => {
            const response = await axios.get(`http://localhost:5000/communities/${id}/posts`)
        
            setCommunity(response.data);
        };

        fetchCommunity();
    }, [id]);

    if (!community) {
        return <div>Loading...</div>;
    }

    return (
        <section className="flex-1 p-4">
            <h2>{community.name}</h2>
            {community.posts.map(post => (
                <Post key={post.id} title={post.title} body={post.body} />
            ))}
        </section>
    );
}