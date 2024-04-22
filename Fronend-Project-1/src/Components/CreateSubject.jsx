import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuthListener from "../utills/auth-listener";

function CreateSubject() {
  const [teacherName, setTeacherName] = useState("");
  const [subjectName, setSubjectName] = useState("");
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
            `http://localhost:5000/api/v1/getAllFaculty/${params.Did}`,
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
    console.log("om");
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
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="teacherName">Select Incharge of Sem</label>
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
        <input
          value={subjectName}
          type="text"
          placeholder="Enter Subject Name"
          onChange={(e) => setSubjectName(e.target.value)}
        />
        <button>Submit</button>
      </form>
      <p>{error}</p>
    </div>
  );
}
export default CreateSubject;
