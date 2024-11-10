import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Post from './Post';

export default function SearchResults() {
    const [results, setResults] = useState({ communities: [], posts: [] });
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('q');

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/search?q=${query}`);
                console.log('Search response:', response.data); // Debug log
                setResults(response.data);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        if (query) {
            fetchResults();
        }
    }, [query]);

    return (
        <section className="flex-1 p-4">
            <h2 className="text-xl font-medium mb-4">Search Results for "{query}"</h2>
            <div>
                <h3 className="text-lg font-medium mb-2">Communities</h3>
                {results.communities.length > 0 ? (
                    results.communities.map(community => (
                        <div key={community.id} className="mb-2">
                            <h4 className="text-md font-semibold">{community.name}</h4>
                        </div>
                    ))
                ) : (
                    <p>No communities found.</p>
                )}
            </div>
            <div>
                <h3 className="text-lg font-medium mb-2">Posts</h3>
                {results.posts.length > 0 ? (
                    results.posts.map(post => (
                        <Post key={post.id} title={post.title} body={post.body} username={post.username} />
                    ))
                ) : (
                    <p>No posts found.</p>
                )}
            </div>
        </section>
    );
}