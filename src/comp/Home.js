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
        // Test if the User is Auth and then get the Suggestions and the posts
        if(state.user === undefined || state.user === null){
            history.push('/')
        }else{
            if(state?.userDB?.peopleUserFoll?.length <= 1){
                history.push('/allsugg')
            }
            const promise = new Promise((resolve, reject) => {
                resolve(axios.get(`/post/page/${state?.userDB?._id}`))
            })
            promise.then((res) => {
                setPosts(res.data)
                const getSugg = new Promise((rese, reje) =>{
                    rese(axios.get(`/user/sugg/${state?.userDB?._id}`))
                })
                getSugg.then((resu) => {
                    dispatch({
                        type: "SET__SUGG",
                        sugg: resu.data
                    })
                })
            })

        }
    }, [])


    return (
        <div className="home">
            <Header />
            <div className="home__content">
                <div className="home__posts">
                    {posts?.map(post => <Post key={post._id} post={post}/>)}
                </div>
                <div className="home__sugg">
                    <Sugg />
                </div>
            </div>
        </div>
    )
}

export default Home
