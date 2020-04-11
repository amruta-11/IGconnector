import React, { Component } from 'react';
import PostItem from './PostItem'

class PostRow extends Component {
    render() {
        return (
            <main id="profile">
                <section class="profile__photos">
                    <PostItem post={this.props.item1} />
                    <PostItem post={this.props.item2} />
                    <PostItem post={this.props.item3} />
                </section>
            </main>
        )
    }
}

export default PostRow;