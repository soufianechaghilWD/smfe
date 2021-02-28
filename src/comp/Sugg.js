import React from 'react'
import '../styles/Sugg.css'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { useStateValue } from "./StateProvider";
import { useHistory }from 'react-router-dom';
import { auth } from '../firebase';


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

    const returnSugg = (sugg) => {
        return <div className="sugg__sugg">
                <Avatar className={classes.small} alt="Poster" src={sugg?.urlPic} />
                <h5>{sugg?.username?.charAt(0)?.toUpperCase() + sugg?.username?.slice(1)}<br /><span>Suggestion for you</span></h5>
                <p>Follow</p>
        </div>
    }
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


    return (
        <div className="sugg">
            <div className="sugg__header">
                <Avatar className={classes.moy} alt="Poster" src={state?.user?.user?.photoURL} />
                <h3>{state?.userDB?.username?.charAt(0)?.toUpperCase() + state?.userDB?.username?.slice(1)}</h3>
                <p onClick={logout}>Logout</p>
            </div>
            <div className="sugg__all">
                <h4>Suggestions for you</h4>
                <p onClick={() => history.push('/allsugg')}>See All</p>
            </div>
            {state?.sugg?.slice(0, 3)?.map(one => returnSugg(one))}
        </div>
    )
}

export default Sugg
