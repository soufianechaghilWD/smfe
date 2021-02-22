import React, { useEffect } from 'react'
import { useStateValue } from "./StateProvider";
import { useHistory }from 'react-router-dom';


function Home() {

    const [ state , dispatch] = useStateValue();
    const history = useHistory();

    useEffect(() => {
        if(state.user === undefined || state.user === null){
            history.push('/')
        }
    }, )

    return (
        <div className="home">
            <h1>{state?.user?.user?.displayName}</h1>
        </div>
    )
}

export default Home
