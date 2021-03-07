import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import '../styles/Noti.css'
import { useStateValue } from "./StateProvider";
import axios from '../axios'

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

function Notifications({not}) {

    const classes = useStyles();
    const [ state , dispatch] = useStateValue();
    const [followed, setFollowed] = useState(state?.userDB?.peopleUserFoll?.map(x => x._id).includes(not?.data?._id))
    const [asking, setAsking] = useState(not?.data?.asking?.includes(state?.userDB?._id))

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

  const acceptUser = (asker) => {
    axios.put(`user/accept/${state?.userDB?._id}`, {
      asker: asker
    })
  }

    return (
            <div className="not">
                <Avatar className={classes.xsmall} alt="" src={not?.data?.urlPic} />
                <h5>{not?.data?.username}</h5>
                <p>{not?.type === "asking"? "Asking to follow you" : "Starts following You"}</p>
                {asking === true
                ?
                <button disabled={true}>Asking</button>
                :
                followed === true 
                ?
                <button disabled={true}>Followed</button>
                :
                <button onClick={() => followUser(not?.data?._id)}>Follow</button>  
                }
                {not?.type === "asking" && <button onClick={() => acceptUser(not?.data?._id)}>Accept</button>}
            </div>
    )
}

export default Notifications
