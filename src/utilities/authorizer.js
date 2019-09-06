import axios from 'axios';
import Pubsub from './pubsub';
//import { shallowCopyObj, deepCopyObj } from './helper';
import { deepCopyObj } from './helper';
import Data from './data';

const baseUrl = process.env.REACT_APP_SERVER_URL|| '/'
var Auth = {};

var user = {};

(function (obj) {

  obj.checkForExistingSession = () => {
    let session_token = localStorage.getItem('x-session-token');
    if (session_token) {
      axios.get(baseUrl+ 'api/user', { headers: { 'x-session-token': session_token } }).then(response => {
        console.log(response);
        if (validateUserData(response.data)) {
          user = deepCopyObj(response.data);
          console.log(user);
          console.log('user is validated');
          if (user === {}){
            console.log('no existing session');
          } else {
            console.log('existing session');
          }
        }
        Pubsub.publish('login', null);
      }).catch(error => {
        console.log(error);
      });
    }
    //console.log('session token check');
  }

  obj.sendSigninRequest = (params) => {
    console.log(params);
    if (validateSigninRequest(params)) {
      let signinObj = {
        username: params.username,
        password: params.password
      };
      // this extra call is not ideal, but we need to hack our way to getting the correct info on signin.  In the future, the API will need to be refactored to send back all the necessary info
      console.log('pre sign in');
      axios.post(baseUrl+ 'api/user/login', signinObj).then(response => {
        //DOES NOT CALL console.log(signinObj);
        let session_token = response.headers['x-session-token'];
        localStorage.setItem('x-session-token', session_token);
        axios.get(baseUrl+ 'api/user', { headers: { 'x-session-token': session_token } }).then(response => {
          user = deepCopyObj(response.data);
          console.log('attempt at /api/user')
          console.log(user);
          Pubsub.publish('login', null);
          window.location.href = "/homepage";
        }).catch(error => {
          console.log(error);
          let errorObj = {
            message: 'Error signing in, please try again'
          };
          Pubsub.publish('auth_error', errorObj);
        });
      }).catch(error => {
        // @TODO return error codes and display helpful messages to the user, i.e. incorrect password, etc.
        // Potentially make more DRY
        let errorObj = {
          message: 'Error signing in, please try again'
        };
        Pubsub.publish('auth_error', errorObj);
      });
    } else {
      let errorObj = {
        message: 'Please fill in the required fields'
      };
      Pubsub.publish('auth_error', errorObj);
    }
  }

  obj.sendSignupRequest = (params) => {
    // **THIS IS HIT console.log('signup request hit');
    if (validateSignupRequest(params)) {
      console.log('sent signup request');
      axios.post(baseUrl+ 'api/user', {
        // first_name: params.first_name,
        // last_name: params.last_name,
        email: params.email,
        username: params.username,
        password: params.password,
        password_confirm: params.password_confirm
      }).then(response => {
        let signinObj = {
          username: params.username,
          //email: params.email,
          password: params.password
        };
        console.log('(sign up requst) sigin obj is: ')
        console.log(signinObj);
        // these TWO extra calls are not ideal, but we need to hack our way to getting the correct info on signup.  In the future, the API will need to be refactored to send back all the necessary info
        axios.post(baseUrl+ 'api/user/login', signinObj).then(signinResp => {
          let session_token = signinResp.headers['x-session-token'];
          localStorage.setItem('x-session-token', session_token);
          axios.get(baseUrl+ 'api/user/', { headers: { 'x-session-token': session_token } }).then(getResponse => {
            user = deepCopyObj(getResponse.data);
            console.log('post to login:')
            console.log(user);
            Pubsub.publish('login', null);
          }).catch(error => {
            console.log(error);
            let errorObj = {
              message: 'Error signing up, please try again'
            };
            Pubsub.publish('auth_error', errorObj);
          });
        }).catch(error => {
          console.log(error);
          let errorObj = {
            message: 'Error signing up, please try again'
          };
          Pubsub.publish('auth_error', errorObj);
        });
      }).catch(error => {
        // @TODO return error codes and display helpful messages to the user, i.e. incorrect password, etc.
        // Potentially make more DRY
        let errorObj = {
          message: 'Error signing up, please try again'
        };
        Pubsub.publish('auth_error', errorObj);
      });
    } else {
      let errorObj = {
        message: 'Please fill out all fields'
      };
      Pubsub.publish('auth_error', errorObj);
    }
  }

  obj.sendSignoutRequest = () => {
    // @TODO need to verify what direction we're taking with the session token business
    let session_token = localStorage.getItem('x-session-token');
    axios({
      url: baseUrl+'api/user/login',
      //user or user?
      method: 'delete',
      headers: {
        'x-session-token': session_token
      }
    }).then(response => {
      if (response.status === 200) {
        user = {};
        localStorage.setItem('x-session-token', '');
        Pubsub.publish('logout', null);
        Data.handleSignout();
        console.log('signout success');
      } else {
        // @TODO not sure what to do in a .then handler here
        console.log('signout resolved, but not status 200');
      }
    }).catch(error => {
      console.log(error);
      // @TODO send an error back to the user
    });
  }
})(Auth);

const validateSigninRequest = (params) => {
  // API requires either email or alias, and password
  // checks if the correct values are in the params
  //if ((params.username || params.email) && params.password) {
  if ((params.username || params.email) && params.password) {
    console.log('user is validated');
    //if (params.username && params.password) {
    return true;
  }
  console.log('user is not validated');
  return false;
}

const validateSignupRequest = (params) => {
  /* API requires all of:
    first_name
    last_name
    email
    alias
    password
  */
  if (
      //params.first_name &&
    //params.last_name &&
    params.username &&
    params.email &&
    //params.email_address &&
    //params.alias &&
    params.password &&
    params.password_confirm) {
      console.log('signup validation is true');
    return true;
  }
  console.log('signup validation is false');
  return false;
}

const validateUserData = (data) => {
  if (
      //data.alias &&
    //data.created &&
    data.id
    //data.email &&
    //params.email_address &&
    //data.first_name &&
    //data.last_name &&
    //data.updated &&
    //data.user_id
    ) {
      console.log("user data validates as true");
    return true
  }
  console.log("user data validates as false");
  return false;
}

export default Auth;

export {
  user
};