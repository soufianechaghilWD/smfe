import React, { useEffect, useState } from 'react'
import '../styles/Settings.css'
import Header from './Header'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { useStateValue } from "./StateProvider";
import { useHistory }from 'react-router-dom';
import axios from '../axios'
import { storage } from '../firebase';

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
    const [inp, setInp] = useState(state?.userDB?.username);
    const [privacy, setPrivacy] = useState(state?.userDB?.private)
    const [file, setFile] = useState(null)

    useEffect(() => {
        if(state.user === undefined || state.user === null){
            history.push('/')
        }
    }, [])

    function handleChange(e) {
        setFile(e.target.files[0]);
    }

    const update = () => {
        if(file === null){
            axios.put(`user/update/${state?.userDB?._id}`, {
                username: inp,
                private: privacy
            }).then((res) => {
                dispatch({
                    type: "SET__USERDB",
                    userDB: res.data
                })
            })
        }else{
            const uploadTask = storage.ref(`/images/${file.name}`).put(file);
            uploadTask.on("state_changed", console.log, console.error, () => {
                storage
                .ref("images")
                .child(file.name)
                .getDownloadURL()
                .then((url) => {
                    console.log("url ", url)
                    axios.put(`user/update/${state?.userDB?._id}`, {
                    urlPic: url,
                    username: inp,
                    private: privacy
                    }).then((res) => {
                        console.log(res.data)
                        dispatch({
                            type: "SET__USERDB",
                            userDB: res.data
                        })
                        setFile(null)
                    })
                });
            });
        }

    }
    return (
        <div className="settings">
            <Header />
            <h1>Settings</h1>
            <div className="settings__content">
                <h2>Change Picture</h2>
                <div className="settings__part">
                    <Avatar className={classes.small} alt={state?.userDB?.urlPic} src={state?.userDB?.picUrl}/>
                    <input type="file" onChange={handleChange}/>
                </div>
                <h2>Change Username</h2>
                <div className="settings__part">
                    <h3>{state?.userDB?.username.charAt(0).toUpperCase() + state?.userDB?.username.slice(1)}</h3>
                    <input value={inp} onChange={e => setInp(e.target.value)} type="text" placeholder={state?.userDB?.username} />
                </div>
                <h2>Change Privacy</h2>
                <div className="settings__part">
                    <h3>Private</h3>
                    <input defaultChecked={privacy} onChange={() => setPrivacy(!privacy)} type="checkbox" />
                </div>
            </div>
            <button onClick={update}>Update</button>
        </div>
    )
}

export default Settings
