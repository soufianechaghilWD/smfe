import React, { useEffect } from 'react'
import '../styles/Settings.css'
import Header from './Header'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { useStateValue } from "./StateProvider";
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
  }));

function Settings() {

    const classes = useStyles();
    const [ state , dispatch] = useStateValue();
    const history = useHistory();
    useEffect(() => {
        if(state.user === undefined || state.user === null){
            history.push('/')
        }
    }, [])

    return (
        <div className="settings">
            <Header />
            <h1>Settings</h1>
            <div className="settings__content">
                <h2>Change Picture</h2>
                <div className="settings__part">
                    <Avatar className={classes.small} alt={state?.user?.user?.displayName} src={state?.user?.user?.photoURL}/>
                    <input type="file"/>
                </div>
                <h2>Change Username</h2>
                <div className="settings__part">
                    <h3>{state?.user?.user?.displayName.charAt(0).toUpperCase() + state?.user?.user?.displayName.slice(1)}</h3>
                    <input type="text" placeholder={state?.user?.user?.displayName} />
                </div>
                <h2>Change Privacy</h2>
                <div className="settings__part">
                    <h3>Private</h3>
                    <input type="checkbox"  />
                </div>
            </div>
        </div>
    )
}

export default Settings
