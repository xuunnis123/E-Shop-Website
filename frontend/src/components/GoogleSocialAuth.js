import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';

class GoogleSocialAuth extends Component {

  render() {
    const googleResponse = (response) => {
      console.log(response);
    }
    
    return (
      <div className="App">
        <h1>使用GOOGLE登入</h1>
      
        <GoogleLogin
          clientId="767817704623-o0plq03jna3d56rg4l362ticv6e785fd.apps.googleusercontent.com"
          buttonText="使用GOOGLE登入"
          onSuccess={googleResponse}
          onFailure={googleResponse}
        />
      </div>
    );
  }
}

export default GoogleSocialAuth;