import React, { Component } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { googleLogin } from '../actions/userActions';

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

    const responseGoogle = async(response) => {
        let googleResponse  = await googleLogin(response.accessToken)
        console.log(googleResponse);
        console.log(response);
      }
     return (
     <div>
       
          <GoogleLogin
          clientId = {CLIENT_ID}
          buttonText="LOGIN WITH GOOGLE"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
       
      
       
     </div>
     
     )
     
   }
 }
export default GoogleSocialAuth;