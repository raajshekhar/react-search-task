import React, { Component } from 'react'
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Aux'

const withErrorHandler = (WrapComponent, axios) => {
    return class extends Component {
        constructor(props){
            super(props);
            this.componentMount();
        }
        state = {
            error: null
        }
        componentMount(){
            axios.interceptors.request.use( req => {
                this.setState({
                    error: null
                })   
                return req
            } )
            axios.interceptors.response.use(res => res,error => {
                this.setState({
                    error: error
                })
            })
        }

        errorConfirmHandler = () => {
            this.setState({
                error: null
            });   
        }
    
       render(){
        return (
            <Aux>
                <Modal show={this.state.error}
                modalClosed={this.errorConfirmHandler}>
                    { this.state.error ?  this.state.error.message : null}
                </Modal>
                <WrapComponent {...this.props} />
            </Aux>
        )
       } 
    }
}

export default withErrorHandler;