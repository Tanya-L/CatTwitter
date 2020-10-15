import React from 'react'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core";
import {getUserProfile, updateUserProfile} from "../../actions/profileActions";

const styles = {
    textField: {
        width: '100%',
        marginBottom: 5
    },
    btnBlock: {
        textAlign: 'center',
        marginBottom: 10,
        marginTop: 20,
    }
}

class ProfileEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            displayName: '',
            password: '',
            password2: '',
            errors: {},
            bio: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.props)
        // if (this.props.authenticatedUser && this.props.profile.user === null) {
        //     this.props.getUserProfile(this.props.authenticatedUser._id)
        // }

    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault()
        if (!this.props.authenticatedUser._id) { return; }

        let profileData = {
            userId: this.props.authenticatedUser._id,
            password: this.state.password,
            bio: this.state.bio,
        }
        this.props.updateUserProfile(profileData, this.props.history)
    }

    render() {
        const {classes} = this.props;
        const {errors} = this.state

        return (<Paper style={{padding: 15}}>
            <h2>Edit Profile</h2>

            <form onSubmit={this.handleSubmit}>
                <TextField
                    label="Choose Display name"
                    type="text"
                    name="displayName"
                    value={this.state.displayName}
                    onChange={this.handleChange}
                    className={classes.textField}
                    helperText={errors.displayName ? errors.displayName : ''}
                    error={errors.displayName ? true : false}
                />
                <TextField
                    label="Password"
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    className={classes.textField}
                    helperText={errors.password ? errors.password : ''}
                    error={errors.password ? true : false}
                />
                <TextField
                    label="Repeat password"
                    type="password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.handleChange}
                    className={classes.textField}
                    helperText={errors.password2 ? errors.password2 : ''}
                    error={errors.password2 ? true : false}
                />
                <TextField
                    multiline
                    rows={4}
                    label="Tell more about yourself"
                    type="text"
                    name="bio"
                    value={this.state.bio}
                    onChange={this.handleChange}
                    className={classes.textField}
                />
                <div className={classes.btnBlock}>
                    <Button variant="outlined" type="submit">
                        Save
                    </Button>
                </div>
            </form>
        </Paper>)
    }
}

const mapStateToProps = (globalState) => {
    console.log(globalState)
    return ({
        isAuthenticated: globalState.auth.isAuthenticated,
        errors: globalState.errors,
        authenticatedUser: globalState.auth.user,
        profile: globalState.profile
    });
}

export default connect(
    mapStateToProps,
    {updateUserProfile, getUserProfile})(
    withRouter(
        withStyles(styles)(ProfileEdit)
    )
)
