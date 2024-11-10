import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Post from './Post';

export default function SearchResults() {
    const [results, setResults] = useState({ communities: [], posts: [] });
    const [newsArticles, setNewsArticles] = useState([]);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('q'); // Extract query param

    useEffect(() => {
        const fetchResults = async () => {
            if (!query) return;
            try {
                // Fetch community and post results from your backend
                const response = await axios.get(`http://localhost:5000/search/search/${query}`);
                setResults(response.data);

                // Fetch news articles from NewsAPI using the API key from .env
                const newsResponse = await axios.get(`https://newsapi.org/v2/everything?q=${query}&apiKey=2016e9e6eea2450b97e9140655a1be9a`);
                setNewsArticles(newsResponse.data.articles);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        fetchResults();
    }, [query]);

    // Limit the number of news articles displayed (e.g., to 5)
    const limitedNewsArticles = newsArticles.slice(0, 5);

    return (
        <section className="bg-[#FEFAE0] p-6 rounded-lg max-w-4xl mx-auto mt-4 mb-4">
            <h2 className="text-[#D4A373] text-2xl font-semibold text-center mb-6">
                Search Results for "{query}"
            </h2>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Community and Post Results */}
                <div className="flex-1">
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
                </div>

                {/* News Articles */}
                <div className="w-full lg:w-1/3 bg-[#FAEDCD] p-4 rounded-md shadow-lg">
                    <h3 className="text-lg font-medium mb-4">Related News Articles</h3>
                    {limitedNewsArticles.length > 0 ? (
                        limitedNewsArticles.map((article, index) => (
                            <div key={index} className="mb-4 hover:bg-[#E9EDC9] p-3 rounded-md transition-colors duration-200">
                                <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 font-semibold">
                                    {article.title}
                                </a>
                                <p className="text-sm text-gray-700">{article.description}</p>
                                <p className="text-xs text-gray-500">{article.source.name}</p>
                            </div>
                        ))
                    ) : (
                        <p>No related news articles found.</p>
                    )}
                </div>
            </div>
        </section>
    );
}
