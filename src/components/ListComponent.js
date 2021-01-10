import React from 'react';
import { Table, Button, Badge } from 'react-bootstrap';

const Products = (props) => {
    return (
        <div className="container border p-3 mt-3">
            <h2>Buy products</h2>
            <hr />
            <Table bordered hover variant="secondary">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price (Wei)</th>
                        <th>Owner</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    { props.products.map((product, key) => {
                        return (
                            <tr key={key}>
                                <th>{product.id}</th>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.owner}</td>
                                <td>
                                    { product.purchased
                                        ? <Badge pill variant="success">Sold</Badge>
                                        : <Button size="sm" variant="primary" block
                                            name={product.id}
                                            value={product.price}
                                            onClick={(event) => {
                                            event.preventDefault();
                                            props.purchaseProduct(product.id, product.price);
                                        }}>Buy</Button>
                                    }
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
}

export default Products;
