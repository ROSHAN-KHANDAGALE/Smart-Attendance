// import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import Modal from "react-bootstrap/Modal";
// import Form from "react-bootstrap/Form";

function Home() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [error, setError] = useState("");
  // const [show, setShow] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      <Button
        onClick={(e) => {
          e.preventDefault();
          navigate(`/login/principle`);
        }}
        className="text-primary"
        variant="light"
        style={{ marginTop: 10, marginBottom: 10 }}
      >
        Principal Login
      </Button>
      <Button
        onClick={(e) => {
          e.preventDefault();
          navigate(`/login/hod`);
        }}
        className="text-primary"
        variant="light"
        style={{ marginTop: 10, marginBottom: 10 }}
      >
        HOD Login
      </Button>
      <Button
        onClick={(e) => {
          e.preventDefault();
          navigate(`/login/teacher`);
        }}
        className="text-primary"
        variant="light"
        style={{ marginTop: 10, marginBottom: 10 }}
      >
        Teacher Login
      </Button>
      <Button
        onClick={(e) => {
          e.preventDefault();
          navigate(`/login/student`);
        }}
        className="text-primary"
        variant="light"
        style={{ marginTop: 10, marginBottom: 10 }}
      >
        Student Login
      </Button>
      {/* <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-2"
              onChange={(e) => setEmail(e.target.value)}
            >
              <Form.Label className="fw-bold">Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group
              className="mb-2"
              onChange={(e) => setPassword(e.target.value)}
            >
              <Form.Label className="fw-bold">Password</Form.Label>
              <Form.Control type="email" placeholder="Enter Password" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => setShow(true)}>
            Login
          </Button>
        </Modal.Footer>
      </Modal> */}
    </div>
  );
}

export default Home;
