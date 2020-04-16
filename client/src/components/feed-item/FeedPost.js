import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// Actions
import {likePost} from '../../actions/postActions';
import {unlikePost} from '../../actions/postActions'; 
import {addComment} from '../../actions/postActions';


class FeedPost extends Component {
    constructor() {
        super();
        this.state = {
            comment: '',
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

     //onChange Event
     onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    //onSubmit Event
    onSubmit(e){
        e.preventDefault();
        const commentData = {
            postid: this.props.oneFeedPost._id,
            content: this.state.comment,       
        };
        this.props.addComment(commentData); 
    }

    onLikeClick(id){
        this.props.likePost(id);
    }
    onUnlikeClick(id){
        this.props.unlikePost(id);
    }
    render() {
        const oneFeedPost = this.props.oneFeedPost;
        const loggedInUserId = this.props.userid

        var likeJSX = "";
        if (oneFeedPost.likes.includes(loggedInUserId)){
            likeJSX = <i
                onClick={() => this.onUnlikeClick(oneFeedPost._id)}
                className="fa fa-heart fa_custom fa-lg">
            </i>
        } else {
            likeJSX = <i
                onClick={() => this.onLikeClick(oneFeedPost._id)}
                className="fa fa-heart-o fa-lg">
            </i>
        }
        return (
            <div className="photo">
            <header className="photo__header">
                <img src={oneFeedPost.userId.avatar} className="photo__avatar"/>
                <div className="photo__user-info">
                    <Link to={"/profile/" + oneFeedPost.userId.username}>
                    <span className="photo__author">{oneFeedPost.userId.username}</span>
                    </Link>
                    <span className="photo__location">{oneFeedPost.location.coordinates}</span>
                </div>
            </header>
            <img src={oneFeedPost.imageURL} />
            <div className="photo__info">
                <div className="photo__actions">
                    <span className="photo__action"> {likeJSX} </span>
                    <span className="photo__action">
                        <i className="fa fa-comment-o fa-lg"></i>
                    </span>
                </div>
                <span className="photo__likes">
                {oneFeedPost.likes.length} likes  {oneFeedPost.comments.length} comments
                </span>
                <div className="photo__caption">
                <span className= "photo__author">{oneFeedPost.userId.username}</span>
                <span className="photo__content">{oneFeedPost.content}</span>
                </div>
                <ul>
                    <li className="photo__comment">
                        {/* Commentors Username & Avatar */}
                        {/* <img src={oneFeedPost.userId.avatar} className="photo___avatar" /> */}
                        <span className="photo___author">{}</span>
                        <span className="photo___content">Comment Content Here</span>
                    </li>
                </ul>
                <span className="photo__time-ago">{oneFeedPost.date}</span>
                <div className="photo__add-comment-container">
                    <form onSubmit = {this.onSubmit}>
                    <textarea name="comment" placeholder="Add a comment..."
                    type= "text"
                    name="comment"
                    value= {this.state.comment}
                    onChange={this.onChange}>
                    </textarea>
                    <input
                    className="comment_submit_button" 
                    type="submit" 
                    value="Post"/>
                    </form>
                </div>
            </div>
        </div>
        )
    }
}

FeedPost.propTypes = {
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired
}

export default connect(null, {likePost, unlikePost, addComment})(FeedPost);