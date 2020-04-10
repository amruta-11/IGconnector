import React, { Component } from 'react';
import PostItem from '../post/PostItem';

class ProfilePost extends Component {
    render() {
        const postArray = this.props.postArray;

        return (           
// <!--Post Cubes-->
        <main id="profile">
            <section class="profile__photos">
            <PostItem post={postArray[0]} />
            <PostItem post={postArray[0]} />
            <PostItem post={postArray[0]} />
            </section>
        </main>
        )
    }
}

export default ProfilePost;