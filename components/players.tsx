import { Form, Table } from 'react-bootstrap';
import _ from 'lodash'
import { useMatch } from '../context/matchContext';


export const Players = () => {  
    const { players } = useMatch();

    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Label> <h5><b> Players </b></h5></Form.Label>
                <Table  bordered hover>
                    <thead>
                        <tr>
                            <th> Id </th>
                            <th> Name </th>
                            <th> Last Name </th>
                        </tr>
                    </thead>
                    <tbody>
                        { 
                            players.map((rank,index) => 
                                <tr key={index}>
                                    <td> { rank.id} </td>
                                    <td> { rank.name } </td>
                                    <td> { rank.lastName } </td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </Form.Group>
        </Form>
    );
  };