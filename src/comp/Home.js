import React, { useEffect } from 'react'
import { useStateValue } from "./StateProvider";
import { useHistory }from 'react-router-dom';
import '../styles/Home.css'
import Header from './Header';
import Post from './Post';
import Sugg from './Sugg';
import axios from '../axios'
function Home() {

    const [ state , dispatch] = useStateValue();
    const history = useHistory();

    useEffect(() => {
        if(state.user === undefined || state.user === null){
            history.push('/')
        }
    }, [])
    useEffect(() => {
        const getSugg = axios.get(`/user/sugg/${state?.user?.user?.uid}`)
        .then((res) => {
            dispatch({
                type: "SET__SUGG",
                sugg: res.data
            })
        })
        return getSugg
    }, [])

    return (
        <div className="home">
            <Header />
            <div className="home__content">
                <div className="home__posts">
                    <Post />
                    <Post />
                    <Post />
                </div>
                <div className="home__sugg">
                    <Sugg />
                </div>
            </div>
        </div>
    )
}

export default Home
