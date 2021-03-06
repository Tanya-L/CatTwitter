import store from '../../store'
import React, {Component} from 'react'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MoreVert from '@material-ui/icons/MoreVert'

import {Link} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'
import {connect} from 'react-redux'

import {logoutUser} from '../../actions/authActions'


const styles = {
    root: {
        flexGrow: 1
    },
    logo: {
        color: '#fff',
        fontSize: 30,
        // textTransform: 'uppercase'
    },
    space: {
        justifyContent: 'space-between'
    }
}

// Small panel with logged in userinfo, or login box
class UserPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null
        }
        this.handleLogout = this.handleLogout.bind(this)
    }

    handleMenu = (event) => {
        this.setState({anchorEl: event.currentTarget})
    }

    handleClose = () => {
        this.setState({anchorEl: null})
    }

    handleLogout() {
        this.setState({anchorEl: null})
        // this.props.logoutUser()
        store.dispatch(logoutUser());
    }

    render() {
        const {classes, isAuthenticated, user} = this.props;
        const {anchorEl} = this.state
        const open = Boolean(anchorEl)


        const guestLinks = (
            <div>
                You are not logged in
                <IconButton aria-owns={open ? 'menu-appbar' : undefined}
                            aria-haspopup="true"
                            color="inherit"
                            onClick={this.handleMenu}><MoreVert/></IconButton>
                <Menu
                    id="menu-appbar"
                    open={open}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    anchorEl={anchorEl}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={this.handleClose}>
                        <Link to="/login">Login</Link>
                    </MenuItem>
                    <MenuItem onClick={this.handleClose}>
                        <Link to="/register">Register</Link>
                    </MenuItem>
                </Menu>
            </div>
        )

        const authLinks = isAuthenticated && (
            <div>You are logged in as <strong>{this.props.user.email}</strong>
                <IconButton
                    aria-owns={open ? 'menu-appbar' : undefined}
                    aria-haspopup="true"
                    color="inherit"
                    onClick={this.handleMenu}
                >
                    <AccountCircle/>
                </IconButton>
                <Menu
                    id="menu-appbar"
                    open={open}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    anchorEl={anchorEl}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={this.handleClose}>
                        <Link to={`/profile/${user.id}`}>Profile</Link>
                    </MenuItem>
                    <MenuItem>
                        <Link to="/#" onClick={this.handleLogout}>Logout</Link>
                    </MenuItem>
                </Menu>
            </div>
        )
        return (
            <div className={classes.root}>
                {isAuthenticated ? authLinks : guestLinks}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps, {logoutUser})(
    withStyles(styles)(UserPanel)
)