import React, { Component } from 'react'
import {Route, Redirect} from 'react-router-dom'
import {isAuthenticated} from './Index'

const PrivateRoute = ({Component: Component, ...rest}) =>(
    //Props means components passed down to this private route compoent
    <Route {...rest} render ={props=>isAuthenticated() ? (
        <Component {...props}/>
    ) : (
        <Redirect to={{pathname:'/signin', state:{from:props.location}}}/>
    )} />
)

export default PrivateRoute;