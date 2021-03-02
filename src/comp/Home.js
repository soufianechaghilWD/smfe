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
            dispatch({
                type: "SET__SUGG",
                sugg: state?.users?.sort((a, b) => b.peopleFollUser.length - a.peopleFollUser.length)?.filter(it => it._id !== state?.userDB?._id).filter(one => one.peopleFollUser.map(item => item._id).includes(state?.userDB?._id) === false).filter(use => use.private === false).slice(0, 100)
            })
            if(state?.userDB?.peopleUserFoll?.length <= 1){
                history.push('/allsugg')
            }
            const promise = new Promise((resolve, reject) => {
                resolve(axios.get(`/post/page/${state?.userDB?._id}`))
            })
            promise.then((res) => {
                setPosts(res.data)
            })

        }
    }, [])

    console.log('Sugg', state?.sugg?.filter(one => one.peopleFollUser.includes(state?.userDB?._id) === false).filter(use => use.private === false))
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
