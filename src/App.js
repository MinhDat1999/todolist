import { useEffect } from "react";

import { useState } from "react";
import Login from "./components/Login";
import { Routes, Route, Link } from "react-router-dom";

import Body from "./components/Body";
import { useNavigate } from "react-router-dom";
import Signup from "./components/Signup";

function App() {
  const navigete = useNavigate();
  const [siginSuccessfully, setsiginSuccessfully] = useState(false);
  const [todos, settodos] = useState([]);
  const [user, setUser] = useState([]);
  const [inforUser, setInforUser] = useState();

  useEffect(() => {
    const getuser = async () => {
      const userfromserver = await fetchUser();
      setUser(userfromserver);
    };
    getuser();
  }, [inforUser, siginSuccessfully]);

  const fetchUser = async () => {
    const res = await fetch("http://localhost:5000/users");
    const data = await res.json();

    return data;
  };
  const [search, setsearch] = useState("");

  function handleChangeTime(e) {
    setsearch(e.target.value);
  }

  function handleChangDate(e) {
    const a = new Date(e.target.value);
    setsearch(a.toLocaleDateString());
  }

  function handSubmitLogin(fromuser) {
    const Userlogin = user.find((item) => {
      return (
        item.username === fromuser.username &&
        item.password === fromuser.password
      );
    });
    if (Userlogin) {
      alert("Đăng nhập thành công");
      setInforUser(Userlogin);
      navigete("/");
    } else {
      alert("Mật khẩu không đúng");
    }
  }

  return (
    <div
      className="App w-3/4
  relative
  mx-auto
  flex
  flex-col 
  my-[10px]
  min-h-[100vh]
  rounded-[1rem]
  shadow-xl
  border-[0.2rem]
  p-[2rem]
  
  
  "
    >
      <div className="navbar absolute top-0 right-0 px-[2rem] py-[10px]">
        <Link to="/">
          <i class="fa-solid fa-house p-[0.3rem] border-b-2 border-gray-300  hover:bg-slate-300"></i>
        </Link>
        <Link to="/user">
          <i class="fa-solid fa-user-astronaut ml-3 p-[0.3rem] border-b-2 border-gray-300 hover:bg-slate-300"></i>
        </Link>
        <Link to="/signup">
          <i class="fa-solid fa-user-plus ml-3 fa-house p-[0.3rem] border-b-2 border-gray-300  hover:bg-slate-300"></i>
        </Link>
      </div>
      <div className=" h-[5.1rem] title md:border-b-2 mb-5  pb-[5px ] flex items-center justify-between ">
        <div className=" title-item w-[40%] relative flex">
          {inforUser ? (
            <img
              src={
                inforUser.avatar
                  ? inforUser.avatar
                  : "https://cdn1.vectorstock.com/i/1000x1000/31/95/user-sign-icon-person-symbol-human-avatar-vector-12693195.jpg"
              }
              alt="avatar"
              className="w-[70px] h-[70px] object-cover rounded-full"
            />
          ) : (
            <i class="fa-solid fa-user text-[3.8rem] cursor-pointer"></i>
          )}

          <div className=" ml-[10px] flex flex-col">
            <h1 className="  title-mytasks text-[1.8rem]">
              {inforUser ? inforUser.name : "My to do list"}
            </h1>
            <p className="text-[0.8rem]">
              (You can login by clicking on the avataruser on the right)
            </p>
          </div>
        </div>

        <div className="find-time 3xl:bg-white xl:w-[30%] md:p-[0.2rem]  flex items-center justify-around bg-[#ECCE93] pr-3 ">
          <div>
            <input
              className=" outline-none w-2/4  bg-slate-100 md:p-[0.5rem]"
              type="date"
              onChange={(e) => handleChangDate(e)}
            />
            <input
              className="outline-none w-2/4 md:p-[0.5rem] bg-slate-100"
              type="time"
              onChange={(e) => handleChangeTime(e)}
            />
          </div>
        </div>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <Body
              data={todos}
              search={search}
              setsearch={setsearch}
              inforUser={inforUser}
              setInforUser={setInforUser}
            />
          }
        />
        <Route
          path="/user"
          element={<Login title="Đăng nhâp" onsubmit={handSubmitLogin} />}
        />
        <Route
          path="/signup"
          element={
            <Signup
              title="Đăng ký"
              onsubmit={handSubmitLogin}
              fromsigin={siginSuccessfully}
              setdatauser={setsiginSuccessfully}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
