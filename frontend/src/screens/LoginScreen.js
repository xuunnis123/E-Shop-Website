import React,{ useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import GoogleSocialAuth from '../components/GoogleSocialAuth'
import FormContainer from '../components/FormContainer'

import {login,googleLogin } from '../actions/userActions'

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
    const loginByGoogle = (e)=>{
        e.preventDefault()
        dispatch(googleLogin(email,password))
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

            <GoogleSocialAuth onClick={loginByGoogle}/>

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
