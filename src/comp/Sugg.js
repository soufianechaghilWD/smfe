import React, { useState } from 'react'
import '../styles/Sugg.css'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { useStateValue } from "./StateProvider";
import { useHistory }from 'react-router-dom';
import { auth } from '../firebase';
import axios from '../axios'
import OneSu from './OneSu';



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
function Sugg() {

    const classes = useStyles();
    const [ state , dispatch] = useStateValue();
    const history = useHistory();


    const logout = () => {
        auth.signOut()
        .then(() => {
            dispatch({
                type: "SET__USER",
                user: null
            })
        })
        .then(() => {
            history.push('/')
        })
    }
    const profile = (profileId) => {
        history.push('/profile', {profileId: profileId})
    }


    return (
        <div className="sugg">
            <div className="sugg__header">
                <Avatar style={{cursor: "pointer"}} className={classes.moy} alt="Poster" src={state?.userDB?.urlPic}  onClick={() => profile(state?.userDB?._id)}/>
                <h3 onClick={() => profile(state?.userDB?._id)}>{state?.userDB?.username?.charAt(0)?.toUpperCase() + state?.userDB?.username?.slice(1)}</h3>
                <p onClick={logout}>Logout</p>
            </div>
            <div className="sugg__all">
                <h4>Suggestions for you</h4>
                <p onClick={() => history.push('/allsugg')}>See All</p>
            </div>
            {state?.sugg?.slice(0, 3)?.map(one => <OneSu key={one._id} sugg={one}/>)}
        </div>
    )
}

export default Sugg
