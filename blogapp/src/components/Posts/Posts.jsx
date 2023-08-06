import React from 'react'
import Post from '../Post/Post'
export default function Posts({ posts }) {


  return (
    <div className="posts">
    
       {posts.map((p) => (
        <Post key={p._id} post={p} />
      ))}
       
   
    
    </div>
  )
}
