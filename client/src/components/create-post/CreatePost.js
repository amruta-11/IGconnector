//Libraries & Functions
import React, { Component } from 'react';
import classnames from 'classnames';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

//Actions
import {createPost} from '../../actions/postActions';


class CreatePost extends Component {

    constructor() {
        super();
        this.state = {
            imageURL: '',
            content: '',
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
        const postData = {
            imageURL: this.state.imageURL,
            content: this.state.content,      
        };

        //Here we will be triggering the 'editProfile' Action & passing the profileData to it & history property
        this.props.createPost(postData, this.props.history); 
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
                        <label for="imageURL" className="form__label">Image URL:</label>
                        <input 
                        id="imageURL" type="text" 
                        className={classnames("form-control form-control-lg", {
                            'is-invalid': errors.imageURL
                        })}
                        name="imageURL"
                        value= {this.state.imageURL}
                        onChange={this.onChange}/>
                        {errors.imageURL && (
                            <div className="invalid-feedback">{errors.imageURL}</div>
                        )}
                    </div>

                    <div className="form__row">
                        <label for="content" className="form__label">Caption:</label>
                        <input 
                        id="content" 
                        type="text" 
                        className={classnames("form-control form-control-lg", {
                            'is-invalid': errors.content
                        })}
                        name="content"
                        value= {this.state.content}
                        onChange={this.onChange}/>
                        { errors.content && (
                            <div className="invalid-feedback">{errors.content}</div>
                        )}
                    </div>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        </main>
        )
    }
}


CreatePost.propTypes = {
    createPost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

//editProfile is the action
export default connect(mapStateToProps, {createPost})(withRouter(CreatePost));