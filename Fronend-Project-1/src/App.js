import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import {
  Error,
  AttendanceByQR,
  AttendanceByYou,
  CreateDepartment,
  CreateClass,
  CreateStudent,
  CreateSubject,
  CreateTeacher,
} from "./Components";
import {
  Home,
  Departments,
  Class,
  Subject,
  StudentList,
  Header,
  Login,
} from "./Pages";

function App() {
  const [userP] = useState(JSON.parse(localStorage.getItem("userP")));
  const [userH] = useState(JSON.parse(localStorage.getItem("userH")));
  const [userT] = useState(JSON.parse(localStorage.getItem("userT")));
  const [userS] = useState(JSON.parse(localStorage.getItem("userS")));

  return (
    <div>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            userP ? (
              <Departments />
            ) : userH ? (
              <Class id={userH.user.departmentID} />
            ) : userT ? (
              <Subject id={userT.user._id} />
            ) : (
              <Home />
            )
          }
        />
        <Route path="/login/:log" element={<Login />} />
        <Route
          path="/departments"
          element={userP ? <Departments /> : <Home />}
        />
        <Route
          path="/departments/createdepartment"
          element={userP ? <CreateDepartment /> : <Home />}
        />
        <Route
          path="/departments/create_class/:id"
          element={userP || userH ? <CreateClass /> : <Home />}
        />
        <Route
          path="/departments/create_teacher/:id"
          element={userP || userH ? <CreateTeacher /> : <Home />}
        />
        <Route
          path="/create_subject/:Did/:id"
          element={userP || userH || userT ? <CreateSubject /> : <Home />}
        />
        <Route
          path="/create_student/:Did/:id"
          element={userP || userH || userT ? <CreateStudent /> : <Home />}
        />
        <Route
          path="/class/:id"
          element={userP || userH || userT ? <Class /> : <Home />}
        />
        <Route
          path="/subjects/:id/:Did"
          element={userP || userH || userT ? <Subject /> : <Home />}
        />
        <Route
          path="/students/:id/:Sid"
          element={userP || userH || userT ? <StudentList /> : <Home />}
        />
        <Route
          path="/subject/attendace_by_teacher"
          element={userP || userH || userT ? <AttendanceByYou /> : <Home />}
        />
        <Route
          path="/subject/attendance_by_QR/:id"
          element={userP || userH || userT ? <AttendanceByQR /> : <Home />}
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
