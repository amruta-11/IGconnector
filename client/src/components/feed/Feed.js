import React, { Component } from 'react';
import Spinner from "../common/Spinner";
import PropTypes from 'prop-types';
import {connect} from 'react-redux'; 

//Actions
import {getPostByUsername} from '../../actions/postActions';
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
                  <FeedPost oneFeedPost ={mappedPost[i]} 
                  username= {this.props.username}
                  avatar= {this.props.avatar}
                  />);
              }
              return <main id="feed">
                  {feedPost}
              </main>
          }
    }

    componentDidMount() {
        const username = this.props.username;
        if (username) {
          this.props.getPostByUsername(username);
        }       
      }
}


Feed.propTypes = {
    getPostByUsername: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    mappedPost: state.post.posts,
    username: state.auth.user.username,
    avatar: state.auth.user.avatar
  });


export default connect(mapStateToProps, { getPostByUsername })(Feed);