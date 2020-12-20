import React, {Component} from 'react'
import Post from './Post'
import FlipMove from "react-flip-move";
import TweetBox from "../Layout/TweetBox";
import axios from "axios";
import {getApiURL} from "../../Constants";


class PostFeed extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userFeed: props.userFeed,
            showTweetBox: props.showTweetBox,
            allPosts: true,
            posts: []
        }

        this.handleChange = this.handleChange.bind(this)
        this.getPosts = this.getPosts.bind(this)
    }

    getPosts() {
        let url
        if (this.props.userFeed) {
            url = getApiURL('posts/') + this.props.userFeed
        } else {
            url = getApiURL('posts')
        }
        axios.get(url)
            .then(res => this.setState({posts: res.data}))
        // axios.get(getApiURL('posts/following')
        //     .then(res => setPosts(res.data))
    }

    handleChange(event) {
        this.setState({allPosts: event.target.checked})
    }

    componentDidMount() {
        this.getPosts()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.allPosts !== this.state.allPosts) {
            this.state.allPosts
                ? this.props.getPosts()
                : this.props.getPostsByFollowingUsers()
        }
    }


    render() {
        return (
            <div>
                {this.props.showTweetBox && <TweetBox updateFeed={this.getPosts}/>}

                <FlipMove>
                    {this.state.posts.map((post) => (
                        <Post
                            postId={post.id}
                            // displayName={post.displayName}
                            username={post.username}
                            verified={post.verified}
                            text={post.text}
                            // avatar={post.avatar}
                            image={post.image}
                            createdAt={post.createdAt}
                            user={post.user}
                            ownerUserid={post.ownerUserid}
                        />
                    ))}
                </FlipMove>
            </div>
        )
    }
}

export default PostFeed;