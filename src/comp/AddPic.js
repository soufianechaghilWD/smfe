import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import '../styles/AddPic.css'

  const useStyles = makeStyles((theme) => ({
    paper: {
      width: 600,
      height: 500,
      backgroundColor: theme.palette.background.paper,
      border: '1px solid rgba(0, 0, 0, .6)',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      display: "block",
      margin: "auto",
      marginTop: 100
    },
  }));


function AddPic() {

    const classes = useStyles();
    const [file, setFile] = useState(null)
    const [bio, setBio] = useState("")

    const publishPost = () => {

        //post the pic to the firebase store and post the returned Url on the database
    }

    return (
        <div id="addpic"  className={classes.paper}>
            <h1>Post a Picture</h1>
            <input type="file" value={file} onChange={(e) => setFile(e.target.value)} />
            <div>
                <h3>Say something </h3>
                <textarea rows={6} value={bio} onChange={(e) => setBio(e.target.value)} />
            </div>
            <button onClick={publishPost} >Publish</button>
        </div>
    )
}

export default AddPic
