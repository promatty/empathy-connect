import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Post from './Post';

export default function SearchResults() {
    const [results, setResults] = useState([]);
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
            {results.length > 0 ? (
                results.map(result => (
                    <Post key={result.id} title={result.title} body={result.body} username={result.username} />
                ))
            ) : (
                <p>No results found.</p>
            )}
        </section>
    );
}