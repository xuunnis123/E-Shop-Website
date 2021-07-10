import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function CheckoutSteps({ step1, step2, step3, step4 }) {

    return (
        <Nav className='justify-content-center mb-4'>
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to='/login'>
                        <Nav.Link>登入</Nav.Link>
                    </LinkContainer>
                ) : (
                        <Nav.Link disabled>登入</Nav.Link>
                    )}
            </Nav.Item>

            <Nav.Item>
                {step2 ? (
                    <LinkContainer to='/shipping'>
                        <Nav.Link>運送資訊</Nav.Link>
                    </LinkContainer>
                ) : (
                        <Nav.Link disabled>運送資訊</Nav.Link>
                    )}
            </Nav.Item>

            <Nav.Item>
                {step3 ? (
                    <LinkContainer to='/payment'>
                        <Nav.Link>付款</Nav.Link>
                    </LinkContainer>
                ) : (
                        <Nav.Link disabled>付款</Nav.Link>
                    )}
            </Nav.Item>

            <Nav.Item>
                {step4 ? (
                    <LinkContainer to='/placeorder'>
                        <Nav.Link>確認訂單</Nav.Link>
                    </LinkContainer>
                ) : (
                        <Nav.Link disabled>確認訂單</Nav.Link>
                    )}
            </Nav.Item>
        </Nav>
    )
}

export default CheckoutSteps
