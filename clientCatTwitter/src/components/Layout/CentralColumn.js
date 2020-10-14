import React from "react";
import "./tweets.css";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import PostFeed from "../Posts/PostFeed";
// import TweetBox from "./TweetBox";

class CentralColumn extends React.Component {
    constructor (props) {
        super(props)
    }


    render() {
        return (
            <div className="tweet">
                <div className="tweet__header">
                    <h2>Home</h2>
                    <StarBorderIcon/>
                </div>
                <PostFeed showTweetBox={true} />
            </div>
        );
    }
}

export default CentralColumn;