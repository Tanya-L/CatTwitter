import React from "react";
import LeftSidebar from "./LeftSidebar";
import CentralColumn from "./CentralColumn";
import Trends from "./Trends";
import {Route} from "react-router-dom";
import Profile from "../Profile/Profile";
import Register from "../Auth/Register";
import UserNotFound from "../Search/UserNotFound";
import ProfileEdit from "../Profile/ProfileEdit";

const Main = () => (
    <div>
        <div className="app">
            <LeftSidebar/>

            <Route exact path="/" component={CentralColumn}/>

            <Route exact path="/profileEdit" component={ProfileEdit}/>
            <Route path="/profile/:userId" component={Profile}/>

            <Route path="/register" component={Register}/>

            <Route path="/search/notfound" component={UserNotFound}/>

            <Trends/>
        </div>
    </div>
)

export default Main