import React, { useEffect } from 'react'
import { useStateValue } from "./StateProvider";
import { useHistory }from 'react-router-dom';
import Header from './Header';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';
import '../styles/User.css'

const useStyles = makeStyles((theme) => ({
    sizee: {
      width: theme.spacing(15),
      height: theme.spacing(15),
    }
}));

function User({user}) {

    const classes = useStyles()
    const [ state , dispatch] = useStateValue(); 
    const history = useHistory();
    /*useEffect(() => {
        if(state.user === undefined || state.user === null){
            history.push('/')
        }
    }, [])*/

    return (
        <div className="profile">
            <Header />
            <div className="profile__header">
                <Avatar className={classes.sizee} alt="Poster" src="https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png" />
                <div className="profile__header__info">
                    <div className="profile__header__info__row">
                        <h3>soufiane_myfb</h3>
                        <button>Update Profile</button>
                        <SettingsIcon className="profile__ic"/>
                    </div>
                    <div className="profile__header__info__row">
                        <p>2 Posts</p>
                        <p>69 followers</p>
                        <p>409 following</p>
                    </div>
                    <div className="profile__header__info__row">
                        <p>soufiane</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User
