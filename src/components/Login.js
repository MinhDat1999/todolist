import React, { useState } from "react";

function Login(props) {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  function handleChangeUserName(e) {
    setusername(e.target.value);
  }
  function handleChangePassword(e) {
    setpassword(e.target.value);
  }
  function handleSubmitUser(e) {
    e.preventDefault();
    const fromlogin = {
      username: username,
      password: password,
    };
    props.onsubmit(fromlogin);
  }

  function close() {
    props.openTab(!props.isopen);
  }

  return (
    <div
      className="absolute   bottom-0 left-0 w-full h-[85%] shadow-lg shadow-[#ECCE93]
    bg-gradient-to-r from-[#ECCE93]  to-yellow-200
      flex items-center justify-center"
    >
      <div className="w-[450px] h-[500px] bg-white  rounded-xl flex flex-col  relative ">
        <div className="title min-h-[50px] w-full border-b-2">
          <h1 className=" text-center m-5 text-[1.5rem]">{props.title}</h1>
        </div>
        <div className="absolute right-0 top-0 p-4">
          <a href="/">
            <i class="fa-solid fa-xmark cursor-pointer" onClick={close}></i>
          </a>
        </div>

        <div className="w-full h-full p-[15%] ">
          <form onSubmit={handleSubmitUser} className="flex flex-col w-full">
            <label htmlFor="username">Username:</label>
            <input
              onChange={(e) => handleChangeUserName(e)}
              value={username}
              type="text"
              id="username"
              className="outline-none border-b-2 mb-4"
            />
            <label htmlFor="password">Password:</label>
            <input
              onChange={(e) => handleChangePassword(e)}
              value={password}
              type="password"
              className="outline-none border-b-2 mb-6"
            />
            {props.children}
            <button
              type="submit"
              className="bg-slate-800 text-[#fff] p-[1rem] rounded-xl"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
