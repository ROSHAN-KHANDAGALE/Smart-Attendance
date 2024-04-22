import axios from "axios";
import { useState } from "react";
import useAuthListener from "../utills/auth-listener";

function CreateDepartment() {
  const [departmentName, setDepartmentName] = useState("");
  const [hodName, setHodName] = useState("");
  const [hodNumber, setHodNumber] = useState("");
  const [hodEmail, setHodEmail] = useState("");
  const [error, setError] = useState("");

  const user = useAuthListener();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!departmentName || !hodName || !hodNumber || !hodEmail) {
      return setError("Fields Can Not Be Empty");
    }
    try {
      await axios({
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
      window.location.pathname = "/departments";
    } catch (error) {
      console.log(error);
      setError(error.response.data.msg);
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={departmentName}
          type="text"
          placeholder="Enter Department Name"
          onChange={(e) => setDepartmentName(e.target.value)}
        />
        <input
          value={hodName}
          type="text"
          placeholder="Enter HOD Name"
          onChange={(e) => setHodName(e.target.value)}
        />
        <input
          value={hodEmail}
          type="email"
          placeholder="Enter HOD Email"
          onChange={(e) => setHodEmail(e.target.value)}
        />
        <input
          value={hodNumber}
          type="text"
          placeholder="Enter HOD Number"
          onChange={(e) => setHodNumber(e.target.value)}
        />
        <button>Submit</button>
      </form>
      <p>{error}</p>
    </div>
  );
}

export default CreateDepartment;
