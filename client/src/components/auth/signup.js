import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
 
    handleFormSubmit(formProps){
      this.props.signupUser(formProps);
    } 

    renderAlertMessage(){
        
         if (this.props.Error){
          return (
              <div className="alert alert-danger">
                 <strong>oops!!! {this.props.Error} </strong> 
              </div>
          ); 
         }
          
     }
   
    render(){
        const  { handleSubmit, error, fields: {email, password, confirmpassword} } = this.props;
        return (
            <div>Sign Up
              <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                   <label>Email:</label>
                   <input  {...email} className="form-control" /> 
                   {email.touched && email.error && <span>{email.error}</span> }   
                </fieldset>  
                <fieldset className="form-group">
                   <label>Password:</label>
                   <input {...password}  className="form-control" type="password" /> 
                   {password.touched && password.error && <span>{password.error}</span> }   
                </fieldset>  
                <fieldset className="form-group">
                   <label>Confirm Password:</label>
                   <input {...confirmpassword} className="form-control" type="password" /> 
                   {confirmpassword.touched && confirmpassword.error && <span>{confirmpassword.error}</span> }   
                </fieldset>  
                {this.renderAlertMessage()}
                <button action="onSubmit" className="btn btn-primary">Sign Up</button>
              </form>      
            </div>
        );
    }
}

function validate(formProps){
   const error = {};
  // console.log(formProps);
   if (!formProps.email)
     error.email = 'Email is required';

   if ( formProps.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email))
     error.email = 'Enter valid email';
  
   if (!formProps.password)
     error.password = 'Password is required';
    
   if (!formProps.confirmpassword || (formProps.confirmpassword !== formProps.password ))
     error.confirmpassword = 'Password does not match';

   return error;
}

function mapStateToProps(state){

    return{Error: state.auth.Error}
}

export default reduxForm({
    form: 'signup',
    fields : ['email', 'password', 'confirmpassword'],
    validate: validate
},mapStateToProps, actions)(Signup);