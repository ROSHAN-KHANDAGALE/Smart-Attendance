import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useAuthListener from "../utills/auth-listener";

function CreateStudent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [error, setError] = useState("");

  const user = useAuthListener();
  const params = useParams();

  async function handleSubmit(e) {
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
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          type="text"
          placeholder="Enter Student Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          value={email}
          type="email"
          placeholder="Enter Student Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          value={number}
          type="text"
          placeholder="Enter Student Number"
          onChange={(e) => setNumber(e.target.value)}
        />
        <input
          value={rollNumber}
          type="text"
          placeholder="Enter Student Roll Number"
          onChange={(e) => setRollNumber(e.target.value)}
        />
        <button>Submit</button>
      </form>
      <p>{error}</p>
    </div>
  );
}

export default CreateStudent;
