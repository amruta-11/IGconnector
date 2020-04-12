import React, { Component } from 'react';
import PostItem from '../post/PostItem';

class ProfilePost extends Component {

    render() {
        const postArray = this.props.postArray;

        var postItems = [];
        for (var i = 0; i < postArray.length ; i++) {
            postItems.push(<PostItem post={postArray[i]} />);
        }

        return <section class="profile__photos">
                    {postItems}
                </section>
                ;
    }
}

export default ProfilePost;