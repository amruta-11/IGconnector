//@desc
//FeedPost Component - Acts like a framework or mold through which all the Post on IG will be passed one by one from a for loop in Feed.js
//These images passed will be displayed as a strip of Post having - Like, Unlike, Caption, Date, etc.
//When the loggedIn user wants to comment on the users post, the commentData is passed through the 'addComment' Action that will fire the Post API. Then it will fire the 'getAllPost' Action to get the updated post with new comment
//The like & unlike feature will work in similar fashion as comment with just one difference of invoking the function by 'onClick'
//To get the comments of a Post we will pass comment from the for loop & using nested component 'FeedComment' as mold or framework

//Libraries
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// Actions
import {likePost} from '../../actions/postActions';
import {unlikePost} from '../../actions/postActions'; 
import {addComment} from '../../actions/postActions';
//Sub-Component or Nested Component
import FeedComment from './FeedComment';

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

    getCommentsJSX(comments) {
        var commentsComp = [];
              for(var i = 0; i < comments.length; i++) {
                  commentsComp.push(
                  <FeedComment 
                  oneComment = {comments[i]}
                  />);
              }
              return  <ul>
                  {commentsComp}
                    </ul>
    }

    componentWillReceiveProps(){
        this.state.comment = '';
    }

    render() {
        const oneFeedPost = this.props.oneFeedPost;
        const loggedInUserId = this.props.userid

        var likeJSX = "";
        //To check if the loggedIn user has already like the given post or not
        //If the likes array of the post includes the loggedIn User i.e liked post = true, then 'onUnlikeClick' function will be invoked with postid being the parameter.
        //This function will fire the unlikePost Action (postid as parameter)
        if (oneFeedPost.likes.includes(loggedInUserId)){
            likeJSX = <i
                onClick={() => this.onUnlikeClick(oneFeedPost._id)}
                className="fa fa-heart fa_custom fa-lg">
            </i>
        } else {
            //If the likes array of the post does not include the loggedIn User i.e liked post = false, then 'onLikeClick' function will be invoked with postid being the parameter.
            //This function will fire the likePost Action (postid as parameter)
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
                {/* Comments */}
                   {this.getCommentsJSX(oneFeedPost.comments)}
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