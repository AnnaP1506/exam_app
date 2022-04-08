import Nav from "react-bootstrap/Nav";

function Topnav() {
  return (
    <Nav>
      <Nav.Item>
        <Nav.Link
          href="https://www.healthline.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Health
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          href="https://www.healthline.com/health/benefits-of-walking"
          target="_blank"
          rel="noopener noreferrer"
        >
          Benefits of walking
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          href="https://dogtime.com/dog-breeds/profiles"
          target="_blank"
          rel="noopener noreferrer"
        >
          Dog breeds
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default Topnav;
