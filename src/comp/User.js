import React, { useEffect, useState } from 'react'
import { useStateValue } from "./StateProvider";
import { useHistory }from 'react-router-dom';
import Header from './Header';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';
import '../styles/User.css'
import PostProfile from './PostProfile';
import { useLocation } from "react-router-dom";
import axios from '../axios'
import Modal from '@material-ui/core/Modal';
import CloseIcon from '@material-ui/icons/Close';
import OneLiker from './OneLiker';

const useStyles = makeStyles((theme) => ({
    sizee: {
      width: theme.spacing(15),
      height: theme.spacing(15),
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

function User() {

    const classes = useStyles()
    const [ state , dispatch] = useStateValue(); 
    const history = useHistory();
    const location = useLocation();
    const myparam = location.state.profileId;
    const [user, setUser] = useState(null)
    const [openMo, setopenMo] = useState(false)
    const [openMoother, setopenMoother] = useState(false)

    useEffect(() => {
        if(state.user === undefined || state.user === null){
            history.push('/')
        }
    }, [])

    useEffect(() => {
        const getData = axios.get(`/user/one/${myparam}`).then(res => setUser(res.data[0]))
        return getData
    }, [myparam])

    const followUser = (wantedId) => {
        axios.put(`/user/${wantedId}`, {
            asker: state?.userDB?._id
        })
        .then((res) => {
            const promise = new Promise((reso, reje) => {
                reso(dispatch({
                    type: "SET__USERDB",
                    userDB: res.data
                }))
            })
            promise.then(() => {
                dispatch({
                    type: "SET__USER",
                    user: res.data
                })
                dispatch({
                    type: "SET__SUGG",
                    sugg: state?.sugg?.filter(one => one._id !== wantedId)
                })
            }) 
        })
    }

    const handleOpenMo = () => {
        if(user?._id === state?.userDB?._id){
            setopenMo(true)
        }
        else if(user?.private){
            if(user?.peopleFollUser?.map(x => x._id)?.includes(state?.userDB?._id)){
                setopenMo(true)
            }
        }else{
            setopenMo(true)
        }
    }
    const handleOpenMoother = () => {

        if(user?._id === state?.userDB?._id){
            setopenMoother(true)
        }
        else if(user?.private){
            if(user?.peopleFollUser?.map(x => x._id)?.includes(state?.userDB?._id)){
                setopenMoother(true)
            }
        }else{
            setopenMoother(true)
        }
    }


    return (
        <div className="profile">
            <Header />
            <div className="profile__header">
                <Avatar className={classes.sizee} alt="Poster" src={user?.urlPic} />
                <div className="profile__header__info">
                    <div className="profile__header__info__row">
                        <h3>{user?.username?.charAt(0)?.toUpperCase() + user?.username?.slice(1)}</h3>
                        {state?.userDB?._id === user?._id ? 
                        <button>Update Profile</button> : 
                        state?.userDB?.peopleUserFoll?.includes(user?._id) === true ? 
                        <p className="profile__header__info__row__followed">Following</p> : 
                        user?.asking?.map(x => x._id)?.includes(state?.userDB?._id) === true ?
                        <p className="profile__header__info__row__followed">Asked</p> : 
                        <p className="profile__header__info__row__follow" onClick={() => followUser(user?._id)}>Follow</p>}
                        {state?.userDB?._id === user?._id && <SettingsIcon className="profile__ic"/>}
                    </div>
                    <div className="profile__header__info__row">
                        <p>{user?.posts?.length} Posts</p>
                        <p style={{cursor: "pointer"}} onClick={handleOpenMo} >{user?.peopleFollUser?.length} followers</p>
                        <p style={{cursor: "pointer"}} onClick={handleOpenMoother} >{user?.peopleUserFoll?.length} following</p>
                    </div>
                    <div className="profile__header__info__row">
                        <p>soufiane {/*Here need the user name neet to add it when signin up*/}</p>
                    </div>
                </div>
            </div>
            {state?.userDB?._id === user?._id ? 
            <div className="profile__posts">
                {user?.posts?.map(post => <PostProfile post={post} />)?.reverse()}
            </div>
            :
            user?.private === false ?
            <div className="profile__posts">
                {user?.posts?.map(post => <PostProfile post={post} />)?.reverse()}
            </div>
            :
            user?.peopleFollUser?.map(x => x._id)?.includes(state?.userDB?._id) === true
            ?
            <div className="profile__posts">
                {user?.posts?.map(post => <PostProfile post={post} />)?.reverse()}
            </div>
            : 
            <h1 style={{textAlign: "center", marginTop: 25}}>This account is private</h1>
            }
            <Modal
                open={openMo}
                onClose={() => setopenMo(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                className="post__post__modal"
            >
                <div className={`${classes.paperLi} modal__likes`}>
                    <div className="likers__header">
                        <h2>Followers</h2>
                        <CloseIcon style={{cursor: "pointer"}} onClick={() => setopenMo(false)}/>
                    </div>
                    <div className="modal__likes__likers">
                        {user?.peopleFollUser?.map(one => <OneLiker one={one}/> )} 
                    </div>
                </div>
            </Modal>
            <Modal
                open={openMoother}
                onClose={() => setopenMoother(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                className="post__post__modal"
            >
                <div className={`${classes.paperLi} modal__likes`}>
                    <div className="likers__header">
                        <h2>Following</h2>
                        <CloseIcon style={{cursor: "pointer"}} onClick={() => setopenMoother(false)}/>
                    </div>
                    <div className="modal__likes__likers">
                        {user?.peopleUserFoll?.map(one => <OneLiker one={one}/> )} 
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default User
