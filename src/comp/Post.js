import React, { useState } from 'react'
import '../styles/Post.css'
import Avatar from '@material-ui/core/Avatar';
import S1 from '../files/s1.jpg'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CommentIcon from '@material-ui/icons/Comment';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import Comment from './Comment'
import { makeStyles } from '@material-ui/core/styles';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';

const useStyles = makeStyles((theme) => ({
    small: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
    xsmall: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    }
  }));

function Post({post}) {

    const [like, setLike] = useState(false)
    const [save, setSave] = useState(false)
    const classes = useStyles();

    const bio = "Poster said that && he thinks it’s so smart Poster said that && he thinks it’s so smart"
    const rightSize = (str) => {
        if(str.length > 60){
            return str.slice(0, 57) + "... "
        }else return str
    }
    const [shownbio, stShwonBio] = useState(rightSize(post?.bio))
    const [plus, setPlus] = useState(false)
    console.log(post?.bio)

    return (
        <div className="post">
            <div className="post__header">
                <Avatar className={classes.small} alt="Poster" src={post?.poster?.urlPic} />
                <h3>{post?.poster?.username?.charAt(0)?.toUpperCase() + post?.poster?.username?.slice(1)}</h3>
            </div>
            <div className="post__post">
                <img alt="post" src={post?.picUrl}/>
            </div>
            <div className="post__LCS">
                {like !== true ? <FavoriteBorderIcon onClick={() => setLike(!like)}/> : <FavoriteRoundedIcon className="post__LCS__liked" onClick={() => setLike(!like)}/> }
                <CommentIcon />
                <ShareIcon />
                {save !== true ? <BookmarkBorderIcon onClick={() => setSave(!save)} className="post__LCS__S"/> : <BookmarkIcon onClick={() => setSave(!save)} className="post__LCS__S"/>}
                <p>{post?.likes?.length} Likes</p>
            </div>
            <div className="post__bio">
                <div className="post__poster">
                    <h3>{post?.poster?.username?.charAt(0)?.toUpperCase() + post?.poster?.username?.slice(1)}</h3>
                </div>
                <div className="post__bio__bio">
                    <p>{shownbio} {(post?.bio?.length > 60 && plus === false) && <p style={{float: "right", cursor: "pointer", color: "gray", fontWeight: 700}} onClick={() => {stShwonBio(post?.bio); setPlus(true)}}>plus</p>}</p>
                </div>

            </div>
            <div className="post__comments">
                <h1>Comments</h1>
                <Comment />
            </div>
        </div>
    )
}

export default Post
