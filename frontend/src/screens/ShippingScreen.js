import React,{ useState, useEffect } from 'react'
import { Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import {saveShippingAddress} from '../actions/cartActions'

function ShippingScreen(history) {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        history.push('/payment')
    }

    return (
        <FormContainer>
        <CheckoutSteps step1 step2 />
        <h1>運送頁面</h1>
        <Form onSubmit={submitHandler}>

            <Form.Group controlId='address'>
                <Form.Label>地址</Form.Label>
                <Form.Control
                    required
                    type='text'
                    placeholder='輸入地址'
                    value={address ? address : ''}
                    onChange={(e) => setAddress(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='city'>
                <Form.Label>城市</Form.Label>
                <Form.Control
                    required
                    type='text'
                    placeholder='輸入城市'
                    value={city ? city : ''}
                    onChange={(e) => setCity(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='postalCode'>
                <Form.Label>郵遞區號</Form.Label>
                <Form.Control
                    required
                    type='text'
                    placeholder='輸入郵遞區號'
                    value={postalCode ? postalCode : ''}
                    onChange={(e) => setPostalCode(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='country'>
                <Form.Label>國家</Form.Label>
                <Form.Control
                    required
                    type='text'
                    placeholder='輸入國家'
                    value={country ? country : ''}
                    onChange={(e) => setCountry(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
                下一步
            </Button>
        </Form>
    </FormContainer>
    )
}

export default ShippingScreen
