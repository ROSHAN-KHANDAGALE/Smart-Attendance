import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const params = useParams();
  async function handleLogin(e) {
    e.preventDefault();
    if (!email || !password) {
      return setError("Input Fields Can't Be Empty");
    }
    try {
      const { data } = await axios({
        method: "post",
        url: `http://localhost:5000/api/v1/auth/${params.log}Login`,
        data: {
          email,
          password,
        },
      });
      localStorage.clear();
      if (data.user.position == "Teacher") {
        localStorage.setItem("userT", JSON.stringify(data));
        window.location.pathname = `/subjects/${data.user._id}/${data.user.departmentID}`;
      } else if (data.user.position == "HOD") {
        localStorage.setItem("userH", JSON.stringify(data));
        window.location.pathname = `/class/${data.user.departmentID}`;
      } else if (data.user.position == "Principle") {
        localStorage.setItem("userP", JSON.stringify(data));
        window.location.pathname = "/departments";
      } else if (data.user.position == "Student") {
        localStorage.setItem("userS", JSON.stringify(data));
      }
    } catch (error) {
      setError(error.response.data.msg);
    }
  }
  return (
    <Container>
      <Form>
        <Form.Group className="mb-2" onChange={(e) => setEmail(e.target.value)}>
          <Form.Label className="fw-bold">Email</Form.Label>
          <Form.Control type="email" placeholder="Enter Email" />
        </Form.Group>
        <Form.Group
          className="mb-2"
          onChange={(e) => setPassword(e.target.value)}
        >
          <Form.Label className="fw-bold">Password</Form.Label>
          <Form.Control type="email" placeholder="Enter Password" />
          <Button variant="primary" onClick={handleLogin}>
            Login
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
}

export default Login;
