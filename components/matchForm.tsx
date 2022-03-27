import { useState } from 'react';
import { Form, Button, Table, Col, Row, } from 'react-bootstrap';
import _ from 'lodash'

interface GameSet {
    firstPlayerPoints: number;
    secondPlayerPoints: number;
    setNumber: number;
}

export const MatchForm = () => {  
    const [gameSets, setGameSet] = useState<GameSet[]>([]);
    const [ firstPlayerPoints, setFirstPlayerPoints ] = useState<number>(0);
    const [ secondPlayerPoints, setSecondPlayerPoints ] = useState<number>(0);

    return (
        <Form>
            <Form.Group as={Row} className="mb-3">
                <Form.Label> <h5><b> Match detail </b></h5></Form.Label>
                <br/>
                <Form.Label column sm="4">
                    First player id
                </Form.Label>
                <Col sm="8">
                    <Form.Control />
                </Col>
                <br/>
                <br/>
                <Form.Label column sm="4">
                    Second player id
                </Form.Label>
                <Col sm="8">
                    <Form.Control />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label> <h5><b> Set detail </b></h5></Form.Label>
                <br/>
                <Form.Label column sm="4">
                    First player points
                </Form.Label>
                <Col sm="8">
                    <Form.Control type="number" value={firstPlayerPoints} onChange={(value) => setFirstPlayerPoints(Number(value.target.value))} />   
                </Col>
                <br/>
                <br/>
                <Form.Label column sm="4">
                    Second player points
                </Form.Label>
                <Col sm="8">
                    <Form.Control type="number" value={secondPlayerPoints} onChange={(value) => setSecondPlayerPoints(Number(value.target.value))} />
                </Col>
                <br/>
                <br/>
                <br/>
                <Col sm="2">
                    <Button variant="primary" onClick={() => setGameSet([...gameSets, {firstPlayerPoints, secondPlayerPoints, setNumber: gameSets.length + 1}])}>
                        Add set
                    </Button>
                </Col>
                <Col sm="4">
                    <Button variant="primary" onClick={() => {
                        gameSets.pop()
                        setGameSet([...gameSets])
                    }}>   
                        Delete last set
                    </Button>
                </Col>
                <br/>
                <br/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label> Preview </Form.Label>
                <Table  bordered hover>
                    <thead>
                        <tr>
                            <th> Names </th>
                            <th> 1st Set </th>
                            <th> 2do Set </th>
                            <th> 3th Set </th>
                            <th> 4th Set </th>
                            <th> 5th Set </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Francisco Ricaurte</td>
                            { _.range(5).map(range => <td> { gameSets[range] ? gameSets[range].firstPlayerPoints : '-' } </td>) }
                        </tr>
                        <tr>
                            <td> Dhanna Gomez </td>
                            { _.range(5).map(range => <td> { gameSets[range] ? gameSets[range].secondPlayerPoints : '-' } </td>) }
                        </tr>
                    </tbody>
                </Table>
            </Form.Group>
            <Button variant="primary" type="submit">
                Save match result
            </Button>
        </Form>
    );
  };