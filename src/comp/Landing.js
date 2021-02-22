import React from 'react'
import '../styles/Landing.css'
import Right from '../files/right.png'
import Logo from '../files/Logo.png'
import { useHistory }from 'react-router-dom';

function Landing() {

    const history = useHistory();

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
                        <input type="email" />
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" />
                    </div>                    
                    <button>Sign In</button>
                    <p>If you don't have an account <span onClick={() => history.push('/signup')}>Sign Up</span></p>
                </div>
            </div>
        </div>
    )
}

export default Landing
