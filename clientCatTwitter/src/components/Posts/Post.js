import React, {forwardRef} from 'react'
import "./post.css"
import {Avatar} from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";

const Post = forwardRef(
    ({displayName, username, verified, text, image, avatar}, ref) => {
        return (
            <div className="post" ref={ref}>
                <div className="post__avatar">
                    <Avatar src={avatar}/>
                </div>
                <div className="post__body">
                    <div className="post__header">
                        <div className="post__headerText">
                            <h3>
                                {displayName}{" "}
                                <span className="post__headerSpecial">
                  {verified && <VerifiedUserIcon className="post__badge"/>} @
                                    {username}
                </span>
                            </h3>
                        </div>
                        <div className="post__headerDescription">
                            <p>{text}</p>
                        </div>
                    </div>
                    <img src={image} alt=""/>
                    <div className="post__footer">
                        <ChatBubbleOutlineIcon fontSize="small"/>
                        <RepeatIcon fontSize="small"/>
                        <FavoriteBorderIcon fontSize="small"/>
                        <PublishIcon fontSize="small"/>
                    </div>
                </div>
            </div>
        );
    }
);


// class Post extends Component {
//     render () {
//         const { classes, post } = this.props
//         return (
//             <Paper className={classes.paper}>
//                 <div
//                     className={classes.avatar}
//                     style={{
//                         backgroundColor: `#${post.user.id.slice(post.user.id.length - 3)}`
//                     }}
//                 />
//                 <div>
//                     <h3 className={classes.login}>
//                         <Link to={`/profile/${post.user.id}`}>{post.user.login}</Link>
//                         <span className={classes.time}>{(new Date(post.createdAt)).toLocaleString()}</span>
//                     </h3>
//                     {post.text}
//                 </div>
//             </Paper>
//         )
//     }
// }


export default Post