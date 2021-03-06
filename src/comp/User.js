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

const useStyles = makeStyles((theme) => ({
    sizee: {
      width: theme.spacing(15),
      height: theme.spacing(15),
    }
}));

function User() {

    const classes = useStyles()
    const [ state , dispatch] = useStateValue(); 
    const history = useHistory();
    const location = useLocation();
    const myparam = location.state.profileId;
    const [user, setUser] = useState(null)

    useEffect(() => {
        if(state.user === undefined || state.user === null){
            history.push('/')
        }
    }, [])

    useEffect(() => {
        const getData = axios.get(`/user/one/${myparam}`).then(res => setUser(res.data[0]))
        return getData
    }, [])
    

    return (
        <div className="profile">
            <Header />
            <div className="profile__header">
                <Avatar className={classes.sizee} alt="Poster" src={user?.urlPic} />
                <div className="profile__header__info">
                    <div className="profile__header__info__row">
                        <h3>{user?.username?.charAt(0)?.toUpperCase() + user?.username?.slice(1)}</h3>
                        <button>Update Profile</button>
                        <SettingsIcon className="profile__ic"/>
                    </div>
                    <div className="profile__header__info__row">
                        <p>{user?.posts?.length} Posts</p>
                        <p>{user?.peopleFollUser?.length} followers</p>
                        <p>{user?.peopleUserFoll?.length} following</p>
                    </div>
                    <div className="profile__header__info__row">
                        <p>soufiane {/*Here need the user name neet to add it when signin up*/}</p>
                    </div>
                </div>
            </div>
            <div className="profile__posts">
                {user?.posts?.map(post => <PostProfile post={post} />)?.reverse()}
            </div>
        </div>
    )
}

export default User
