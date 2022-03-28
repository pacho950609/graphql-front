import type { NextPage } from 'next'
import { Col, Container, Row } from 'react-bootstrap'
import { MatchForm } from '../components/matchForm'
import { Players } from '../components/players'
import { Rank } from '../components/rank'
import { usePlayers } from '../context/matchContext'

const Home: NextPage = () => {
  const { players, ranking } = usePlayers();
  console.log('funcionaaa', players, '222222',ranking);
  return (
    <Container>
      <Row>
        <Col> <MatchForm players={players}/> </Col>
        <Col> 
          <Rank/> 
          <Players/>
        </Col>
      </Row>
    </Container>
  )
}

export default Home
