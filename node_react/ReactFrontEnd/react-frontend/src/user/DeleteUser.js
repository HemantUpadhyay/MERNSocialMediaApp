import React,{Component} from 'react'
import {isAuthenticated,signout} from '../auth/Index'
import {remove} from './apiUser'
import {Redirect} from 'react-router-dom'
class DeleteUser extends Component {

    state={
        redirect: false
    }

    deleteAccount = ()=>{
        const token = isAuthenticated().token;
        const userId = this.props.userId;
        remove(userId,token)
        .then(data =>{
            if(data.error){
                console.log(data.error)
            }
            else{
                //signout user
                signout(()=> console.log('user is deleted.!'))
                //clear jwt
                //redirect
                this.setState({redirect:true})

            }
        })
    }

    deleteConfirm = ()=>{
        let answer = window.confirm('Are ypu sure you want to delete your account?')
        if(answer){
            this.deleteAccount();
        }
    }

    render(){
        if(this.state.redirect){
            return <Redirect to="/"/>
        }
        return (
            <button onClick={this.deleteConfirm} className="btn btn-raised btn-danger">
                delete Profile
            </button>
        )
    }
}

export default DeleteUser;