import { Navbar, Container, } from 'react-bootstrap';

export const NavbarL = () => {  
    return (
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">Ping pong app</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="#login">Mark Otto</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  };