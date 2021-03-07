import React, { useEffect, useState } from 'react'
import '../styles/Allcomments.css'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import axios from '../axios'
import { useStateValue } from "./StateProvider";
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CommentIcon from '@material-ui/icons/Comment';
import ShareIcon from '@material-ui/icons/Share';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import CloseIcon from '@material-ui/icons/Close';
import OneLiker from './OneLiker';
import Modal from '@material-ui/core/Modal';
import { useHistory }from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        },
        xsmall: {
            width: theme.spacing(3),
            height: theme.spacing(3),
    },
    paperLi: {
        position: 'absolute',
        width: "40%",
        height: "50%",
        maxWidth: "500px",
        maxHeight: "600px",
        backgroundColor: theme.palette.background.paper,
        border: 'none',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(0),
        outlineWidth: 0
    },
}));


function Allcomments({className, post}) {

    const classes = useStyles();
    const [comm, setComm] = useState('')
    const [ state , dispatch] = useStateValue();
    const [thepost, setThePost] = useState(post)
    const [like, setLike] = useState(thepost?.likes?.some(like => like._id === state?.userDB?._id))
    const [save, setSave] = useState(false)
    const [openMo, setopenMo] = useState(false)
    const history = useHistory();


    const addComment = () => {
        axios.put(`/comment/add/${post?._id}`, {
            comment: comm,
            commenter: state?.userDB?._id 
        })
        .then((resu) => {
            setComm('')
            setThePost(resu.data[0])
        })
    }

    const addLike = () => {
        axios.put(`/post/addlike/${thepost._id}`, {
            liker: state?.userDB?._id
        })
        .then((resu) => {
            setLike(true)
            setThePost(resu.data[0])
        })
    }

    const returnComment = (comment) => {
        return <div className="post__all__comment">
                    <Avatar style={{cursor: "pointer"}} onClick={() => history.push('/profile', {profileId: comment?.commenter?._id})} className={classes.small} alt="Poster" src={comment?.commenter?.urlPic} />
                    <p><span style={{cursor: "pointer"}} onClick={() => history.push('/profile', {profileId: comment?.commenter?._id})}>{comment?.commenter?.username?.charAt(0)?.toUpperCase() + comment?.commenter?.username?.slice(1)}</span> {comment?.comment}</p>
                </div>
    }

    const getLikers = () => {
        if(thepost?.likes?.length > 0){
            setopenMo(true)
        }
    }

    return (
        <div className = {`${className} allcom`}>
            <img src={thepost?.picUrl} />
            <div className="post__info">
                <div className="post__info__header">
                    <Avatar  style={{cursor: "pointer"}} onClick={() => history.push('/profile', {profileId: thepost?.poster?._id})} className={classes.small} alt="Poster" src={thepost?.poster?.urlPic} />
                    <h3 style={{cursor: "pointer"}} onClick={() => history.push('/profile', {profileId: thepost?.poster?._id})} >{thepost?.poster?.username?.charAt(0)?.toUpperCase() + thepost?.poster?.username?.slice(1)}</h3>
                    <p>Following</p>
                    <MoreHorizIcon />
                </div>
                <div className="post__all__poster">
                    <Avatar style={{cursor: "pointer"}} onClick={() => history.push('/profile', {profileId: thepost?.poster?._id})} className={classes.small} alt="Poster" src={thepost?.poster?.urlPic} />
                    <h3 style={{cursor: "pointer"}} onClick={() => history.push('/profile', {profileId: thepost?.poster?._id})}>{thepost?.poster?.username?.charAt(0)?.toUpperCase() + thepost?.poster?.username?.slice(1)}</h3>
                    <p>{thepost?.bio}</p>
                </div>
                <h2>Comments</h2>
                <div className="post__allcom">
                    {thepost?.comments?.map(one => returnComment(one))}
                </div>
                <div className="allcom__info" >
                    {like !== true ? <FavoriteBorderIcon onClick={addLike}/> : <FavoriteRoundedIcon className="post__LCS__liked"/> }
                    <CommentIcon />
                    <ShareIcon />
                    {save !== true ? <BookmarkBorderIcon onClick={() => setSave(!save)} className="post__LCS__S"/> : <BookmarkIcon onClick={() => setSave(!save)} className="post__LCS__S"/>}
                    <p onClick={getLikers} style={{textDecoration: "underline"}}>{thepost?.likes?.length} Likes</p>
                </div>
                <div className="post__add__comment">
                    <Avatar className={classes.small} alt="Poster" src={state?.userDB?.urlPic} />
                    <input type="text" value={comm} onChange={(e) => setComm(e.target.value)} placeholder="Add a comment..."/>
                    <button onClick={addComment} disabled={!comm} >Pulish</button>
                </div>
            </div>
            <Modal
                open={openMo}
                onClose={() => setopenMo(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                className="post__post__modal"
            >
                <div className={`${classes.paperLi} modal__likes`}>
                    <div className="likers__header">
                        <h2>Likes</h2>
                        <CloseIcon style={{cursor: "pointer"}} onClick={() => setopenMo(false)}/>
                    </div>
                    <div className="modal__likes__likers">
                        {thepost?.likes?.map(one => <OneLiker one={one}/> )} 
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Allcomments
