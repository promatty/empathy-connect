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
            if (!query) return;

            try {
                const response = await axios.get(`http://localhost:5000/search/search/${query}`);
                setResults(response.data);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        fetchResults();
    }, [query]);

    return (
        <section className="bg-[#FEFAE0] p-6 rounded-lg max-w-4xl mx-auto mt-4 mb-4">
            <h2 className="text-[#D4A373] text-2xl font-semibold text-center mb-6">
                Search Results for "{query}"
            </h2>
            
            <div className="bg-[#E9EDC9] rounded-lg p-4 mb-6">
                <h3 className="text-black text-lg font-medium mb-4 border-b-2 border-[#FAEDCD] pb-1">
                    Communities
                </h3>
                {results.communities.length > 0 ? (
                    results.communities.map(community => (
                        <div key={community.id} className="bg-[#FAEDCD] p-4 rounded-lg shadow-md mb-4">
                            <h4 className="text-[#A67D4D] font-semibold text-lg mb-2">
                                {community.name}
                            </h4>
                            <p className="text-gray-800">{community.description}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-black italic text-center">No communities found.</p>
                )}
            </div>
            
            <div className="bg-[#E9EDC9] rounded-lg p-4">
                <h3 className="text-black text-lg font-medium mb-4 border-b-2 border-[#FAEDCD] pb-1">
                    Posts
                </h3>
                {results.posts.length > 0 ? (
                    results.posts.map(post => (
                        <Post key={post.id} title={post.title} body={post.body} username={post.username} />
                    ))
                ) : (
                    <p className="text-black italic text-center">No posts found.</p>
                )}
            </div>
        </section>
    );
}
