import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAuthListener from "../utills/auth-listener";

function CreateClass() {
  const [sem, setSem] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [teachersList, setTeachersList] = useState("");
  const [error, setError] = useState("");

  const user = useAuthListener();
  const params = useParams();

  useEffect(() => {
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
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!sem || !teacherName) {
      return setError("Fields Can Not Be Empty");
    }
    try {
      const { data } = await axios({
        method: "post",
        url: `http://localhost:5000/api/v1/createClass/${params.id}`,
        headers: { Authorization: `Bearer ${user.token}` },
        data: {
          sem,
          teacherName,
        },
      });
      setError(data.msg);
      window.location.pathname = `/class/${params.id}`;
    } catch (error) {
      console.log(error);
      setError(error.response.data.msg);
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="sem">Select Sem</label>
        <select
          id="sem"
          defaultValue="0"
          onChange={(e) => setSem(e.target.value)}
        >
          <option hidden disabled value="0">
            -- select an option --
          </option>
          <option value="1">1 A</option>
          <option value="1">1 B</option>
          <option value="2">2 A</option>
          <option value="2">2 B</option>
          <option value="3">3 A</option>
          <option value="3">3 B</option>
          <option value="4">4 A</option>
          <option value="4">4 B</option>
          <option value="5">5 A</option>
          <option value="5">5 B</option>
          <option value="6">6 A</option>
          <option value="6">6 B</option>
          <option value="7">7 A</option>
          <option value="7">7 B</option>
          <option value="8">8 A</option>
          <option value="8">8 B</option>
        </select>
        <label htmlFor="teacherName">Select Incharge of Class</label>
        <select
          id="teacherName"
          defaultValue="0"
          onChange={(e) => setTeacherName(e.target.value)}
        >
          <option hidden disabled value="0">
            -- select an option --
          </option>
          {teachersList &&
            teachersList.map(({ name, _id }) => (
              <option key={_id} value={name}>
                {name}
              </option>
            ))}
        </select>
        <button>Submit</button>
      </form>
      <p>{error}</p>
    </div>
  );
}

export default CreateClass;
