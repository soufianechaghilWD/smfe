import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import '../styles/AddPic.css'
import { storage } from '../firebase';
import axios from '../axios'
import { useStateValue } from "./StateProvider";

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
    const [ state , dispatch] = useStateValue();
    const [done, setDone] = useState(false)

    function handleChange(e) {
      setFile(e.target.files[0]);
    }

    function handleUpload(e) {
      //upload pic to firebase and store in DB
      e.preventDefault();
      const uploadTask = storage.ref(`/images/${file.name}`).put(file);
      uploadTask.on("state_changed", console.log, console.error, () => {
        storage
          .ref("images")
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            axios.post('/post', {
              picUrl: url,
              bio: bio,
              poster: state?.userDB?._id,
              likes: [],
              comments: []
            }).then(() => {
              setBio('')
              setFile(null)
              setDone(true)
            })
          });
      });
    }

    return (
        <div id="addpic"  className={classes.paper}>
            <h1>Post a Picture</h1>
            <input type="file"  onChange={handleChange} />
            <div>
                <h3>Say something </h3>
                <textarea rows={6} value={bio} onChange={(e) => setBio(e.target.value)} />
            </div>
            <button onClick={handleUpload} >Publish</button>
            {done && <p style={{color: "green", textAlign: "center", fontWeight: 600, paddingBottom: 10}}>Posted Succefully</p>}
        </div>
    )
}

export default AddPic
