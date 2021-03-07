import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { useStateValue } from "./StateProvider";
import axios from '../axios'
import { useHistory }from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        },
        xsmall: {
            width: theme.spacing(3),
            height: theme.spacing(3),
    }
}))

function OneLiker({one}) {

    const classes = useStyles();
    const [ state , dispatch] = useStateValue();
    const [followed, setFollowed] = useState(state?.userDB?.peopleUserFoll?.includes(one?._id))
    const history = useHistory();

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
                setFollowed(true)
            }) 
        })
    }


    return (
        <div>
            <Avatar style={{cursor: "pointer"}} className={classes.small} alt="Poster" src={one?.urlPic}  onClick={() => history.push('/profile', {profileId: one?._id})}/>
            <h3 style={{cursor: "pointer"}} onClick={() => history.push('/profile', {profileId: one?._id})}>{one?.username?.charAt(0)?.toUpperCase() + one?.username?.slice(1)}</h3>
            <button onClick={() => followUser(one._id)} disabled={followed} className={followed && "ifFollowed"}> {followed === true ? "Following" : "Follow"} </button>
        </div>
    )
}

export default OneLiker
