import React, {useState} from "react";
import "./tweetBox.css";
import {Avatar, Button} from "@material-ui/core";
import ImageIcon from '@material-ui/icons/Image';
import GifIcon from '@material-ui/icons/Gif';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import MoodIcon from '@material-ui/icons/Mood';
import EventIcon from '@material-ui/icons/Event';
import axios from "axios";
import {getApiURL} from "../../Constants";

// Displays input box with "What's happening" form
function TweetBox(props) {
    const [tweetMessage, setTweetMessage] = useState("");

    const sendTweet = (e) => {
        e.preventDefault();

        axios.post(getApiURL('posts/add'), {text: tweetMessage})
            .then(res => {
                setTweetMessage("")
                props.updateFeed()
            })
    };

    return (
        <div className="tweetBox">
            <form>
                <div className="tweetBox__input">
                    <Avatar/>
                    <input
                        onChange={(e) => setTweetMessage(e.target.value)}
                        value={tweetMessage}
                        placeholder="What's happening?"
                        type="text"
                    />
                </div>
                <div className="tweetBox__footer">
                    <dib className="tweetBox__icons">
                        <ImageIcon/>
                        <GifIcon/>
                        <EqualizerIcon/>
                        <MoodIcon/>
                        <EventIcon/>
                    </dib>
                    <Button
                        onClick={sendTweet}
                        type="submit"
                        className="tweetBox__tweetButton"
                    >
                        Tweet
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default TweetBox;