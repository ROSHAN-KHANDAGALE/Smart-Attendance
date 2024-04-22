import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuthListener from "../utills/auth-listener";
import axios from "axios";
import { BsPlusLg } from "react-icons/bs";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Container from "react-bootstrap/Container";

function Subject({ id }) {
  const [teacherName, setTeacherName] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [teachersList, setTeachersList] = useState("");
  const [subjectsData, setSubjectsData] = useState([]);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [subjectShow, setSubjectShow] = useState(false);
  const [studentShow, setStudentShow] = useState(false);

  const params = useParams();
  const user = useAuthListener();
  const navigate = useNavigate();
  async function handleCreateSubject(e) {
    e.preventDefault();
    console.log("om");
    console.log(subjectName);
    console.log(teacherName);
    if (!teacherName || !subjectName) {
      return setError("Fields Can Not Be Empty");
    }
    try {
      const { data } = await axios({
        method: "post",
        url: `http://localhost:5000/api/v1/createSubject/${params.id}`,
        headers: { Authorization: `Bearer ${user.token}` },
        data: {
          teacherName,
          subjectName,
        },
      });
      console.log(data);
      //  window.location.pathname = `/class/${params.id}`;
    } catch (error) {
      console.log(error);
      setError(error.response.data.msg);
    }
  }
  async function handleCreateStudent(e) {
    e.preventDefault();
    if (!name || !email || !number || !rollNumber) {
      return setError("Fields Can Not Be Empty");
    }
    try {
      const { data } = await axios({
        method: "post",
        url: `http://localhost:5000/api/v1/createStudent/${params.Did}/${params.id}`,
        headers: { Authorization: `Bearer ${user.token}` },
        data: {
          name,
          email,
          number,
          rollNumber,
        },
      });
      // window.location.pathname = `/class/${params.id}`;
      console.log(data);
    } catch (error) {
      console.log(error);
      setError(error.response.data.msg);
    }
  }
  useEffect(() => {
    async function fetchData() {
      if (user != null) {
        try {
          const {
            data: { data },
          } = await axios.get(
            `http://localhost:5000/api/v1/get/department/class/subjects/${
              params.id || id
            }`,
            {
              headers: { Authorization: `Bearer ${user.token}` },
            }
          );
          setSubjectsData(data);
        } catch (error) {
          setError(error.response.data.msg);
        }
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchData() {
    if (user != null) {
      try {
        const {
          data: { data },
        } = await axios.get(
          `http://localhost:5000/api/v1/getAllFaculty/${user.user.departmentID}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        setTeachersList(data);
      } catch (error) {
        setError(error.response.data.msg);
      }
    }
  }

  return (
    <div>
      {(user.user.position === "HOD" || user.user.isIncharged) && (
        <div>
          <Button
            onClick={() => {
              fetchData();
              setSubjectShow(true);
            }}
            className="text-primary"
            variant="light"
            style={{ marginTop: 20, marginBottom: 20 }}
          >
            <BsPlusLg /> &nbsp;Create Subject
          </Button>
          <Button
            onClick={() => setStudentShow(true)}
            className="text-primary"
            variant="light"
            style={{ marginTop: 20, marginBottom: 20 }}
          >
            {" "}
            <BsPlusLg /> &nbsp;Create Student
          </Button>
        </div>
      )}
      <div>
        <Modal
          size="md"
          show={subjectShow}
          onHide={() => setSubjectShow(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create Subject</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicName">
                <DropdownButton
                  id="dropdown-basic-button"
                  title="Select Teacher"
                  onSelect={(e) => setTeacherName(e)}
                >
                  {teachersList &&
                    teachersList.map(({ name, _id }) => (
                      <Dropdown.Item key={_id} eventKey={name}>
                        {name}
                      </Dropdown.Item>
                    ))}
                </DropdownButton>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Subject Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter subject name"
                  onChange={(e) => setSubjectName(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setSubjectShow(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleCreateSubject}>
              Create
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={studentShow} onHide={() => setStudentShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Create Student</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-2"
                onChange={(e) => setName(e.target.value)}
              >
                <Form.Label className="fw-bold">Name</Form.Label>
                <Form.Control type="name" placeholder="Enter name" />
              </Form.Group>
              <Form.Group
                className="mb-2"
                onChange={(e) => setEmail(e.target.value)}
              >
                <Form.Label className="fw-bold"> Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  NOTE :- Your email is your password.
                </Form.Text>
              </Form.Group>
              <Form.Group
                className="mb-2"
                onChange={(e) => setNumber(e.target.value)}
              >
                <Form.Label className="fw-bold"> Contact No.</Form.Label>
                <Form.Control
                  type="phoneNumber"
                  placeholder="Enter Contact No."
                />
              </Form.Group>
              <Form.Group
                className="mb-2"
                onChange={(e) => setRollNumber(e.target.value)}
              >
                <Form.Label className="fw-bold">Roll NO.</Form.Label>
                <Form.Control type="RollNumber" placeholder="Enter Roll No." />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setStudentShow(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleCreateStudent}>
              Create
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Container className="mt-3">
        <Row className="gy-3">
          {subjectsData?.map(({ subjectName, _id, classID }) => (
            <Col key={_id} lg={"auto"} md={"auto"} sm={"auto"}>
              <Card
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/students/${classID}/${_id}`);
                }}
                text="white"
                bg="secondary"
                className="shadow demo shadow-12"
                style={{
                  width: "15rem",
                  height: "9rem",
                  background:
                    "linear-gradient(to right, rgba(102, 126, 234, 0.5), rgba(118, 75, 162, 0.5))",
                }}
              >
                <Card.Body>
                  <Card.Title style={{ fontSize: 30 }}>
                    {subjectName}
                  </Card.Title>
                  <Button
                    variant="dark"
                    className="position-absolute bottom-0 end-0"
                  >
                    Click Here
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

export default Subject;
