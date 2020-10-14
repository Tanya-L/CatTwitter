import React, {useEffect, useState} from "react";
import TweetBox from "./TweetBox";
import Post from "../Posts/Post";
import "./tweets.css";
// import db from "./firebase";
import FlipMove from "react-flip-move";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import axios from "axios";

class CentralColumn extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            posts: []
        }

        this.updateFeed = this.updateFeed.bind(this)
    }

    componentDidMount() {
        this.updateFeed();
    }

    updateFeed() {
        axios.get('http://localhost:5000/api/posts')
            .then(res => this.setState({posts: res.data}))
        // axios.get('http://localhost:5000/api/posts/following')
        //     .then(res => setPosts(res.data))
    }

    render() {
        return (
            <div className="tweet">
                <div className="tweet__header">
                    <h2>Home</h2>
                    <StarBorderIcon/>
                </div>

                <TweetBox updateFeed={this.updateFeed}/>

                <FlipMove>
                    {this.state.posts.map((post) => (
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
}

export default CentralColumn;