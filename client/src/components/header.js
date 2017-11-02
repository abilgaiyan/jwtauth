import { Link } from 'react-router';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Header extends Component {

    signoutUser(){
        if(this.props.authenticated) {
            this.props.signoutUser();
        }
    }
    renderLinkHtml(){
        if (this.props.authenticated){  
           return (
            <li className="nav-item">
            {/* <Link to="/signin" onClick={this.signoutUser.bind(this)} >Sign out</Link></li>  */}
            <Link to="/signout" className="nav-link" >Sign Out</Link></li> 
           );

        }
        return [
            <li className="nav-item">
             <Link to="/signin" className="nav-link" >Sign In</Link>
            </li>, 
            <li className="nav-item">
             <Link to="/signup" className="nav-link" >Sign Up</Link>
            </li>, 
           
           ];

    }
    render(){
        return (
              <nav className="navbar navbar-light">
                <Link to="/" className="nav-link">Home</Link>   
                <ul className="navbar-nav">
                    {this.renderLinkHtml()}
                </ul>  
                 
              </nav>  
              
        )
    }
}

function mapStateToProps(state){
  return { authenticated: state.auth.Authentication };
}
export default connect(mapStateToProps)(Header);