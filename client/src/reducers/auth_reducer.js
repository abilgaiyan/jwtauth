import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from '../actions/types';

const initialState = {Authentication: false };

export default function(state = initialState, action){
    
    switch(action.type){
        case AUTH_USER:
          return {...state, Authentication: true};
        case UNAUTH_USER:
          return {...state, Authentication: false};
        case AUTH_ERROR:
          return {...state, Error: action.payload};       
    }
    return state;
}