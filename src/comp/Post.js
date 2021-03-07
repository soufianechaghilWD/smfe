import React, { useState } from 'react'
import '../styles/Post.css'
import Avatar from '@material-ui/core/Avatar';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CommentIcon from '@material-ui/icons/Comment';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import Comment from './Comment'
import { makeStyles } from '@material-ui/core/styles';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import axios from '../axios'
import { useStateValue } from "./StateProvider";
import Modal from '@material-ui/core/Modal';
import Allcomments from './Allcomments';
import CloseIcon from '@material-ui/icons/Close';
import OneLiker from './OneLiker';
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
    paper: {
        position: 'absolute',
        width: "80%",
        height: "75%",
        maxWidth: "1000px",
        maxHeight: "900px",
        backgroundColor: theme.palette.background.paper,
        border: 'none',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(0),
        outlineWidth: 0
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


function Post({post}) {

    const [thepost, setThePost] = useState(post)
    const [save, setSave] = useState(false)
    const [comm, setComm] = useState('')
    const classes = useStyles();
    const [ state , dispatch] = useStateValue();
    const [like, setLike] = useState(thepost?.likes?.some(like => like._id === state?.userDB?._id))
    const [open, setOpen] = useState(false)
    const [openMo, setopenMo] = useState(false)
    const history = useHistory();

    const rightSize = (str) => {
        if(str.length > 60){
            return str.slice(0, 57) + "... "
        }else return str
    }
    const [shownbio, stShwonBio] = useState(rightSize(thepost?.bio))
    const [plus, setPlus] = useState(false)

    const addComment = () => {
        axios.put(`/comment/add/${thepost?._id}`, {
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

    const getLikers = () => {
        if(thepost?.likes?.length > 0){
            setopenMo(true)
        }
    }



    return (
        <div className="post">
            <div className="post__header">
                <Avatar  style={{cursor: "pointer"}} onClick={() => history.push('/profile', {profileId: thepost?.poster?._id})} className={classes.small} alt="Poster" src={thepost?.poster?.urlPic} />
                <h3 style={{cursor: "pointer"}} onClick={() => history.push('/profile', {profileId: thepost?.poster?._id})} >{thepost?.poster?.username?.charAt(0)?.toUpperCase() + thepost?.poster?.username?.slice(1)}</h3>
            </div>
            <div className="post__post">
                <img alt="post" src={thepost?.picUrl}/>
            </div>
            <div className="post__LCS">
                {like !== true ? <FavoriteBorderIcon onClick={addLike}/> : <FavoriteRoundedIcon className="post__LCS__liked"/> }
                <CommentIcon />
                <ShareIcon />
                {save !== true ? <BookmarkBorderIcon onClick={() => setSave(!save)} className="post__LCS__S"/> : <BookmarkIcon onClick={() => setSave(!save)} className="post__LCS__S"/>}
                <p onClick={getLikers}>{thepost?.likes?.length} Likes</p>
            </div>
            <div className="post__bio">
                <div className="post__poster">
                    <h3 style={{cursor: "pointer"}} onClick={() => history.push('/profile', {profileId: thepost?.poster?._id})}>{thepost?.poster?.username?.charAt(0)?.toUpperCase() + thepost?.poster?.username?.slice(1)}</h3>
                </div>
                <div className="post__bio__bio">
                    <p>{shownbio} {(thepost?.bio?.length > 60 && plus === false) && <p style={{float: "right", cursor: "pointer", color: "gray", fontWeight: 700}} onClick={() => {stShwonBio(thepost?.bio); setPlus(true)}}>plus</p>}</p>
                </div>
            </div>
            <div className="post__comments">
                <h1>Comments</h1>
                {thepost?.comments?.length > 3 && <p onClick={() => setOpen(true)}>View All {thepost?.comments?.length} Comments</p>}
                {thepost?.comments?.slice(0, 3)?.map(comment => <Comment comment={comment}/>)}
                {/* <Comment /> */}
                {/* Add a comment section */}
                <div className="post__add__comment">
                    <Avatar className={classes.small} alt="Poster" src={state?.userDB?.urlPic} />
                    <input type="text" value={comm} onChange={(e) => setComm(e.target.value)} placeholder="Add a comment..."/>
                    <button onClick={addComment} disabled={!comm} >Pulish</button>
                </div>
            </div>
            <Modal
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              className="post__post__modal"
            >
                <Allcomments className={classes.paper} post={thepost} />
            </Modal>
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

export default Post
