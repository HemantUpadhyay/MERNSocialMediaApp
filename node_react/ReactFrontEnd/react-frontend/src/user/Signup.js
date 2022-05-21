import React, {Component} from 'react'
import {signup} from '../auth/Index'
import {Link} from 'react-router-dom'
class Signup extends Component{
    constructor(){
        super();
        this.state={
            name:"",
            email:"",
            password:"",
            error:"",
            open:false
        }
    }

    handleChange=(name) => event => {
        this.setState({error: ""})
        this.setState({[name]: event.target.value})
    }
    
    clickSubmit=(event)=>{
        event.preventDefault();
        const {name,email,password} = this.state;
        const user ={
            name:name,
            email:email,
            password:password
        }
        //console.log(user)
        signup(user)
        .then(data => {
            if(data.error){
                this.setState({
                    error: data.error
                })
            }
            else{
                this.setState({
                    error: "",
                    name: "",
                    email: "",
                    password: "",
                    open: true
                })
            }
        })
    }

    

    render(){
        const {name,email,passowrd,error,open} = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Signup</h2>
                <div className="alert alert-danger" style={{display: error ? '': 'none'}}>
                    {error}
                </div>
                <div className="alert alert-info" style={{display: open ? '': 'none'}}>
                    New account is successfully created, Please <Link to="/signin">Sign In</Link>.
                </div>
                <form >
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
                        <label className="text-muted">Password</label>
                        <input value={passowrd}
                            type="password"
                            className="form-control"
                            onChange={this.handleChange('password')}
                        />
                    </div>
                    <button onClick={this.clickSubmit} className="btn-raised btn btn-primary">submit</button>
                </form>
            </div>
        )
    }
};

export default Signup