//The Profile Component is made up of 2 components - 1.ProfileInfo & 2.ProfilePost

import React, { Component } from 'react';
import {connect} from 'react-redux'; 
import Spinner from "../common/Spinner";
import PropTypes from 'prop-types';

//Actions
import {getProfileByUsername} from '../../actions/profileActions';
import {getPostByUsername} from '../../actions/profileActions';
//Sub-Components
import ProfileInfo from "./ProfileInfo";
import ProfilePost from './ProfilePost';


class Profile extends Component {

      render() {
        const profile = this.props.mappedProfile;
        const post = this.props.mappedPost;

        let profileContent;
    
        if (profile === null || post === null) {
          profileContent = <Spinner />;
        } else {
          profileContent = (
            <div>
              {/* Here we are passing the mapped profile to the Sub Components with variable names 'profile' & 'postArray' .
              Meaning, to access the mapped profile & mapped post in ProfileInfo & ProfilePost Component we will have to use the variable 'profile' & 'postArray' e.g this.props.postArray */}
              <ProfileInfo profile={profile} postArray={post} />
              <ProfilePost postArray={post} />
            </div>
          );
        }
        return (
          <div className="profile">
            <div className="container">
              <div className="row">
                <div className="col-md-12">{profileContent}</div>
              </div>
            </div>
          </div>
        )
    }

    componentDidMount() {
      if (this.props.username) {
        this.props.getProfileByUsername(this.props.username);
        this.props.getPostByUsername(this.props.username);
      }       
    }

}

Profile.propTypes = {
    getProfileByUsername: PropTypes.func.isRequired,
    getPostByUsername: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    mappedProfile: state.profile.profile,
    mappedPost: state.profile.post,
    username: state.auth.user.username,
  });


export default connect(mapStateToProps, { getProfileByUsername, getPostByUsername })(Profile);
  


//1. Initial Render - User will have auth props (name, username, avatar, etc)
//2. ComponentDidMount will get the username from auth via mapStateToProps-username & will fire the 'getProfileByUsername' & 'getPostByUsername' actions & will receive the res.data back from api/DB
//3. After receiving data the dispatchers will pick up the call based on type of action (GET_USER_POST, GET_PROFILE), pass it to reducers & the reducer will write to the store as described in the cases otherwise implement the default.
//4. Now the store will have the auth, profile & post data of the user
//5. Now we will mapStateToProps the profile & post data. We will have the profile & post in the props & we can access it {this.props.post.length} or {this.props.profile.bio}
//In this way we can bind the data from props to component & implement render again