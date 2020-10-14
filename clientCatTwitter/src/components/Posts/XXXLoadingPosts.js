import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'


const styles = {
    load: {
        textAlign: 'center',
        marginTop: 25,
        width: '100%'
    },
    loadIcon: {
        color: '#1da1f2'
    }
}
const XXXLoadingPosts = ({ classes }) => (
    <div className={classes.load}>
        <CircularProgress className={classes.loadIcon}/>
    </div>
)

export default withStyles(styles)(XXXLoadingPosts)