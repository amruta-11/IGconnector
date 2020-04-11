import React, { Component } from 'react';
import PostRow from '../post/PostRow';

class ProfilePost extends Component {

    render() {
        const postArray = this.props.postArray;

        var rows = [];
        for (var i = 0; i < postArray.length ; i=i+3) {
            rows.push(<PostRow item1={postArray[i]} item2={postArray[i+1]} item3={postArray[i+2]} />);
        }
        return <div>{rows}</div>;
    }
}

export default ProfilePost;