import React, { Component } from 'react';
import {connect} from 'react-redux';
import './UserInfo.css'
import Button from '../UI/Button/Button'
import * as actions from '../../store/actions/index'
import UserDetail from './userDetail/userDetail'
import UpdateUserDetail from './UpdateUserDetail/UpdateUserDetail'

/***
 * 1 .Showing Selected Data: This component is to displaying selected data [UserDetail]
 * 
 * 2. User can Edit the selected data [UpdateUserDetail]
 */


class UserInfo extends Component {

    constructor(props){
        super(props);
        this.editPost = this.editPost.bind(this);
        this.updateUserDetailsFun = this.updateUserDetailsFun.bind(this);
        this.state = {
            editForm: false,
        };
    }

    // Updates the state to display form or not.
    editPost(show = true){
        this.setState({
            editForm: show
        })
    };

    /**
     * updateUserDetailsFun Function is update the local state and updates the
     * store with user entered data with respective ID
     */
    updateUserDetailsFun(data){
        this.editPost(false);
        this.props.updatePost(data);
    }
    
    render(){
        const validPost = Object.keys(this.props.post).length;
        if(!validPost) return <div className="userInfo--selectAnyPost">Select any post</div>
        return   (
            
            <div className="userInfo--details" data-js="userInfo--details">
                {
                    this.state.editForm ?  
                    ( <UpdateUserDetail
                        cancelEdit = {() => this.editPost(false)}
                         updateUserDetails={this.updateUserDetailsFun}
                         post={this.props.post}/> 
                    ):<UserDetail post={this.props.post}/> 
                }

             {
                this.state.editForm ? null : (
                    <div className="userInfo-buttons">
                        <Button bthType="edit" clicked={this.editPost}>Edit</Button>
                    </div>
                 )
             }
            </div>)
    }
}

const mapStateToProps = ({posts}) => {
    return {
        post: posts.selectedPost,
    }
}

const mapDisptachToProps = dispatch => {
    return {
        updatePost: (post) => dispatch(actions.updatePost(post))
    }
}


export default connect(mapStateToProps,mapDisptachToProps)(UserInfo);