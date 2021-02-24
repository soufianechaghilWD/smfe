import React from 'react'
import '../styles/Sugg.css'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { useStateValue } from "./StateProvider";


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

    const returnSugg = () => {
        return <div className="sugg__sugg">
                <Avatar className={classes.small} alt="Poster" src="https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png" />
                <h5>Suugestion1<br /><span>Suggestion for you</span></h5>
                <p>Follow</p>
        </div>
    }

    return (
        <div className="sugg">
            <div className="sugg__header">
                <Avatar className={classes.moy} alt="Poster" src={state?.user?.user?.photoURL} />
                <h3>{state?.user?.user?.displayName.charAt(0).toUpperCase() + state?.user?.user?.displayName.slice(1)}</h3>
                <p>Logout</p>
            </div>
            <div className="sugg__all">
                <h4>Suggestions for you</h4>
                <p>See All</p>
            </div>
            {returnSugg()}
            {returnSugg()}
            {returnSugg()}
        </div>
    )
}

export default Sugg
