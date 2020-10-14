import React from "react";
// import Grid from '@material-ui/core/Grid'
import LeftSidebar from "./LeftSidebar";
import CentralColumn from "./CentralColumn";
import Trends from "./Trends";

const Main = ({children}) => (
    <div>
        <div className="app">
            <LeftSidebar/>
            <CentralColumn/>
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