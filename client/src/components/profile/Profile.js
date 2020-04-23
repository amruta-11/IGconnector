//The Profile Component is made up of 2 sub-components - 1.ProfileInfo & 2.ProfilePost
//Libraries
import React, { Component } from 'react';
import {connect} from 'react-redux'; 
import Spinner from "../common/Spinner";
import PropTypes from 'prop-types';
//Actions
import {getProfileByUsername} from '../../actions/profileActions';
import {getPostByUsername} from '../../actions/postActions';
//Sub-Components
import ProfileInfo from "./ProfileInfo";
import ProfilePost from './ProfilePost';
import ProfileInfoOther from './ProfileInfoOther';


class Profile extends Component {
      render() {
        const profile = this.props.mappedProfile;
        const posts = this.props.mappedPost;
        const id = this.props.currentUserId;

        let profileContent;
    
        if (profile === null || posts === null) {
          profileContent = <Spinner />;
        } else {
        //Here we are write a if/else statement to check if we have to get the current users profile or other users profile
        //If we have to get current users profile we will use (this.props.username) & load ProfileInfo & ProfilePost
        //& if we have to get other users profile we will user (this.props.match.params.username) & load ProfileInfoOther & ProfilePost
        //& finally loading the profileContent with which ever is true from above two
            if (this.props.match.params.username != this.props.username) {
              //To get other User's Profile
              profileContent = (
                <main id= "profile">
                  {/* To access the mapped profile & mapped post in ProfileInfo & ProfilePost Component we will have to use the variable 'profile' & 'postArray' e.g this.props.postArray */}
                  <ProfileInfoOther 
                  profile={profile} 
                  numberOfPosts={posts.length}
                  id= {id} />
                  <ProfilePost 
                  postArray={posts} />
                </main>
              );
            } else if (this.props.username) {
              //To get Current User's Profile
              profileContent = (
                <main id= "profile">
                  <ProfileInfo 
                  profile={profile} 
                  numberOfPosts={posts.length} />
                  <ProfilePost 
                  postArray={posts} />
                </main>
              ); 
            }
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

    //Here also, we will be checking if the profile is for current user or other user & store it in variable usernameLocal & passing it to the actions
    componentDidMount() {
      let usernameLocal = null;
      if (this.props.match.params.username) {
        usernameLocal = this.props.match.params.username;
      } else if (this.props.username) {
        usernameLocal = this.props.username;
      }

      if (usernameLocal !== null) {
        this.props.getProfileByUsername(usernameLocal);
        this.props.getPostByUsername(usernameLocal);
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
    mappedPost: state.post.posts,
    username: state.auth.user.username,
    currentUserId: state.auth.user.id
  });

export default connect(mapStateToProps, { getProfileByUsername, getPostByUsername })(Profile);

//1. Initial Render - User will have auth props (name, username, avatar, etc)
//2. ComponentDidMount will get the username from auth via mapStateToProps-username & will fire the 'getProfileByUsername' & 'getPostByUsername' actions & will receive the res.data back from api/DB
//3. After receiving data the dispatchers will pick up the call based on type of action (GET_USER_POST, GET_PROFILE), pass it to reducers & the reducer will write to the store as described in the cases otherwise implement the default.
//4. Now the store will have the auth, profile & post data of the user
//5. Now we will mapStateToProps the profile & post data. We will have the profile & post in the props & we can access it {this.props.post.length} or {this.props.profile.bio}
//In this way we can bind the data from props to component & implement render again