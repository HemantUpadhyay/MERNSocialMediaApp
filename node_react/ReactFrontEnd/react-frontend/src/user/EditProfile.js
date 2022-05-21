import React, {Component} from 'react'
import {isAuthenticated} from '../auth/Index'
import { read, update, updateUser } from './apiUser';
import { Redirect } from 'react-router-dom';
import defaultProfile from '../images/profile.jpg'
class EditProfile extends Component{

    constructor(){
        super()
        this.state = {
            id:'',
            name:'',
            password:'',
            redirectToProfile:false,
            error:'',
            fileSize : 0,
            loading: false,
            about:""
        }
    }

    init = userId =>{
        const token = isAuthenticated().token;
        read(userId,token)
        .then(data =>{
            if(data.error){
                this.setState({redirectToProfile:true})
            }else{
                this.setState({id: data._id, name: data.name,email:data.email,error:"",about:data.about});
            }
        })
    }

    componentDidMount(){
        this.userData = new FormData();
        const userId = this.props.match.params.userId
        this.init(userId);
    }

    isValid=()=>{
        const {name,email,password,fileSize} = this.state;
        if(fileSize > 1000000){
            this.setState({error:'File Size should be less than 1 mb'})
            return false;
        }

        if(name.length === 0){
            this.setState({error:'Name is required',loading:false})
            return false;
        }
        // email@domain.com
        if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
            this.setState({error:'A valid Email is required',loading:false})
            return false;
        }

        if(password.length>=1 && password.length<=5){
            this.setState({error:'password must be at least 6 characters long',loading:false})
            return false;
        }
        return true;
    }

    handleChange=(name) => event => {              
        this.setState({"error":""})
        const value = name === 'photo' ? event.target.files[0]: event.target.value;
        const fileSize = name ==='photo' ? event.target.files[0].size : 0;
        this.userData.set(name,value);        
        this.setState({[name]: value, fileSize})
    }
    
    clickSubmit=(event)=>{
        event.preventDefault();        
        if(this.isValid()){                 
            this.setState({loading:true});           
            //const {name,email,password} = this.state;
            // const user ={
            //     name:name,
            //     email:email,
            //     password:password || undefined
            // }
            //console.log(user)
            const userId = this.props.match.params.userId;
            const token = isAuthenticated().token;
            update(userId,token,this.userData)
            .then(data => {
                console.log(data)
                if(data.error){
                    this.setState({
                        error: data.error
                    })
                }
                else{
                    updateUser(data,()=>{                        
                        this.setState({                    
                            redirectToProfile:true
                        })
                        
                    })
                }
            })            
        }
    }

    editProfile =(name,email,about,passowrd) =>(
        <form >            
            <div className="formGroup">
                <label className="text-muted">Profile Photo</label>
                <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    onChange={this.handleChange('photo')}
                />
            </div>
            <div className="formGroup">
                <label className="text-muted">Name</label>
                <input value={name}
                    type="text"
                    className="form-control"
                    onChange={this.handleChange('name')}
                />
            </div>
            <div className="formGroup">
                <label className="text-muted">Email</label>
                <input value={email}
                    type="email"
                    className="form-control"
                    onChange={this.handleChange('email')}
                />
            </div>   
            <div className="formGroup">
                <label className="text-muted">About</label>
                <textarea value={about}
                    type="text"
                    className="form-control"
                    onChange={this.handleChange('about')}
                />
            </div>     
            <div className="formGroup">
                <label className="text-muted">Password</label>
                <input value={passowrd}
                    type="password"
                    className="form-control"
                    onChange={this.handleChange('password')}
                />
            </div>
            <button onClick={this.clickSubmit} className="btn-raised btn btn-primary">Update</button>
        </form>
    );

    render(){
        const {id,name,email,passowrd, redirectToProfile,error,loading,about} = this.state;
        if(redirectToProfile){
            return <Redirect to={`/user/${id}`}/>
        }        
        const photoUrl = id ? `http://localhost:8080/user/photo/${id}?${new Date().getTime()}` : defaultProfile;
        return(
            <div className="container">
                <h2 className="mt-5 ml-5">Edit Profile</h2>
                <div className="alert alert-danger" style={{display: error ? '': 'none'}}>
                    {error}
                </div>
                {loading ? <div className="jumbotron text-center">
                    <h2>Loading...</h2>
                </div>:""} 
                <img style={{height:"200px", width:"auto"}} className="img-thumbnail" src={photoUrl} onError={i=>{i.target.src=`${defaultProfile}`}} alt={name} />
                {this.editProfile(name,email,about,passowrd)}
            </div>
        );
    }
}

export default EditProfile;