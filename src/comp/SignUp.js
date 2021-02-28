import React, { useState } from 'react'
import '../styles/SignUp.css'
import Right from '../files/Front.png'
import Logo from '../files/Logo.png'
import { useHistory }from 'react-router-dom';
import { auth } from '../firebase' 
import { useStateValue } from "./StateProvider";
import axios from '../axios'

function SignUp() {

    const history = useHistory();
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [ state , dispatch] = useStateValue();


    const signup = () => {

        //Authentification using firebase
        auth.createUserWithEmailAndPassword(email, password)
        .then(authUser => {
            if(authUser){
                //Update the user in firebase && Create a user in the database "then" set the user in the context API and take the user to home Page
                authUser.user.updateProfile({
                    photoURL: 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png'
                })
                .then(() => {
                    //Save the user on the DB
                    axios.post('/user', {
                        username: username,
                        email: email,
                        urlPic: "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
                        posts: [],
                        peopleUserFoll: [],
                        peopleFollUser: [],
                        private: false,
                        asking: [],
                        newLikes: [],
                        acceptingFrie: []
                    })
                    .then((res) => {
                        authUser.user.updateProfile({
                            displayName: res.data._id
                        })
                    })
                })
                .then(() => {
                    dispatch({
                        type: "SET__USER",
                        user: authUser
                    }) 
                }) 
                .then(() => {
                    history.push('/home') 
                })
            }
        })

        setEmail('')
        setUsername('')
        setPassword('')
    }

    return (
        <div className="signup">
            <div className="signup__content">
                <div className="signup__left">
                    <img src={Right} alt="" />
                </div>
                <div className="signup__right">
                    <img src={Logo} alt="" />
                    <div>
                        <label>Email</label>
                        <input type="email" placeholder="Type Your Email" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label>Username</label>
                        <input type="text" placeholder="Type your Username" value={username} onChange={e => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" placeholder="Type Your Password" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>                    
                    <button onClick={signup}>Sign Up</button>
                    <p>If you don't have an account <span onClick={() => {history.push('/')}}>Sign In</span></p>
                </div>
            </div>
        </div>
    )
}

export default SignUp
