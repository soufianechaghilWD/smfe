import React, { useEffect, useState } from 'react'
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
    const [posts, setPosts] = useState([])
    
    useEffect(() => {
        // Test if the User is Auth
        if(state.user === undefined || state.user === null){
            history.push('/')
        }
    }, [])
    
    useEffect(() => {
        // Get the User Info
        const  getData =  axios.get(`/user/one/${state?.user?.user?.displayName}`)
        .then((res) => {
            dispatch({
                type: "SET__USERDB",
                userDB: res.data
            })
            axios.get(`/user/sugg/${res?.data?._id}`)
            .then((res) => {
                dispatch({
                    type: "SET__SUGG",
                    sugg: res.data
                })
            })
            axios.get(`/post/page/${res?.data?._id}`)
            .then((res) => {
                setPosts(res.data)
                console.log(res.data)
            })
        })
        return getData
    }, [])





    return (
        <div className="home">
            <Header />
            <div className="home__content">
                <div className="home__posts">
                    {/* <Post />
                    <Post />
                    <Post /> */}
                    {posts?.map(post => <Post post={post}/>)}
                </div>
                <div className="home__sugg">
                    <Sugg />
                </div>
            </div>
        </div>
    )
}

export default Home
