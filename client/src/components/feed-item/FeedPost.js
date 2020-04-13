import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class FeedPost extends Component {
    render() {
        const oneFeedPost = this.props.oneFeedPost;
        const username = this.props.username;
        const avatar = this.props.avatar;

        return (
            <div className="photo">
            <header className="photo__header">
                <img src={avatar}
                className="photo__avatar" />
                <div className="photo__user-info">
                    <Link to="/profile">
                        <span className="photo__author">
                            {username}
                        </span>
                    </Link>
                    <span className="photo__location">
                        {oneFeedPost.location.coordinates}
                    </span>
                </div>
            </header>
            <img src={oneFeedPost.imageURL} />
            <div className="photo__info">
                <div className="photo__actions">
                    <span className="photo__action">
                        <i className="fa fa-heart-o fa-lg">
                        </i>
                    </span>
                    <span className="photo__action">
                        <i className="fa fa-comment-o fa-lg">
                        </i>
                    </span>
                </div>
                <span className="photo__likes">
                    {oneFeedPost.likes.length} likes  {oneFeedPost.comments.length} comments
                </span>
                <ul className="photo__comments">
                    <li className="photo__comment">
                        {/* Commentors Username & Avatar */}
                        <img src={avatar} className="photo___avatar" />
                        <span className="photo___author">{username}</span>
                        <span className="photo___content">Comment Content Here</span>
                    </li>
                </ul>
        <span className="photo__time-ago">{oneFeedPost.date}</span>
                <div className="photo__add-comment-container">
                    <textarea name="comment" placeholder="Add a comment..."></textarea>    
                </div>
            </div>
        </div>
        )
    }
}

export default FeedPost;