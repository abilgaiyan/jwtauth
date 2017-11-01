import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signin extends Component{

    handleSigninForm({email, password}){
       //console.log(email, password);
        // call the action fir sigin
        this.props.signinUser({email, password});

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
        const { handleSubmit } = this.props;
        const { email, password} = this.props.fields;

        
      return (
          
          <div>
             <form onSubmit={handleSubmit(this.handleSigninForm.bind(this))}>
               <fieldset className="form-group">
                 <label>Email:</label>  
                 <input  {...email} className="form-control"  ></input>
               </fieldset>  
               <fieldset className="form-group">
                 <label>Password:</label>  
                 <input  {...password} type="password" className="form-control" ></input>
               </fieldset>  
               {this.renderAlertMessage()}
               <button action="submit" className="btn btn-primary">Sign in</button>
             </form>     
             
          </div>    
      );  
    }
}

function mapStateToProps(state){
return {Error: state.auth.Error};
}
export default reduxForm({
    form:'signin',
    fields: ['email', 'password']
    
}, mapStateToProps, actions)(Signin);