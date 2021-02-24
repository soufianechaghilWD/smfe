import React, { useState } from 'react'


function Comment() {


    const comment = "Poster said that && he thinks it’s so smart Poster said that && he thinks it’s so smart"

    const rightSize = (str) => {
        if(str.length > 60){
            return str.slice(0, 57) + "..."
        }else return str
    }
    const [showComment, setShwonComment] = useState(rightSize(comment))
    const [plus, setPlus] = useState(false)

    return (
        <div className="comment">
            <div className="comment__commenter">
                <h3>Commenter</h3>
            </div>
            <div className="comment__com">
            <p>{showComment} {(comment.length > 60 && plus === false) && <p style={{float: "right", cursor: "pointer", color: "gray", fontWeight: 700}} onClick={() => {setShwonComment(comment); setPlus(true)}}>plus</p>}</p>
            </div>
        </div>
    )
}

export default Comment
