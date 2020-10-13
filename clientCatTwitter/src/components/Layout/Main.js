import React from "react";
// import Grid from '@material-ui/core/Grid'
// import Header from './Header'
import Sidebar from "./Sidebar";
import Tweets from "./Tweets";
import Trends from "./Trends";

const Main = ({children}) => (
    <div>
        <div className="app">
            {/*<Header/>*/}
            <Sidebar/>
            <Tweets/>
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