import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Post from './Post';
import fakeData from '../fakeData';

export default function Community() {
    const { id } = useParams();
    const [community, setCommunity] = useState(null);

    useEffect(() => {
        // Simulate fetching community data based on the ID
        const communityData = fakeData.communities.find(community => community.id === parseInt(id));
        setCommunity(communityData);
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