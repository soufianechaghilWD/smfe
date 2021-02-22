import React from 'react'
import '../styles/SignUp.css'
import Right from '../files/right.png'
import Logo from '../files/Logo.png'
import { useHistory }from 'react-router-dom';


function SignUp() {

    const history = useHistory();

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
                        <input type="email" />
                    </div>
                    <div>
                        <label>Username</label>
                        <input type="text" />
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" />
                    </div>                    
                    <button>Sign Up</button>
                    <p>If you don't have an account <span onClick={() => {history.push('/')}}>Sign In</span></p>
                </div>
            </div>
        </div>
    )
}

export default SignUp
