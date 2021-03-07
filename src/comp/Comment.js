import React, { useState } from 'react'
import { useHistory }from 'react-router-dom';


function Comment({comment}) {



    const rightSize = (str) => {
        if(str.length > 60){
            return str.slice(0, 57) + "..."
        }else return str
    }
    const [showComment, setShwonComment] = useState(rightSize(comment?.comment))
    const [plus, setPlus] = useState(false)
    const history = useHistory();

    return (
        <div className="comment">
            <div className="comment__commenter">
                <h3 style={{cursor: "pointer"}} onClick={() => history.push('/profile', {profileId: comment?.commenter?._id})}>{comment?.commenter?.username?.charAt(0)?.toUpperCase() + comment?.commenter?.username?.slice(1)}</h3>
            </div>
            <div className="comment__com">
            <p>{showComment} {(comment?.comment?.length > 60 && plus === false) && <p style={{float: "right", cursor: "pointer", color: "gray", fontWeight: 700}} onClick={() => {setShwonComment(comment?.comment); setPlus(true)}}>plus</p>}</p>
            </div>
        </div>
    )
}

export default Comment
