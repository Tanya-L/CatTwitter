import React, {Component} from 'react'
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import "../Layout/tweetBox.css";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {connect} from 'react-redux'
import {
    followUser,
    getPostsByUserId,
    getUserProfile,
    refreshUserProfile,
    unfollowUser
} from '../../actions/profileActions'
import Post from '../Posts/Post'
// import LoadingPosts from '../Posts/XXXLoadingPosts'
import PostFeed from "../Posts/PostFeed";
import EditIcon from '@material-ui/icons/Edit';

const styles = {
    paper: {
        padding: 20,
    },
    login: {},
    email: {
        color: '#888',
        marginBottom: 10
    },
    detailsBlock: {
        display: 'flex'
    },
    detail: {
        marginRight: 25,
        fontWeight: 'bold'
    },
    detailTitle: {
        marginLeft: 3,
        textTransform: 'uppercase',
        fontSize: 10,
        fontWeight: 'normal'
    },
    btnBlock: {
        width: '70%',
        textAlign: 'right'
    },
    btnFollow: {
        backgroundColor: '#50b7f5',
        color: 'white',
        '&:hover': {
            color: '#50b7f5',
            borderColor: '#50b7f5',
            backgroundColor: 'white'
        }
    }
}

class Profile extends Component {
    constructor(props) {
        super(props)

        this.handleFollow = this.handleFollow.bind(this)
        this.handleUnfollow = this.handleUnfollow.bind(this)
        this.makeFollowBtns = this.makeFollowBtns.bind(this)
        this.makeProfileInfo = this.makeProfileInfo.bind(this)
    }

    componentDidMount() {
        this.props.getPostsByUserId(this.props.match.params.userId)
        this.props.getUserProfile(this.props.match.params.userId)
    }

    componentDidUpdate(prevProps) {
        if (this.props.auth.isAuthenticated) {
            if (prevProps.user && prevProps.user.following !== this.props.user.following) {
                this.props.refreshUserProfile(this.props.match.params.userId)
            }
        }
    }

    handleFollow() {
        this.props.followUser(this.props.match.params.userId)
    }

    handleUnfollow() {
        this.props.unfollowUser(this.props.match.params.userId)
    }

    makeFollowBtns() {
        const {classes, loadingProfile, auth, user, profile} = this.props
        if (auth.isAuthenticated) {
            let isMyProfile = loadingProfile ? false : (profile._id == user._id)
            if (isMyProfile) {
                return (<EditIcon/>)
            } else if (
                user &&
                user.following &&
                user.following.indexOf(this.props.match.params.userId) === -1
            ) {
                return (<div className={classes.btnBlock}>
                    <Button
                        variant="outlined"
                        className={classes.btnFollow}
                        onClick={this.handleFollow}>
                        Follow
                    </Button>
                </div>)
            } else {
                return (<div className={classes.btnBlock}>
                    <Button
                        variant="outlined"
                        className={classes.btnFollow}
                        onClick={this.handleUnfollow}
                    >
                        Unfollow
                    </Button>
                </div>)
            }
        }
    }

    makeProfileInfo() {
        const {classes, list, profile} = this.props
        let items;
        items = list && list.map(el => <Post key={el._id} post={el}/>)

        let followBtns = this.makeFollowBtns()

        if (profile && items) {
            return (
                <Paper className={classes.paper}>
                    <h1 className={classes.login}>{profile.login}</h1>
                    <div className={classes.email}>{profile.email}</div>
                    <div className={classes.detailsBlock}>
                        <div className={classes.detail}>
                            {items.length}
                            <span className={classes.detailTitle}>posts</span>
                        </div>
                        <div className={classes.detail}>
                            {profile.followers.length}
                            <span className={classes.detailTitle}>followers</span>
                        </div>
                        <div className={classes.detail}>
                            {profile.following.length}
                            <span className={classes.detailTitle}>following</span>
                        </div>
                        {followBtns}
                    </div>
                </Paper>
            )
        }
        return ''
    }

    render() {
        const {loadingProfile} = this.props
        let profileInfo = this.makeProfileInfo()

        return (
            <div className="tweet">
                <div className="tweet__header">
                    <ArrowBackIcon/>
                </div>

                {/* ------ Show profile or loading animation ------*/}
                {loadingProfile ? <div>Loading</div> : profileInfo}

                {/* ------ Show posts or loading animation ------*/}
                {/*{loadingPosts ? <LoadingPosts/> : items}*/}
                <PostFeed userFeed={this.props.match.params.userId}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    loadingPosts: state.post.loading,
    list: state.post.list,
    profile: state.profile.user,
    loadingProfile: state.profile.loading,
    auth: state.auth,
    user: state.auth.user
})

export default connect(mapStateToProps, {
    getPostsByUserId,
    getUserProfile,
    followUser,
    unfollowUser,
    refreshUserProfile
})(withStyles(styles)(Profile))