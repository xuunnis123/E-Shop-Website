import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, ImageProps, Form, Button, Card } from 'react-bootstrap'
import {  Message } from '../components/Message'
import { addToCart } from '../actions/cartActions'


function CartScreen({ match, location, history}) {
    const productId = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]):1
    //console.log('qty:',qty)
    const dispatch = useDispatch()
    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, qty))
        }

    },[dispatch,productId, qty])

    return (
        <div>
            Cart
        </div>
    )
}
export default CartScreen
