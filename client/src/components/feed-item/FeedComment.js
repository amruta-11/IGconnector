import React, { Component } from 'react';

 class FeedComment extends Component {
    render() {
        const oneComment = this.props.oneComment;
        return (
        <li className="photo__comment">
            <span className="photo___author">{oneComment.userId.username}</span>
        <span className="photo___content">{oneComment.content}</span>
        </li>
        )
    }
}


export default FeedComment;
