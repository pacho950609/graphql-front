import { useState } from 'react';
import { Form, Button, Table, Col, Row, } from 'react-bootstrap';
import _ from 'lodash'

interface GameSet {
    firstPlayerPoints: number;
    secondPlayerPoints: number;
    setNumber: number;
}

export const Rank = () => {  
    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Label> <h5><b> Ranking </b></h5></Form.Label>
                <Table  bordered hover>
                    <thead>
                        <tr>
                            <th> Position </th>
                            <th> Name </th>
                            <th> W </th>
                            <th> L</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td> 1 </td>
                            <td> Francisco Ricaurte </td>
                            <td> 3 </td>
                            <td> 1 </td>
                        </tr>
                        <tr>
                            <td> 2 </td>
                            <td> Dhanna Gomez </td>
                            <td> 2 </td>
                            <td> 2 </td>
                        </tr>
                    </tbody>
                </Table>
            </Form.Group>
        </Form>
    );
  };