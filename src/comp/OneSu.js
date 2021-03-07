import React, { useState } from 'react'
import { useStateValue } from "./StateProvider";
import axios from '../axios'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { useHistory }from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    moy: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
      }
  }));

function OneSu({sugg}) {
    const classes = useStyles();
    const [ state , dispatch] = useStateValue();
    const [followed, setFollowed] = useState(false)
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
        <div className="sugg__sugg">
                <Avatar style={{cursor: "pointer"}} onClick={() => history.push('/profile', {profileId: sugg?._id})} className={classes.small} alt="Poster" src={sugg?.urlPic} />
                <h5 style={{cursor: "pointer"}} onClick={() => history.push('/profile', {profileId: sugg?._id})}>{sugg?.username?.charAt(0)?.toUpperCase() + sugg?.username?.slice(1)}<br /><span>Suggestion for you</span></h5>
                {
                    sugg?.asking?.includes(state?.userDB?._id) === true ?
                    <p>Asked</p>
                    :
                    followed === false ?
                    <p onClick={() => followUser(sugg._id)}>Follow</p>
                    :
                    <p>Followed</p>
                }
        </div>
    )
}

export default OneSu
