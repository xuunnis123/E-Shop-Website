import React from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav,  Container, Row ,NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout,logoutByGoogle } from '../actions/userActions'
import { GoogleLogout, GoogleLogin } from 'react-google-login';
function Header() {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const userLoginGoogle = useSelector(state => state.userLoginGoogle)
    const {userGoogleInfo} = userLoginGoogle
    

    const dispatch = useDispatch()

    const responseGoogle = (response) => {
        console.log(response);
        axios
          .post("http://localhost:8000/api/users/token/obtain/", {
              
            token: response.tokenId,
          })
          .then((res) => {
            console.log("res.data=",res.data);
            // 拿到的 token 存在 localStorage
            localStorage.setItem("access_token", res.data.access);
            localStorage.setItem("refresh_token", res.data.refresh);
            localStorage.setItem("givenName",JSON.stringify(response.profileObj.name));
            window.location.href="/";
          })
          .catch((err) => {
            console.log(err);
          });
      }
      
      

    const logoutHandler = () =>{
        dispatch(logout())
    }

    const logoutfromGoogle = () => {
        dispatch(logoutByGoogle())
        
     }
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>

                    <LinkContainer to='/'>

                        <Navbar.Brand>Ezra's Web</Navbar.Brand>

                    </LinkContainer>
                    
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <LinkContainer to='/cart'>
                                <Nav.Link><i className="fas fa-shopping-cart"></i>購物車</Nav.Link>
                            </LinkContainer>

                            {userGoogleInfo ? (
                                <NavDropdown title={userGoogleInfo} id ='username' >
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>
                                            個人資料
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <GoogleLogout
                                    clientId="767817704623-o0plq03jna3d56rg4l362ticv6e785fd.apps.googleusercontent.com"
                                    buttonText="登出"
                                   
                                    onLogoutSuccess={logoutfromGoogle}
                                    >
                                    </GoogleLogout>

                                </NavDropdown>
                            ):(
                             
                             <GoogleLogin
                             clientId="767817704623-o0plq03jna3d56rg4l362ticv6e785fd.apps.googleusercontent.com"
                             buttonText="使用 GOOGLE 登入"
                             onSuccess={responseGoogle}
                             onFailure={responseGoogle}
                             
                             cookiePolicy={'single_host_origin'}
                           />
                            )}

                            

                        </Nav>
                        
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
