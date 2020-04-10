import React, { Component } from 'react';

class PostItem extends Component {
    render() {
        const post = this.props.post;
        
        return (
            <div class="profile__photo">
                <img src={post.imageURL}
                alt="" />
                <div class="profile__photo-overlay">
                    <span class="overlay__item">
                        <i class="fa fa-heart"></i>
                        {post.likes.length}
                    </span>
                    <span class="overlay__item">
                        <i class="fa fa-comment"></i>
                        {post.comments.length}
                    </span>
                </div>
            </div>
        )
    }
}

export default PostItem;