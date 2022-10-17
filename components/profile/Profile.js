import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Context from "../../context/UserContext";
import user from "../../firebase";

function Profile() {
  const { jwt } = useContext(Context);
  useEffect(() => {
    console.log("usf");
    const fetchData = async () => {
      const res = await axios.get("http://localhost:3010/user/profile", {
        headers: {
          Authorization: `Bearer ` + jwt,
        },
      });
      console.log(res);
    };
    fetchData();
  }, [jwt]);
  return <div>Profile</div>;
}

export default Profile;
