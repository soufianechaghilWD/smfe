import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import '../styles/Noti.css'

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

function Notifications() {

    const classes = useStyles();

    return (
            <div className="not">
                <Avatar className={classes.xsmall} alt="" src="https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png" />
                <h5>Notifator</h5>
                <p>Starts following You</p>
                <button>Follow</button>
            </div>
    )
}

export default Notifications
