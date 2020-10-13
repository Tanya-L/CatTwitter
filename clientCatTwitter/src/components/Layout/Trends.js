import React from "react";
import "./trends.css";
import {
    TwitterTimelineEmbed,
    TwitterShareButton,
    TwitterTweetEmbed,
} from "react-twitter-embed";
import SearchIcon from "@material-ui/icons/Search";
import SettingsIcon from "@material-ui/icons/Settings";

function Trends() {
    return (
        <div className="trends">
            <div className="trends__input">
                <SearchIcon className="trends__searchIcon" />
                <input placeholder="Search Twitter" type="text" />
            </div>

            <div className="trends__trendContainer">
                <div className="trends__trendHeader">
                <h2>Trends for you</h2>
                <SettingsIcon className="trends__settingsIcon" />
                </div>
                <TwitterTweetEmbed tweetId={""} />
                <TwitterTimelineEmbed
                    sourceType="profile"
                    screenName="Naked_Tails"
                    options={{ height: 500 }}
                />

                <TwitterShareButton
                    url={"https://facebook.com/tanya.lytovchenko"}
                />
            </div>
        </div>
    );
}

export default Trends;