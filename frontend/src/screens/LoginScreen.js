import React,{ useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { GoogleLogin } from 'react-google-login';
import {login } from '../actions/userActions'

const responseGoogle = (response) => {
    console.log(response);
    localStorage.setItem('userFromGoogle', JSON.stringify(response))
  }
  
const handleLogin = async googleData => {
    const res = await fetch("/api/v1/auth/google", {
        method: "POST",
        body: JSON.stringify({
        token: googleData.tokenId
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json()
    // store returned user somehow
  }
    
   

function LoginScreen({location, history}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    
    const redirect = location.search ? location.search.split('=')[1] :'/'

    const userLogin = useSelector(state => state.userLogin)
    const {error, loading, userInfo} = userLogin

    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
    },[history, userInfo, redirect])

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(login(email,password))
    }
    
    return (
        <FormContainer>
            <h1>登入</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>電子信箱</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='輸入信箱'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>密碼</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='輸入密碼'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    登入
                </Button>
            </Form>
            <br/>
            <GoogleLogin
      clientId="767817704623-o0plq03jna3d56rg4l362ticv6e785fd.apps.googleusercontent.com"
      buttonText="使用 GOOGLE 登入"
      onSuccess={handleLogin}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
            

            <Row className='py-3'>
                <Col>
                    還沒加入會員？ <Link 
                    to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        註冊
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen
