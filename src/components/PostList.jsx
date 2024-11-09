import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Post from './Post';

export default function PostList() {
    const [posts,setPosts] = useState([])

const getData = async ()=> {
    

    try {
        const response = await axios.post('http://localhost:5000/posts/user' + 1)
        setPosts(response.data)
        
        console.log('nice', response.data);
   
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
       
    }

}
useEffect(()=> getData(), [])

  return (
    <section className="flex-1 p-4">
            {posts.map(post => (
                <Post key={post.id} title={post.title} body={post.body} />
            ))}
        </section>
  )
}
