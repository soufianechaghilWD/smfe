import React from 'react'
import '../styles/PostProfile.css'
import S1 from '../files/s1.jpg'

function PostProfile({post}) {
    return (
        <div className="postProfile">
            <img src={post?.picUrl} alt="" />
        </div>
    )
}

export default PostProfile
