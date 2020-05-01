//@desc
//This component allows the logged in user to edit the profile i.e bio & website
//After getting the profileData we will passing it to the 'editProfile' action
//In the 'editProfile' action we will be making an axios call & fire the API
//The API will run & store that data into mongoDB

//Libraries & Functions
import React, { Component } from 'react';
import classnames from 'classnames';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
//Actions
import {editProfile} from '../../actions/profileActions';

class EditProfile extends Component {
    constructor() {
        super();
        this.state = {
            website: '',
            bio: '',
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    //onChange Event
    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    //onSubmit Event
    onSubmit(e){
        e.preventDefault();
        const profileData = {
            website: this.state.website,
            bio: this.state.bio,      
        };

        //Here we will be triggering the 'editProfile' Action & passing the profileData to it & history property
        this.props.editProfile(profileData, this.props.username, this.props.history); 
    }


    //React lifecycle Method
     componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors:nextProps.errors})
        }
    }
    render() {
        var errors = this.state.errors;
        const {user} = this.props.auth;
        return (
            <main id="edit-profile">
                <div className="edit-profile__container">
                <header className="edit-profile__header">
                    <div className="edit-profile__avatar-container">
                        <img 
                        src={user.avatar}
                        alt=""
                        className="edit-profile__avatar" 
                        />
                    </div>
                    <h4 className="edit-profile__username">
                    {user.username}
                    </h4>
                </header>
    
                <form onSubmit = {this.onSubmit}
                className="edit-profile__form">

                    <div className="form__row">
                        <label for="website" className="form__label">Website:</label>
                        <input 
                        id="website" type="text" 
                        className={classnames("form-control form-control-lg", {
                            'is-invalid': errors.website
                        })}
                        name="website"
                        value= {this.state.website}
                        onChange={this.onChange}/>
                        {errors.website && (
                            <div className="invalid-feedback">{errors.website}</div>
                        )}
                    </div>

                    <div className="form__row">
                        <label for="bio" className="form__label">Bio:</label>
                        <input 
                        id="bio" 
                        type="text" 
                        className={classnames("form-control form-control-lg", {
                            'is-invalid': errors.bio
                        })}
                        name="bio"
                        value= {this.state.bio}
                        onChange={this.onChange}/>
                        { errors.bio && (
                            <div className="invalid-feedback">{errors.bio}</div>
                        )}
                    </div>
                    
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        </main>
        )
    }
}

EditProfile.propTypes = {
    editProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    username: state.auth.user.username,
    errors: state.errors
})

//editProfile is the action
export default connect(mapStateToProps, {editProfile})(withRouter(EditProfile));