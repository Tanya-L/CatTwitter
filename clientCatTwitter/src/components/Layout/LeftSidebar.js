import React from "react";
import "./sidebar.css";
import TwitterIcon from '@material-ui/icons/Twitter';
import PetsIcon from '@material-ui/icons/Pets';
import SidebarOption from "./SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import {Button} from "@material-ui/core";
import UserPanel from "./UserPanel";
import {Route} from "react-router-dom";
import Login from "../Auth/Login";

class LeftSidebar extends React.Component {
    render() {
        return (
            <div className="sidebar">
                <div>
                    <a href="/"><TwitterIcon className="sidebar__twitterIcon"/></a>
                    <PetsIcon className="sidebar__PetsIcon"/>
                </div>

                <a href="/"><SidebarOption active Icon={HomeIcon} text="Home"/></a>
                <SidebarOption Icon={SearchIcon} text="Explore"/>
                <SidebarOption Icon={NotificationsNoneIcon} text="Notifications"/>
                <SidebarOption Icon={MailOutlineIcon} text="Messages"/>
                <SidebarOption Icon={BookmarkBorderIcon} text="Bookmarks"/>
                <SidebarOption Icon={ListAltIcon} text="Lists"/>
                <SidebarOption Icon={PermIdentityIcon} text="Profile"/>
                <SidebarOption Icon={MoreHorizIcon} text="More"/>

                {/* Button -> Tweet */}
                <Button variant="outlined" className="sidebar__tweet" fullWidth>
                    Tweet
                </Button>
                <div className="userPanel">
                    <UserPanel/>
                    <Route path="/login"><Login/></Route>
                </div>

                {/*<Profile />*/}
            </div>
        );
    }
}

export default LeftSidebar;