import React from 'react'
import "./post.css"
import {Avatar} from "@material-ui/core";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {connect} from "react-redux";
import {deletePost} from "../../actions/postActions";
import {withRouter} from "react-router-dom";

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.setState({})

        this.deleteForever = this.deleteForever.bind(this)
    }

    deleteForever(e) {
        e.preventDefault()
        console.log(this.props)
        this.props.deletePost(this.props.postId, this.props.history)
    }

    // ({displayName, user, verified, text, image, avatar, createdAt}, ref) => {
    render() {
        return (
            <div className="post">
                <div className="post__avatar">
                    <Avatar src={this.props.avatar}/>
                </div>
                <div className="post__body">
                    <div className="post__header">
                        <div className="post__headerText">
                            <a href={("/profile/" + this.props.user.id)}>
                                <h3>
                                {this.props.displayName} {this.props.user.name}
                                <span className="post__headerSpecial">
                                {/*{this.props.verified && <VerifiedUserIcon className="post__badge"/>}*/}
                                @{this.props.user.login}
                                </span>
                                </h3>
                            </a>
                        </div>
                        <div className="post__headerDescription">
                            <p>{this.props.createdAt}</p>
                            <p>{this.props.text}</p>
                        </div>
                    </div>
                    <img src={this.props.image} alt=""/>
                    <div className="post__footer">
                        <ChatBubbleOutlineIcon fontSize="small"/>
                        <RepeatIcon fontSize="small"/>
                        <FavoriteBorderIcon fontSize="small"/>
                        <PublishIcon fontSize="small"/>
                        <a href="#" onClick={this.deleteForever}>
                        {this.props.user.id === this.props.loggedInUser._id
                            ? <DeleteForeverIcon fontSize="small"/>
                            : ""}
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (globalState) => ({
    isAuthenticated: globalState.auth.isAuthenticated,
    loggedInUser: globalState.auth.user ? globalState.auth.user : {_id: ''}
})

export default connect(mapStateToProps, {deletePost})(withRouter(Post))