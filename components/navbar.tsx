import { Navbar, Container, } from 'react-bootstrap';

export const NavbarL = () => {  
    return (
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">Ping pong app</Navbar.Brand>
          <Navbar.Toggle />
        </Container>
      </Navbar>
    );
  };