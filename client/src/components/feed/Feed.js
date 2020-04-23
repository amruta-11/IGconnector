//Libraries
import React, { Component } from 'react';
import Spinner from "../common/Spinner";
import PropTypes from 'prop-types';
import {connect} from 'react-redux'; 
//Actions
import {getAllPost} from '../../actions/postActions';
//Sub-Components
import FeedPost from '../feed-item/FeedPost';


class Feed extends Component {
    render() {
        const mappedPost = this.props.mappedPost;
        if (mappedPost === null) {
            return <Spinner />;
          } else {
              var feedPost = [];
              for(var i = 0; i < mappedPost.length; i++) {
                  feedPost.push(
                  <FeedPost 
                  oneFeedPost = {mappedPost[i]}
                  userid = {this.props.loggedInUserId}
                  />);
              }
              return <main id="feed">
                  {feedPost}
              </main>
          }
    }

    componentDidMount() {
        this.props.getAllPost();     
    }
}

Feed.propTypes = {
    getAllPost: PropTypes.func.isRequired
//  getPostByUsername: PropTypes.func.isRequired,
//  mappedPost: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    mappedPost: state.post.posts,
    loggedInUserId: state.auth.user.id
  });

export default connect(mapStateToProps, { getAllPost})(Feed);