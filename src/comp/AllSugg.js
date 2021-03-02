import React, { useEffect } from 'react'
import Header from './Header';
import "../styles/AllSugg.css"
import { useStateValue } from "./StateProvider";
import OneSu from './OneSu';
import { useHistory }from 'react-router-dom';


function AllSugg() {

    const [ state , dispatch] = useStateValue();
    const history = useHistory();
    useEffect(() => {
        if(state.user === undefined || state.user === null){
            history.push('/')
        }
    }, [])

    return (
        <div className="allsugg">
            <Header />
            <h1>All Suggestions</h1>
            <div className="allsugg__content">
                {state?.sugg?.map(one => <OneSu key={one._id} sugg={one}/>)}
            </div>
        </div>
    )
}

export default AllSugg
