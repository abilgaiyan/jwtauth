import { browserHistory } from 'react-router';
import axios from 'axios';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR} from './types';

const API_URL ='http://localhost:3090';
export function signinUser({email, password}){
    return function(dispatch){
       
     //Call server side  api method to sign in
     axios.post(`${API_URL}/signin`, {email, password})
      .then( response =>{
        //Response is good - indicate the user is authenticated
        // - update state as authenticated 
           dispatch({type:AUTH_USER, payload:true});
        // - save the authenticated token in local storage.
           localStorage.setItem('token', response.data.token);

        // - redirect the user to 'feature' page [Page where authenticate user can visit].
           browserHistory.push('/features');

    })
    .catch( () => {
       // Response is bad
       // show user error message.
         dispatch(authError('Bad User Response'));

    });

   
    }
}

export function signoutUser(){
    return function(dispatch){
         // - update state as unauthenticated 
           dispatch({type:UNAUTH_USER, payload:false});
        // - remove the authenticated token from local storage.
           localStorage.removeItem('token');    

        // - redirect the user to 'sigin' page.
            browserHistory.push('/signin');
                
    }
}

export function signupUser({email, password}){
    return function(dispatch){
        
      //Call server side  api method to sign in
      axios.post(`${API_URL}/signup`, {email, password})
       .then( response =>{
         //Response is good - indicate the user is authenticated
         // - update state as authenticated 
            dispatch({type:AUTH_USER, payload:true});
         // - save the authenticated token in local storage.
            localStorage.setItem('token', response.data.token);
 
         // - redirect the user to 'feature' page [Page where authenticate user can visit].
            browserHistory.push('/features');
 
     })
     .catch( (error) => {
        // Response is bad
        // show user error message.
        //debugger;
        //console.log(error.response);
        dispatch(authError(error.response.data.error));
 
     });
 
    
     }
     
}

export function authError(error){
    
    return {
        type: AUTH_ERROR,
        payload: error
    }
}
