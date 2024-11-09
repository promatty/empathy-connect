import { useState, useEffect } from "react";
import Post from "./Post";

import axios from "axios";
export default function Profile() {
	const [posts, setPosts] = useState([]);


	const getData = async ()=> {
		
	
		try {
			const response = await axios.get('http://localhost:5000/posts/user/' + 1)
			setPosts(response.data)
			
			console.log('nice', response.data);
	   
		} catch (error) {
			console.error('Error:', error.response ? error.response.data : error.message);
		   
		}
	
	}
	useEffect(()=> {getData()}, [])

	return (
		<section className="flex-1 p-4">
			<h2>Your Posts</h2>
			{posts.map((post) => (
				<Post key={post.id} title={post.title} body={post.body} />
			))}
		</section>
	);
}
