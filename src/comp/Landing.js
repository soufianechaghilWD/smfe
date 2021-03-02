import React, { useState } from 'react'
import '../styles/Landing.css'
import Right from '../files/Front.png'
import Logo from '../files/Logo.png'
import { useHistory }from 'react-router-dom';
import { auth } from '../firebase';
import { useStateValue } from "./StateProvider";
import axios from '../axios'

function Landing() {

    const history = useHistory();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [ state , dispatch] = useStateValue();

    const signin = () => {
        //Signin the user using firebase

        auth.signInWithEmailAndPassword(email, password)
        .then(authUser => {
            if(authUser){
                //set the user in the context API and take the user to home 
                dispatch({
                    type: "SET__USER",
                    user: authUser
                }) 

                console.log("firebase auth has been done")
                const promise1 = new Promise((resolve, reject) => {
                    resolve(axios.get(`/user/one/${authUser.user.displayName}`))
                })
                promise1.then((res) => {
                    const promise2 = new Promise((resolve, reject) => {
                        resolve(dispatch({
                            type: "SET__USERDB",
                            userDB: res.data[0]
                        }))
                    })
                    promise2.then(() => {
                        history.push('/home')
                    })
                })
            }
        })
    }


    return (
        <div className="landing">
            <div className="landing__content">
                <div className="landing__left">
                    <img src={Right} alt="" />
                </div>
                <div className="landing__right">
                    <img src={Logo} alt="" />
                    <div>
                        <label>Email</label>
                        <input type="email" placeholder="Type your Email" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" placeholder="Type your Password" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>                    
                    <button onClick={signin}>Sign In</button>
                    <p>If you don't have an account <span onClick={() => history.push('/signup')}>Sign Up</span></p>
                </div>
            </div>
        </div>
    )
}

export default Landing
