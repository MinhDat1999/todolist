import React, { useState } from "react";
import Login from "./Login";
import { useNavigate } from "react-router-dom";

function Signup(props) {
  const navigete = useNavigate();
  const [aginpass, setaginpass] = useState();
  const [name, setName] = useState("");
  const handleChangePassword = (e) => {
    setaginpass(e.target.value);
  };
  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleSubmitSingin = async (from) => {
    console.log(from);
    const newfrom = {
      username: from.username,
      password: from.password,
      name: name,
    };
    if (from.password.trim() === aginpass.trim()) {
      console.log("trùng lhopws");
      const res = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newfrom),
      });

      alert("Đăng ký thành công");
      props.setdatauser(!props.siginSuccessfully);

      navigete("/");
    } else {
      console.log("Nhập lại mật khẩu chưa đúng");
    }
  };

  return (
    <div className="from-[#ec93ec]  to-fuchsia-600">
      <Login onsubmit={handleSubmitSingin} title="Sign Up">
        <label htmlFor="confirmpassword">Confirm password:</label>
        <input
          onChange={(e) => handleChangePassword(e)}
          value={aginpass}
          type="password"
          id="confirmpassword"
          className="outline-none border-b-2 mb-6"
        />
        <label htmlFor="name">Name:</label>
        <input
          onChange={(e) => handleChangeName(e)}
          value={name}
          type="text"
          id="name"
          className="outline-none border-b-2 mb-6"
        />
      </Login>
    </div>
  );
}

export default Signup;
