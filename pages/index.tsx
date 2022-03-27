import type { NextPage } from 'next'
import { Col, Container, Row } from 'react-bootstrap'
import { MatchForm } from '../components/matchForm'

const Home: NextPage = () => {
  return (
    <Container>
      <Row>
        <Col> <MatchForm/> </Col>
        <Col>2 of 2</Col>
      </Row>
    </Container>
  )
}

export default Home
