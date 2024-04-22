import { useEffect, useState } from "react";
import useAuthListener from "../utills/auth-listener";
import axios from "axios";
import { useParams } from "react-router-dom";
import QRCode from "qrcode";
// import { QrReader } from "react-qr-reader";

function AttendanceByQR({ total }) {
  const [error, setError] = useState("");
  const [src, setSrc] = useState("");
  const user = useAuthListener();
  const params = useParams();
  useEffect(() => {
    fetchData();
    // let interval = setInterval(() => {
    //   fetchData();
    // }, 15000);
    return () => {
      // clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchData() {
    if (user != null) {
      console.log("om");
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/v1/get/generateAttendanceToken/${params.id}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        QRCode.toDataURL(data).then(setSrc);
      } catch (error) {
        setError(error.response.data.msg);
      }
    }
  }

  return (
    <div>
      <p>{error}</p>
      <p>{total}</p>
      <img src={src} alt="QR" />
      {/* <QrReader
        onResult={(result, error) => {
          if (!!result) {
            console.log(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: "100%" }}
      /> */}
    </div>
  );
}

export default AttendanceByQR;
