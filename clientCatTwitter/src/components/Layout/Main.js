import React from "react";
import LeftSidebar from "./LeftSidebar";
import CentralColumn from "./CentralColumn";
import Trends from "./Trends";
import {Route} from "react-router-dom";
import Profile from "../Profile/Profile";

const Main = ({children}) => (
    <div>
        <div className="app">
            <LeftSidebar/>
            <Route exact path="/" component={CentralColumn}/>
            <Route path="/profile/:userId" component={Profile}/>
            <Trends/>
        </div>
    </div>
)

export default Main