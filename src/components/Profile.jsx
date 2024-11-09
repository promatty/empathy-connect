import { useState, useEffect } from "react";
import Post from "./Post";
import fakeData from "../fakeData";

export default function Profile() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		// Simulate fetching user's posts
		const userId = 1; // Assuming the logged-in user has ID 1
		const userPosts = fakeData.communities.flatMap((community) =>
			community.posts.filter((post) => post.user_id === userId)
		);
		setPosts(userPosts);
	}, []);

	return (
		<section className="flex-1 p-4">
			<h2>Your Posts</h2>
			{posts.map((post) => (
				<Post key={post.id} title={post.title} body={post.body} />
			))}
		</section>
	);
}
