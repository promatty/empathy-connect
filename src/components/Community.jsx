import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Post from './Post';

export default function Community() {
    const { id } = useParams();
    const [community, setCommunity] = useState(null);

    useEffect(() => {
        // Simulate fetching community data based on the ID
        const fetchCommunity = async () => {
            const communityData = {
                id: 1,
                name: 'Community One',
                posts: [
                    { id: 1, title: 'First Post', body: 'This is the first post.' },
                    { id: 2, title: 'Second Post', body: 'This is the second post.' }
                ]
            };
            setCommunity(communityData);
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