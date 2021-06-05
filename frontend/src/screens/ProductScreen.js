import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, ListGroupItem } from 'react-bootstrap'
import Rating from '../components/Rating'
import products from '../products'
function ProductScreen({ match }) {
    const product = products.find((p) => p._id == match.params.id)
    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>
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
            
        </div>
    )
}

export default ProductScreen
