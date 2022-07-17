import React, { useState } from "react";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { useNavigate } from "react-router-dom";
function ModalEdit(props) {
  const navigete = useNavigate();
  const [newtask, setnewtask] = useState("");
  const [newdate, setdate] = useState("");
  const [newtime, setnewtime] = useState("");
  const [fulldate, setfulldate] = useState("");
  const handlechangeNewTask = (e) => {
    setnewtask(e.target.value);
  };
  const handleClose = () => {
    props.setClose(false);
  };
  const handleSaveNewTask = () => {
    const fromNewTask = {
      Mytask: newtask,
      myDate: newdate,
      newTime: newtime,
      fulldate: fulldate,
    };
    console.log(fromNewTask);
    props.sendform(fromNewTask);
    props.setClose(false);
  };
  const handleChangeDate = (e) => {
    let valueDate = e.target.value;
    console.log(valueDate);
    let newDate = `${valueDate.getDate()}/${
      valueDate.getMonth() + 1
    }/${valueDate.getFullYear()}`;
    let newTime = valueDate.toLocaleTimeString().slice(0, 5);
    setdate(newDate);
    setnewtime(newTime);
    setfulldate(e.target.value);

    // let DateFull = `${DateFrominpput.getDate()}/${
    //   DateFrominpput.getHours() + 1
    // }/${DateFrominpput.getFullYear()}`;
  };
  return (
    <div className="bg-[#000] text-black opacity-95 fixed inset-0 z-20">
      <div className="flex h-screen justify-center items-center ">
        <div className="bg-white  w-[70%] sm:w-[60%] md:w-[30%] h-2/4 rounded-xl overflow-hidden relative  ">
          <div className="text-black text-2xl relative flex h-[4rem] items-center justify-center bg-[#48ef69]">
            <div className="absolute right-0   h-full ">
              <i
                onClick={handleClose}
                class="fa-solid p-[1rem] fa-xmark cursor-pointer "
              ></i>
            </div>
            <h1 className="text-[1.4rem]">Edit</h1>
          </div>
          <div className="px-8 py-[50px]">
            <label htmlFor="taskedit">New task:</label>
            <input
              type="text"
              id="taskedit"
              value={newtask}
              onChange={(e) => handlechangeNewTask(e)}
              className="outline-none  border-b w-full  mb-5 border-[rgba(0,0,0,0.4)]"
            />
            <label htmlFor="taskedit">New date:</label>

            <DateTimePickerComponent
              value={fulldate}
              onChange={(e) => handleChangeDate(e)}
            />
          </div>

          <div className="border-t-2 bg-gray-200 h-[5rem] flex justify-end   w-full bottom-0 absolute">
            <div className=" w-[40%]  flex items-center justify-around ">
              <button
                onClick={handleSaveNewTask}
                className="p-2 rounded-lg bg-[#48ef69] "
              >
                Save
              </button>
              <button
                onClick={handleClose}
                className="p-2 rounded-lg bg-black text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalEdit;
