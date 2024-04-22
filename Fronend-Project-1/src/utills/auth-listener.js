import { useState } from "react";

export default function useAuthListener() {
  const [userP] = useState(JSON.parse(localStorage.getItem("userP")));
  const [userH] = useState(JSON.parse(localStorage.getItem("userH")));
  const [userT] = useState(JSON.parse(localStorage.getItem("userT")));
  const [userS] = useState(JSON.parse(localStorage.getItem("userS")));

  if (userP) {
    return userP;
  } else if (userH) {
    return userH;
  } else if (userT) {
    return userT;
  } else if (userS) {
    return userS;
  } else {
    return null;
  }
}
