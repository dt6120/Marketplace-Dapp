import React from 'react';
import { Form, Button, Col, Row, InputGroup } from 'react-bootstrap';

const Create = (props) => {
    return (
        <div className="container border p-3 mt-3">
            <h2>Add Product</h2>
            <hr />
            <Form onSubmit={(event) => {
                event.preventDefault();
                const data = new FormData(event.target);
                props.createProduct(data.get('productName'), window.web3.utils.toWei(data.get('productPrice')).toString(), 'Ether');
            }}>
                <Form.Group as={Row} controlId="formProductName">
                    <Form.Label column sm="1">Name</Form.Label>
                    <Col sm="4">
                        <Form.Control
                            name="productName"
                            type="text" 
                            placeholder="Enter product name" 
                            // ref={name => this.productName = name}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formProductPrice">
                    <Form.Label column sm="1">Price</Form.Label>
                    <Col sm="4">
                        <Form.Control
                            name="productPrice"
                            type="number" 
                            placeholder="Enter product price"
                            // ref={price => this.productPrice = price}
                        />
                    </Col>
                    <Col sm="1">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroupPrepend">ETH</InputGroup.Text>
                        </InputGroup.Prepend>
                    </Col>
                </Form.Group>
                <hr />
                <Button variant="primary" type="submit">Create</Button>
            </Form>
        </div>
    );
}

export default Create;
