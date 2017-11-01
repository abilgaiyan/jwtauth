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
    renderHtml(){
        if (this.props.authenticated){  
           return (
            <li className="nav-item">
            <Link to="/signin" onClick={this.signoutUser.bind(this)} >Sign out</Link></li> 
           );

        }
        return (
            <li className="nav-item">
             <Link to="/signin" >Sign in</Link></li> 
           );

    }
    render(){
        return (
              <nav className="navbar navbar-light">
                <ul className="navbar-nav">
                    {this.renderHtml()}
                </ul>  
                 
              </nav>  
              
        )
    }
}

function mapStateToProps(state){
  return { authenticated: state.auth.Authentication };
}
export default connect(mapStateToProps)(Header);