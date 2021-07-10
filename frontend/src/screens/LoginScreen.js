import axios from 'axios'
import React,{ useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { GoogleLogin } from 'react-google-login';
import {login } from '../actions/userActions'
import {authByGoogle } from '../actions/googleActions'

  




  export const fetchData = (dispatch) => {
    const token = localStorage.getItem("access_token");
    authByGoogle.get("/todos/").then((res) => {
      console.log(res.data);
    });
  };

  
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
            localStorage.setItem('userInfo',JSON.stringify(res.data));
            window.location.href="/shipping";
          })
          .catch((err) => {
            console.log(err);
          });
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
      onSuccess={responseGoogle}
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
