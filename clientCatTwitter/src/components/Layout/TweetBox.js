import React, {useState} from "react";
import "./tweetBox.css";
import {Avatar, Button} from "@material-ui/core";
import avatar from "../Profile/avatar.jpg";
// import db from "./firebase";
import ImageIcon from '@material-ui/icons/Image';
import GifIcon from '@material-ui/icons/Gif';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import MoodIcon from '@material-ui/icons/Mood';
import EventIcon from '@material-ui/icons/Event';

// Displays input box with "What's happening" form
function TweetBox() {
    const [tweetMessage, setTweetMessage] = useState("");

    const sendTweet = (e) => {
        e.preventDefault();

    //     db.collection("posts").add({
    //         displayName: " ",
    //         username: "",
    //         verified: true,
    //         text: tweetMessage,
    //         avatar:
    //             ""});
    //
    //     setTweetMessage("");
    };

    return (
        <div className="tweetBox">
            <form>
                <div className="tweetBox__input">
                    <Avatar src={avatar}/>
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