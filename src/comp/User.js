import React, { useEffect } from 'react'
import { useStateValue } from "./StateProvider";
import { useHistory }from 'react-router-dom';

function User({user}) {

    const [ state , dispatch] = useStateValue(); 
    const history = useHistory();
    useEffect(() => {
        if(state.user === undefined || state.user === null){
            history.push('/')
        }
    }, [])

    return (
        <div className="profile">
            <h1>profile</h1>
        </div>
    )
}

export default User
