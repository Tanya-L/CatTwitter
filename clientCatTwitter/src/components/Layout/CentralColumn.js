import React, {useEffect, useState} from "react";
import TweetBox from "./TweetBox";
import Post from "../Posts/Post";
import "./tweets.css";
// import db from "./firebase";
import FlipMove from "react-flip-move";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import axios from "axios";

function CentralColumn() {
    const [
        posts, setPosts
    ] = useState([]);

    useEffect(() => {
        // db.collection("posts").onSnapshot((snapshot) =>
        //     setPosts(snapshot.docs.map((doc) => doc.data()))
        // );
        axios.get('http://localhost:5000/api/posts')
            .then(res => setPosts(res.data))
    }, []);

    return (
        <div className="tweet">
            <div className="tweet__header">
                <h2>Home</h2>
                <StarBorderIcon/>
            </div>

            <TweetBox/>

            <FlipMove>
                {posts.map((post) => (
                    <Post
                        key={post.id}
                        // displayName={post.displayName}
                        username={post.username}
                        // verified={post.verified}
                        text={post.text}
                        // avatar={post.avatar}
                        image={post.image}
                    />
                ))}
            </FlipMove>
        </div>
    );
}

export default CentralColumn;