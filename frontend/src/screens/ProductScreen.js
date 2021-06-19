import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, Image, ListGroup, Button, Card, ListGroupItem } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails } from '../actions/productActions'
function ProductScreen({ match }) {
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails
    useEffect(() =>{
        dispatch(listProductDetails(match.params.id))

    },[dispatch, match])

    

    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>回上一頁</Link>

            {loading?
                <Loader/>
                : error
                ? <Message variant='danger'>{error}</Message>
                :(
                    <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3}>
                   <ListGroup variant="flush">
                       <ListGroup.Item>
                           <h3>{product.name}</h3>
                       </ListGroup.Item>
                       <ListGroup.Item>
                           <Rating value={product.rating} text={`人氣 ${product.numReviews}`} color={'#f8e825'}/>
                       </ListGroup.Item>
                       <ListGroup.Item>
                           價格:${product.price}
                       </ListGroup.Item>
                       <ListGroup.Item>
                           描述:{product.description}
                       </ListGroup.Item>
                    </ListGroup> 
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>價格</Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            
                            <ListGroup.Item>
                                <Row>
                                    <Col>狀態</Col>
                                    <Col>
                                        {product.countInStock > 0 ? '尚有名額':'目前額滿'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                           
                           <ListGroup.Item>
                                <Button className='btn-block' disabled={product.countInStock == 0} type='button'> 加入購物車</Button>
                            </ListGroup.Item>
                        
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
                )
                }
            
            
        </div>
    )
}

export default ProductScreen
