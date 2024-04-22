import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useAuthListener from "../utills/auth-listener";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Button from "react-bootstrap/Button";

function StudentList() {
  const [studentsData, setStudentsData] = useState();
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");

  const params = useParams();
  const user = useAuthListener();
  useEffect(() => {
    async function fetchData() {
      if (user != null) {
        try {
          const {
            data: { data, totalCount },
          } = await axios.get(
            `http://localhost:5000/api/v1/get/department/class/subjects/students/${params.id}/${params.Sid}`,
            {
              headers: { Authorization: `Bearer ${user.token}` },
            }
          );
          if (data != 0) {
            setStudentsData(data);
          }
          if (totalCount != 0) {
            setTotal(totalCount[0].total);
          }
        } catch (error) {
          setError(error.response.data.msg);
        }
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {(user.user.position === "HOD" || user.user.position === "Teacher") && (
        <Create id={params.Sid} />
      )}
      {studentsData ? (
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Roll Number</th>
                <th>Name</th>
                <th>Email</th>
                <th>Number</th>
                <th>Attained Classes</th>
                <th>Percentage of Attendance</th>
              </tr>
            </thead>
            {studentsData?.map(
              ({ _id, rollNumber, name, email, number, counts }) => (
                <tbody key={_id}>
                  <tr
                  // onClick={(e) => {
                  //   e.preventDefault();
                  //   console.log("clicked");
                  // navigate(`/students/${classID}`);
                  // }}
                  >
                    <td>{rollNumber}</td>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{number}</td>
                    <td>{counts != 0 ? counts[0].count : 0}</td>
                    <td>
                      {counts != 0
                        ? ((100 * counts[0].count) / total).toFixed(2)
                        : 0}
                    </td>
                  </tr>
                </tbody>
              )
            )}
          </Table>
        </div>
      ) : (
        <p>Student's Not Available in this subject</p>
      )}

      <p>{error}</p>
    </>
  );
}
export default StudentList;

function Create({ id }) {
  return (
    <div>
      <Link to={"/subject/attendace_by_teacher"}>
        <Button
          className="text-primary"
          variant="light"
          size="md"
          style={{ marginTop: 10, marginBottom: 10 }}
        >
          AttendanceByYou
        </Button>
      </Link>
      <Link to={`/subject/attendance_by_QR/${id}`}>
        <Button
          className="text-primary"
          variant="light"
          size="md"
          style={{ marginTop: 10, marginBottom: 10 }}
        >
          AttendanceByQR
        </Button>
      </Link>
    </div>
  );
}
