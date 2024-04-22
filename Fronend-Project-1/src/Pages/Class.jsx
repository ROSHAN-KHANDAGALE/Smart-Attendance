import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuthListener from "../utills/auth-listener";
import Button from "react-bootstrap/esm/Button";
import { BsPlusLg } from "react-icons/bs";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

function Class({ id }) {
  const [classData, setClassData] = useState([]);
  const [teachersList, setTeachersList] = useState();
  const [teacherShow, setTeacherShow] = useState(false);
  const [classShow, setClassShow] = useState(false);
  const [error, setError] = useState("");
  const [sem, setSem] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");

  const params = useParams();
  const navigate = useNavigate();
  const user = useAuthListener();

  async function handleCreateClass(e) {
    e.preventDefault();
    if (!sem || !teacherName) {
      return setError("Fields Can Not Be Empty");
    }
    try {
      const { data } = await axios({
        method: "post",
        url: `http://localhost:5000/api/v1/createClass/${user.user.departmentID}`,
        headers: { Authorization: `Bearer ${user.token}` },
        data: {
          sem,
          teacherName,
        },
      });
      window.location.pathname = `/class/${params.id}`;
    } catch (error) {
      console.log(error);
      setError(error.response.data.msg);
    }
  }

  async function handleCreateTeacher(e) {
    e.preventDefault();
    console.log(name, email, number);
    if (!name || !email || !number) {
      return setError("Fields Can Not Be Empty");
    }
    try {
      const { data } = await axios({
        method: "post",
        url: `http://localhost:5000/api/v1/createTeacher/${user.user.departmentID}`,
        headers: { Authorization: `Bearer ${user.token}` },
        data: {
          name,
          email,
          number,
        },
      });
      // window.location.pathname = `/class/${params.id}`;
      setTeacherShow(false);
    } catch (error) {
      console.log(error);
      setError(error.response.data.msg);
    }
  }

  async function fetchData() {
    if (user != null) {
      try {
        const {
          data: { data },
        } = await axios.get(
          `http://localhost:5000/api/v1/getFaculty/${params.id}`,
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

  useEffect(() => {
    async function fetchData() {
      if (user != null) {
        try {
          const {
            data: { data },
          } = await axios.get(
            ` http://localhost:5000/api/v1/get/department/class/${
              params.id || id
            }`,
            {
              headers: { Authorization: ` Bearer ${user.token}` },
            }
          );
          setClassData(data);
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
      {user.user.position === "HOD" && (
        <div>
          <Button
            onClick={() => {
              fetchData();
              setClassShow(true);
            }}
            className="text-primary"
            variant="light"
            style={{ marginTop: 10, marginBottom: 10 }}
          >
            <BsPlusLg /> &nbsp;Create Semester
          </Button>
          <Button
            onClick={() => setTeacherShow(true)}
            className="text-primary"
            variant="light"
            style={{ marginTop: 10, marginBottom: 10 }}
          >
            {" "}
            <BsPlusLg /> &nbsp;Create Teacher
          </Button>
        </div>
      )}

      <div>
        <Modal size="md" show={classShow} onHide={() => setClassShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Create Semester</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <DropdownButton
                  size="xs"
                  id="dropdown-basic-button"
                  title="Select Semester"
                  onSelect={(e) => setSem(e)}
                >
                  <Dropdown.Item eventKey={"I A"}>I A</Dropdown.Item>
                  <Dropdown.Item eventKey={"I B"}>I B</Dropdown.Item>
                  <Dropdown.Item eventKey={"II A"}>II A</Dropdown.Item>
                  <Dropdown.Item eventKey={"II B"}>II B</Dropdown.Item>
                  <Dropdown.Item eventKey={"III A"}>III A</Dropdown.Item>
                  <Dropdown.Item eventKey={"III B"}>III B</Dropdown.Item>
                  <Dropdown.Item eventKey={"IV A"}>IV A</Dropdown.Item>
                  <Dropdown.Item eventKey={"IV B"}>IV B</Dropdown.Item>
                  <Dropdown.Item eventKey={"V A"}>V A</Dropdown.Item>
                  <Dropdown.Item eventKey={"V B"}>V B</Dropdown.Item>
                  <Dropdown.Item eventKey={"VI A"}>VI A</Dropdown.Item>
                  <Dropdown.Item eventKey={"VI B"}>VI B</Dropdown.Item>
                  <Dropdown.Item eventKey={"VII A"}>VII A</Dropdown.Item>
                  <Dropdown.Item eventKey={"VII B"}>VII B</Dropdown.Item>
                  <Dropdown.Item eventKey={"VIII A"}>VIII A</Dropdown.Item>
                  <Dropdown.Item eventKey={"VIII B"}>VIII B</Dropdown.Item>
                </DropdownButton>
              </Form.Group>
              <Form.Group className="mb-3">
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
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setClassShow(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleCreateClass}>
              Create
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          size="md"
          show={teacherShow}
          onHide={() => setTeacherShow(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create Teacher</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                onChange={(e) => setName(e.target.value)}
              >
                <Form.Label className="fw-bold">Name</Form.Label>
                <Form.Control type="name" placeholder="Enter name" />
              </Form.Group>
              <Form.Group
                className="mb-3"
                onChange={(e) => setEmail(e.target.value)}
              >
                <Form.Label className="fw-bold"> Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group
                className="mb-3"
                onChange={(e) => setNumber(e.target.value)}
              >
                <Form.Label className="fw-bold"> Contact No.</Form.Label>
                <Form.Control
                  type="phoneNumber"
                  placeholder="Enter Contact No."
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setTeacherShow(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleCreateTeacher}>
              Create
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Container className="mt-3">
        <Row className="gy-3">
          {classData.map(({ sem, _id }) => (
            <Col key={_id} lg={"auto"} md={"auto"} sm={"auto"}>
              <Card
                onClick={(e) => {
                  e.preventDefault();
                  navigate(
                    `/subjects/${_id}/${params.id || user.user.departmentID}`
                  );
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
                  <Card.Title style={{ fontSize: 50 }}>{sem}</Card.Title>
                  <Button
                    variant="dark"
                    className="position-absolute bottom-0 end-0"
                  >
                    Click Card
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Class;
