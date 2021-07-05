import React,{ useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'

import {register } from '../actions/userActions'

function RegisterScreen({location, history}) {
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    
    const redirect = location.search ? location.search.split('=')[1] :'/'

    const userRegister = useSelector(state => state.userRegister)
    const {error, loading, userInfo} = userRegister

    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
    },[history, userInfo, redirect])

    const submitHandler = (e) =>{
        e.preventDefault()
        if(password != confirmPassword){
            setMessage('密碼不相同')
        }else{
            dispatch(register(name,email,password))
        }
        
    }

    return (
        <FormContainer>
            <h1>登入</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            
            <Form onSubmit={submitHandler}>

            <Form.Group controlId='name'>
                    <Form.Label>名字</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder='輸入名字'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >

                    </Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
                    <Form.Label>電子信箱</Form.Label>
                    <Form.Control
                        required
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
                        required
                        type='password'
                        placeholder='輸入密碼'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >

                    </Form.Control>
            </Form.Group>

            <Form.Group controlId='passwordConfirm'>
                    <Form.Label>確認密碼</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='確認密碼'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >

                    </Form.Control>
            </Form.Group>

                <Button type='submit' variant='primary'>
                    註冊
                </Button>
            </Form>
        
            <Row className='py-3'>
                <Col>
                    已經有帳號？ <Link 
                    to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        登入</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
