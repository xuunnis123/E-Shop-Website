import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav,  Container, Row ,NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'
function Header() {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const logoutHandler = () =>{
        dispatch(logout())
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

                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id ='username' >
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>
                                            個人資料
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                            登出
                                    </NavDropdown.Item>

                                </NavDropdown>
                            ):(
                                <LinkContainer to='/login'>
                            <Nav.Link><i className="fas fa-user"></i>登入</Nav.Link>
                            </LinkContainer>
                            )}

                            
                        </Nav>
                        
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
