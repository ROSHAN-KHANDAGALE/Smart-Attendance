// import axios from "axios";

// export const Login = async (email, password, url) => {
//   try {
//     const data = await axios({
//       method: "post",
//       url: `http://localhost:5000/api/v1/auth/${url}`,
//       data: {
//         email,
//         password,
//       },
//     });
//     return data;
//   } catch (error) {
//     return error.response.data.msg;
//   }
// };
// export const getDepartmentsData = async (token) => {
//   try {
//     const {
//       data: { data },
//     } = await axios.get(
//       "http://localhost:5000/api/v1/get/principle/departments",
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getClassData = async (id, token) => {
//   try {
//     const {
//       data: { data },
//     } = await axios.get(
//       `http://localhost:5000/api/v1/get/department/class/${id}`,
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );

//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };
// export const getSubjectsData = async (id, token) => {
//   try {
//     const {
//       data: { data },
//     } = await axios.get(
//       `http://localhost:5000/api/v1/get/department/class/subjects/${id}`,
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };
