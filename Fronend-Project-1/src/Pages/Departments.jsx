import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthListener from "../utills/auth-listener";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { BsPlusLg } from "react-icons/bs";
import Container from "react-bootstrap/Container";

function Departments() {
  const [departmentData, setDepartmentData] = useState([]);
  const [departmentName, setDepartmentName] = useState("");
  const [hodName, setHodName] = useState("");
  const [hodNumber, setHodNumber] = useState("");
  const [hodEmail, setHodEmail] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const user = useAuthListener();
  console.log(departmentData);
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!departmentName || !hodName || !hodNumber || !hodEmail) {
      return setError("Fields Can Not Be Empty");
    }
    try {
      const { data } = await axios({
        method: "post",
        url: `http://localhost:5000/api/v1/createDepartment`,
        headers: { Authorization: `Bearer ${user.token}` },
        data: {
          name: hodName,
          email: hodEmail,
          number: hodNumber,
          departmentName,
        },
      });
      console.log(data);
      setShow(false);
      window.location.pathname = "/departments";
    } catch (error) {
      console.log(error);
      setError(error.response.data.msg);
    }
  };

  useEffect(() => {
    async function fetchData() {
      if (user != null) {
        try {
          const {
            data: { data },
          } = await axios.get(
            "http://localhost:5000/api/v1/get/principle/departments",
            {
              headers: { Authorization: `Bearer ${user.token}` },
            }
          );
          setDepartmentData(data);
        } catch (error) {
          setError(error.response.data.msg);
        }
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {user && (
        <Button
          onClick={() => setShow(true)}
          className="text-primary"
          variant="light"
          style={{ marginTop: 10, marginBottom: 10 }}
        >
          {" "}
          <BsPlusLg /> &nbsp;Create Department
        </Button>
      )}
      <>
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Create Department</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-2">
                <Form.Label className="fw-bold">Department Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter department name"
                  onChange={(e) => setDepartmentName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label className="fw-bold">HOD Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter name"
                  onChange={(e) => setHodName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label className="fw-bold">HOD Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => setHodEmail(e.target.value)}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label className="fw-bold">HOD Contact No.</Form.Label>
                <Form.Control
                  type="phoneNumber"
                  placeholder="Enter Contact No."
                  onChange={(e) => setHodNumber(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleCreate}>
              Create
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <Container className="mt-3">
        <Row className="gy-3 ">
          {user &&
            departmentData.map(({ departmentName, _id, hod }) => (
              <Col key={_id} lg={"auto"} md={"auto"} sm={"auto"}>
                <Card
                  text="white"
                  bg="secondary"
                  className="shadow demo shadow-4"
                  style={{
                    width: "20rem",
                    height: "10rem",
                    background:
                      "linear-gradient(to right, rgba(102, 126, 234, 0.5), rgba(118, 75, 162, 0.5))",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/class/${_id}`);
                  }}
                >
                  <Card.Body>
                    <Card.Title style={{ fontSize: 24 }}>
                      {departmentName}
                    </Card.Title>
                    <Card.Text style={{ fontSize: 12 }}>
                      {hod[0].name}
                    </Card.Text>
                    <Card.Text style={{ fontSize: 10 }}>
                      {hod[0].number}
                    </Card.Text>
                    <Card.Text style={{ fontSize: 10 }}>
                      {hod[0].email}
                    </Card.Text>
                    <Button
                      className="position-absolute bottom-0 end-0"
                      variant="dark"
                    >
                      Click Card
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
      <p>{error}</p>
    </div>
  );
}

export default Departments;
