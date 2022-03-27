import { useEffect, useState } from 'react';
import { Form, Button, Table, Col, Row, } from 'react-bootstrap';
import _ from 'lodash'
import client from '../apoloClient/apoloClient';
import { gql } from "@apollo/client";

interface GameSet {
    firstPlayerPoints: number;
    secondPlayerPoints: number;
    setNumber: number;
}

interface Player {
    id: string;
    name: String;
    lastName: String;
}

export const MatchForm = () => {  
    const [gameSets, setGameSet] = useState<GameSet[]>([]);
    const [ firstPlayerId, setFirstPlayerId ] = useState<string>('');
    const [ secondPlayerId, setSecondPlayerId ] = useState<string>('');
    const [ firstPlayerPoints, setFirstPlayerPoints ] = useState<number>(0);
    const [ secondPlayerPoints, setSecondPlayerPoints ] = useState<number>(0);
    const [players, setPlayers] = useState<Player[]>([]);

    useEffect(() => {
        client.query({
            query: gql`
                {
                    getPlayers 
                    {
                        id
                        name
                        lastName
                    }
                }
            `,
        }).then(response => {
            setPlayers(response.data.getPlayers)
            setFirstPlayerId(response.data.getPlayers[0].id)
            setSecondPlayerId(response.data.getPlayers[1].id)
        }).catch(error=> {
            console.log('error', error)
        });
      
    }, []);

    const createMatch = async () => {
        const response = await client.mutate({
            context: {
                headers: {
                    Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImYxMTk1ZDMzLTRhMzctNGFlYS04OTFiLTA3NWQwZGJlY2M3YSIsImlhdCI6MTY0ODM4MDg0Nn0.USdtRxpXtgaytrLxUnJNzDGovooSCWKT2v6gYuyWvWY'
                }
            },
            variables: {
                sets: gameSets,
                firstPlayerId,
                secondPlayerId,
            },
            mutation: gql`
                mutation CreateMatch($sets: [SetInput]!, $firstPlayerId: String!, $secondPlayerId: String!){
                    addMatch(input:{
                        firstPlayerId: $firstPlayerId
                        secondPlayerId: $secondPlayerId
                        sets: $sets
                    }) {
                        id
                        sets {
                            firstPlayerPoints
                            secondPlayerPoints
                            setNumber
                        }
                    }
                }
            `})
    }

    return (
        <Form>
            <Form.Group as={Row} className="mb-3">
                <Form.Label> <h5><b> Match detail </b></h5></Form.Label>
                <br/>
                <Form.Label column sm="4">
                    First player
                </Form.Label>
                <Col sm="8">
                    <Form.Select aria-label="Default select example" value={firstPlayerId} onChange={(newId) => setFirstPlayerId(newId.target.value)}>
                        {
                            players.map(player => 
                                <option key={player.id} value={player.id}>{`${player.name} ${player.lastName}`}</option>
                            )
                        }
                    </Form.Select>
                </Col>
                <br/>
                <br/>
                <Form.Label column sm="4">
                    Second player
                </Form.Label>
                <Col sm="8">
                    <Form.Select aria-label="Default select example" value={secondPlayerId} onChange={(newId) => setSecondPlayerId(newId.target.value)}>
                        {
                            players.map(player => 
                                <option key={player.id} value={player.id}>{`${player.name} ${player.lastName}`}</option>
                            )
                        }
                    </Form.Select>
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
            <Form.Label> <h5><b> Preview </b></h5></Form.Label>
                <Table  bordered hover>
                    <thead>
                        <tr>
                            <th> Names </th>
                            <th> 1st Set </th>
                            <th> 2nd Set </th>
                            <th> 3rd Set </th>
                            <th> 4th Set </th>
                            <th> 5th Set </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Francisco Ricaurte</td>
                            { _.range(5).map(range => <td key={range} > { gameSets[range] ? gameSets[range].firstPlayerPoints : '-' } </td>) }
                        </tr>
                        <tr>
                            <td> Dhanna Gomez </td>
                            { _.range(5).map(range => <td key={range} > { gameSets[range] ? gameSets[range].secondPlayerPoints : '-' } </td>) }
                        </tr>
                    </tbody>
                </Table>
            </Form.Group>
            <Button variant="primary" onClick={() => createMatch()}>
                Save match result
            </Button>
        </Form>
    );
  };