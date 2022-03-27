import type { NextPage } from 'next'
import { Col, Container, Row } from 'react-bootstrap'
import { MatchForm } from '../components/matchForm'
import { Rank } from '../components/rank'

const Home: NextPage = () => {
  return (
    <Container>
      <Row>
        <Col> <MatchForm/> </Col>
        <Col> <Rank/> </Col>
      </Row>
    </Container>
  )
}

export default Home
