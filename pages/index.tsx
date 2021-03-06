import type { NextPage } from 'next'
import { Col, Container, Row } from 'react-bootstrap'
import { MatchForm } from '../components/matchForm'
import { Players } from '../components/players'
import { Rank } from '../components/rank'
import { useMatch } from '../context/matchContext'

const Home: NextPage = () => {
  return (
    <Container>
      <Row>
        <Col> <MatchForm/> </Col>
        <Col> 
          <Rank/> 
          <Players/>
        </Col>
      </Row>
    </Container>
  )
}

export default Home
