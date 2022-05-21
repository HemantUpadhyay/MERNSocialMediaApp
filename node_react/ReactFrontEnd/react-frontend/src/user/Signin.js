import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {signin, authenticate} from '../auth/Index';
class Signin extends Component{
    constructor(){
        super();
        this.state={            
            email:"",
            password:"",
            error:"",
            redirectToReferer: false,
            loading: false
        }
    }

    handleChange=(name) => event => {
        this.setState({error: ""})
        this.setState({[name]: event.target.value})
    }
    
    
    clickSubmit=(event)=>{
        event.preventDefault();
        this.setState({loading:true})
        const {email,password} = this.state;
        const user ={            
            email:email,
            password:password
        }
        console.log(user)
        signin(user)
        .then(data => {
            console.log(data)
            if(data.error){
                this.setState({
                    error: data.error,
                    loading: false
                })
            }
            else{
                //Authenticate the user
                authenticate(data,()=>{
                    this.setState({
                        redirectToReferer: true
                    })
                });                
            }
        })
    }

    
    render(){
        const {email,passowrd,error, redirectToReferer,loading} = this.state;
        if(redirectToReferer){
            return <Redirect to="/" />
        }
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Signin</h2>
                <div className="alert alert-danger" style={{display: error ? '': 'none'}}>
                    {error}
                </div> 
                {loading ? <div className="jumbotron text-center">
                    <h2>Loading...</h2>
                </div>:""}               
                <form >
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

export default Signin