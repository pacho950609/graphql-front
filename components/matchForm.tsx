import { useEffect, useState } from 'react';
import { Form, Button, Table, Col, Row, } from 'react-bootstrap';
import _ from 'lodash'
import client from '../apoloClient/apoloClient';
import { gql } from "@apollo/client";
import { Player } from '../context/matchContext';

interface GameSet {
    firstPlayerPoints: number;
    secondPlayerPoints: number;
    setNumber: number;
}

export const MatchForm = (props:{ players: Player[]}) => {  
    const [gameSets, setGameSet] = useState<GameSet[]>([]);
    const [ firstPlayerId, setFirstPlayerId ] = useState<string>('');
    const [ secondPlayerId, setSecondPlayerId ] = useState<string>('');
    const [ firstPlayerPoints, setFirstPlayerPoints ] = useState<number>(0);
    const [ secondPlayerPoints, setSecondPlayerPoints ] = useState<number>(0);
    const [pointErrorMsg, setPointErrorMsg] = useState<string>('');
    const [matchErrorMsg, setMatchErrorMsg] = useState<string>('');
    const [matchMsg, setMatchMsg] = useState<string>('');

    useEffect(() => {
        setFirstPlayerId(props.players[0]?.id)
        setSecondPlayerId(props.players[1]?.id)
    }, [props.players])

    const gameSetsWin = () => {
        return gameSets.reduce(
            (prev, curr) => {
                if (curr.firstPlayerPoints > curr.secondPlayerPoints) {
                    return {
                        first: prev.first + 1,
                        second: prev.second,
                    };
                }
                return {
                    first: prev.first,
                    second: prev.second + 1,
                };
            },
            { first: 0, second: 0 },
        );
    }

    const canCreateGameSet = () => {
        if(gameSets.length > 5) {
            return false
        }
        const wins = gameSetsWin();
        if(wins.first === 3 || wins.second === 3) {
            return false;
        }
        return true
    }

    const addGameSet = () => {
        if (
            firstPlayerPoints >= 10 &&
            secondPlayerPoints >= 10 &&
            Math.abs(firstPlayerPoints - secondPlayerPoints) !== 2
        ) {
            return setPointErrorMsg('Points difference must be two');
        } else if (firstPlayerPoints > secondPlayerPoints) {
            if (firstPlayerPoints < 11 || (firstPlayerPoints > 11 && secondPlayerPoints < 10))
                    return setPointErrorMsg('Set must end at 11 points');
        } else if (secondPlayerPoints > firstPlayerPoints) {
            if (secondPlayerPoints < 11 || (secondPlayerPoints > 11 && firstPlayerPoints < 10))
                    return setPointErrorMsg('Set must end at 11 points');
        } else if (firstPlayerPoints === secondPlayerPoints) {
                    return setPointErrorMsg('There must be a set winner');
        } 

        setPointErrorMsg('');
        setGameSet([...gameSets, {firstPlayerPoints, secondPlayerPoints, setNumber: gameSets.length + 1}]);
        
    }

    const createMatch = async () => {
        const setsWins = gameSetsWin();
        if (setsWins.first !== 3 && setsWins.second !== 3) {
            return setMatchErrorMsg('There must be a winner (3 sets won)')
        }

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
            `
        })
        setMatchErrorMsg('');
        setMatchMsg('Match saved');
        setGameSet([]);
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
                            props.players.map(player => 
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
                            props.players.map(player => 
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
                <Col sm="12" style={{color:'red'}}>
                    {pointErrorMsg}
                </Col>
                <br/>
                <br/>
                <Col sm="2">
                    <Button variant="primary" onClick={() => addGameSet()} disabled={!canCreateGameSet()}>
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
                            <td> { firstPlayerId? `${props.players.find(p => p.id === firstPlayerId)?.name} ${props.players.find(p => p.id === firstPlayerId)?.lastName}` : '-'} </td>
                            { _.range(5).map(range => <td key={range} > { gameSets[range] ? gameSets[range].firstPlayerPoints : '-' } </td>) }
                        </tr>
                        <tr>
                            <td> { secondPlayerId? `${props.players.find(p => p.id === secondPlayerId)?.name} ${props.players.find(p => p.id === secondPlayerId)?.lastName}` : '-'} </td>
                            { _.range(5).map(range => <td key={range} > { gameSets[range] ? gameSets[range].secondPlayerPoints : '-' } </td>) }
                        </tr>
                    </tbody>
                </Table>
            </Form.Group>
            {
                matchErrorMsg ?
                    <>
                        <Col sm="12" style={{color:'red'}}>
                            {matchErrorMsg}
                        </Col>
                        <br/>
                    </> : 
                    ''
            }
            {
                matchMsg ?
                    <>
                        <Col sm="12">
                            {matchMsg}
                        </Col>
                        <br/>
                    </> : 
                    ''
            }
            <Button variant="primary" onClick={() => createMatch()}>
                Save match result
            </Button>
        </Form>
    );
  };