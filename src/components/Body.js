import TodoFrom from "./Todofrom";
import ListTodo from "./ListTodo";
import { useEffect } from "react";
import { useState } from "react";
import ModalEdit from "./ModalEdit";

function Body(props) {
  const [todos, settodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [openModal, setonpenModal] = useState(false);

  useEffect(() => {
    const gettasks = async () => {
      const taskfromserver = await fetchtasks();
      if (props.inforUser) {
        const ListTaskofuser = taskfromserver.filter(
          (item) => item.iduser === props.inforUser.id
        );
        settodos(ListTaskofuser);
      } else {
        const List = taskfromserver.filter((item) => item.iduser == "");
        settodos(List);
      }
    };

    gettasks();
  }, [props.inforUser]);

  const fetchtasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();

    return data;
  };

  const [idIndex, setIdIndex] = useState(null);

  const [opstion, setopstion] = useState("All");

  const [idItem, setIdItem] = useState(null);

  function handdleChangeSearchBar(e) {
    props.setsearch(e.target.value);
  }
  function handleEdit(id, index) {
    setonpenModal(true);
    setIsEdit(!isEdit);
    setIdIndex(index);
    setIdItem(id);
  }

  function handleoption(e) {
    e.target.classList.toggle("text-[pink]");
    setopstion(e.target.innerText);
  }

  function handletBulr(e) {
    e.target.classList.remove("text-[pink]");
  }

  async function handleUpdatetask(from) {
    const newTaskEdit = {
      Mytask: from.Mytask,
      MyDate: from.myDate,
      MyTime: from.newTime,
      fulldate: from.fulldate,
      id: idItem,
      complete: false,
      iduser: props.inforUser ? props.inforUser.id : "",
    };

    const res = await fetch(`http://localhost:5000/tasks/${idItem}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newTaskEdit),
    });
    const data = await res.json();
    todos.splice(idIndex, 1, data);
    settodos([...todos]);

    // localStorage.setItem("todolist-reactjs", JSON.stringify([...todos]));
  }
  const handletodofromsubmit = async (fromvalue) => {
    if (fromvalue.Mytask == "" || fromvalue.Mydate == "") {
      alert("Bạn cần nhập đầu đủ thông tin");
      return;
    }
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(fromvalue),
    });

    const data = await res.json();
    settodos([...todos, data]);
  };
  let Datasearch = todos.filter((item) => {
    switch (opstion) {
      case "All":
        return Object.keys(item).some((keys) =>
          item[keys]
            .toString()
            .toLowerCase()
            .includes(props.search.toString().toLocaleLowerCase())
        );
        break;

      case "Complete":
        return item.complete == true;

        break;
      case "Completed":
        return item.complete == false;
        break;

      default:
        break;
    }
  });

  return (
    <div
      className="App w-full
  relative
  mx-auto
  flex
  flex-col
  my-[10px]
  h-full
  rounded-[1rem]
  shadow-xl
  border-[0.2rem]
  py-[2rem]
  
  
  
  "
    >
      {openModal && (
        <ModalEdit sendform={handleUpdatetask} setClose={setonpenModal} />
      )}
      <div className="flex flex-col items-center justify-center mb-5 relative">
        <div className=" search-task w-[50%] relative ">
          <i
            class="fa-solid fa-magnifying-glass absolute text-[#000] bottom-0 translate-y-[-70%] translate-x-5
          "
          ></i>
          <input
            type="text"
            className="  w-full bg-slate-100 p-[8px] px-[40px] outline-none border-2 border-[#ECCE93] placeholder:pl-[10px]  "
            placeholder="Search your task
        "
            onChange={(e) => handdleChangeSearchBar(e)}
            value={props.search}
          />
        </div>
      </div>
      <div className="grid md:grid-cols-10  box-list  h-[450px] border-[2px] border-x-0 ">
        <div className="md:col-span-3 h-full">
          <TodoFrom
            onSubmit={handletodofromsubmit}
            isEdit={isEdit}
            data={todos}
            iduser={props.inforUser ? props.inforUser.id : ""}
          />
        </div>
        <div className="md:col-span-7 box-content   max-h-[500px] overflow-y-scroll py-[2rem] ">
          <ListTodo
            Datamian={todos}
            data={Datasearch}
            setIdItem={setIdItem}
            settodos={settodos}
            onEdit={handleEdit}
          />
        </div>
      </div>
      <div className="footer">
        <div className=" mr-[2rem]  flex items-center justify-between w-[50%] md:w-[30%] p-[10px]  float-right">
          <button
            onBlur={(e) => handletBulr(e)}
            className="hover:text-[pink]"
            onClick={(e) => handleoption(e)}
          >
            Complete
          </button>
          <button
            onBlur={(e) => handletBulr(e)}
            className="hover:text-[pink]"
            onClick={(e) => handleoption(e)}
          >
            Completed
          </button>
          <button
            onBlur={(e) => handletBulr(e)}
            className="hover:text-[pink]"
            onClick={(e) => handleoption(e)}
          >
            All
          </button>
        </div>
      </div>
    </div>
  );
}

export default Body;
