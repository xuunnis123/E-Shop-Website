import React, { Component } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

const CLIENT_ID = '767817704623-o0plq03jna3d56rg4l362ticv6e785fd.apps.googleusercontent.com';
class GoogleSocialAuth extends Component {
    constructor(props) {
     super(props);
 
     this.state = {
       isLogined: false,
       accessToken: ''
     };
 
     this.login = this.login.bind(this);
     this.handleLoginFailure = this.handleLoginFailure.bind(this);
     this.logout = this.logout.bind(this);
     this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
   }
 
   login (response) {
     if(response.accessToken){
       this.setState(state => ({
         isLogined: true,
         accessToken: response.accessToken
       }));
     }
   }
 
   logout (response) {
     this.setState(state => ({
       isLogined: false,
       accessToken: ''
     }));
   }
 
   handleLoginFailure (response) {
     alert('登入失敗')
   }
 
   handleLogoutFailure (response) {
     alert('登出失敗')
   }
 
   render() {
     return (
     <div>
       { this.state.isLogined ?
         <GoogleLogout
           clientId={ CLIENT_ID }
           buttonText='Logout'
           onLogoutSuccess={ this.logout }
           onFailure={ this.handleLogoutFailure }
         >
         </GoogleLogout>: <GoogleLogin
           clientId={ CLIENT_ID }
           buttonText='Login'
           onSuccess={ this.login }
           onFailure={ this.handleLoginFailure }
           cookiePolicy={ 'single_host_origin' }
           responseType='code,token'
         />
       }
       { this.state.accessToken ? <h5>Your Access Token: <br/><br/> { this.state.accessToken }</h5> : null }
       
     </div>
     
     )
     
   }
 }
export default GoogleSocialAuth;