import React from "react";
// import Grid from '@material-ui/core/Grid'
import LeftSidebar from "./LeftSidebar";
import CentralColumn from "./CentralColumn";
import Trends from "./Trends";
import {Route, Switch} from "react-router-dom";
import Profile from "../Profile/Profile";

const Main = ({children}) => (
    <div>
        <div className="app">
            <LeftSidebar/>
            <Route exact path="/" component={CentralColumn}/>
            <Route path="/profile/:userId" component={Profile}/>
            <Trends/>
        </div>
        {/*<Grid container justify="center">*/}
        {/*<Grid item xs={12} sm={6} style={{marginTop: 30}}>*/}
        {/*    {children}*/}
        {/*</Grid>*/}

        {/*</Grid>*/}
    </div>
)

export default Main