import { Form, Table } from 'react-bootstrap';
import _ from 'lodash'
import { useEffect, useState } from 'react';
import client from '../apoloClient/apoloClient';
import { gql } from "@apollo/client";

interface Ranking {
    id: string;
    name: String;
    lastName: String;
    wins: number;
    losses: number;
}

export const Rank = () => {  
    const [ranking, setRanking] = useState<Ranking[]>([]);
    useEffect(() => {
        client.query({
            query: gql`
                {
                    getRank {
                        id
                        name
                        lastName
                        wins
                        losses
                    }
                }
            `,
        }).then(response => {
            setRanking(response.data.getRank)
        }).catch(error=> {
            console.log('error', error)
        });
      
    }, []);

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
                        { 
                            ranking.map((rank,index) => 
                                <tr key={index}>
                                    <td> {index + 1} </td>
                                    <td> { `${rank.name} ${rank.lastName}` } </td>
                                    <td> { rank.wins } </td>
                                    <td> { rank.losses } </td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </Form.Group>
        </Form>
    );
  };