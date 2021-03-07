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

        //Sign up the user on firebase and update it . Then Save the user on DB 

        const promise1 = new Promise((resolve, reject) => {
            resolve(auth.createUserWithEmailAndPassword(email, password))
        })
        promise1.then((authUser) => {

            const promise2 = new Promise((resolve, reject) => {
                resolve(axios.post('/user', {
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
                }))
            })
            promise2.then((res) => {
                const promise3 = new Promise((resolve, reject) => {
                    resolve(authUser.user.updateProfile({
                        displayName: res.data._id,
                        photoURL: 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png'
                    }))
                })
                promise3.then(() => {
                    const promise4 = new Promise((resolve, reject) => {
                        resolve(
                            dispatch({
                            type: "SET__USERDB",
                            userDB: res.data
                        }))
                    })
                    promise4.then(() => {
                        const promise5 = new Promise((resolve, reject) => {
                            resolve(
                                dispatch({
                                    type: "SET__USER",
                                    user: authUser
                                }) 
                            )
                        })
                        promise5.then(() => {
                            const promise6 = new Promise((reso, reje) => {
                                reso(axios.get(`/user/sugg/${res.data._id}`))
                            })
                            promise6.then((resssu) => {
                                const promise7 = new Promise((reso, reje) => {
                                    reso(dispatch({
                                        type: "SET__SUGG",
                                        sugg: resssu.data
                                    }))
                                })
                                promise7.then(() => {
                                    history.push('/home')
                                })
                            })
                        })
                    })
                })

            })
        })
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
