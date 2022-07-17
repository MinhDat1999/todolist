import React, { Component } from "react";

export default class ListTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check: false,
      opstion: "All",
      hex: "",
    };
  }
  fetchtasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();

    return data;
  };
  handleDelete = async (id, itemuser) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });

    const data = this.props.Datamian;
    let newdata = data.filter((item) => item.id !== id);
    console.log(newdata);
    this.props.settodos([...newdata]);
    // localStorage.setItem("todolist-reactjs", JSON.stringify(newdata));
  };

  handleEdit = (id, inde) => {
    console.log(id);
    this.props.setIdItem(id);
    this.props.onEdit(id, inde);
  };
  handlechecked = async (idIdex) => {
    this.setState({
      check: !this.state.check,
    });
    let newdata = this.props.data.find((item) => item.id === idIdex);
    newdata.complete = !newdata.complete;
    const res = await fetch(`http://localhost:5000/tasks/${idIdex}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newdata),
    });

    // localStorage.setItem("todolist-reactjs", JSON.stringify(this.props.data));
  };

  render() {
    let data = this.props.data;

    return (
      <>
        {data.map((item, index) => {
          return (
            <div className="  px-[2rem] py-[0.5rem]" key={item.id}>
              <div className="rounded-lg  shadow-xl overflow-hidden">
                <h1
                  className="title h-[20px] opacity-[0.6]"
                  style={{
                    backgroundColor: `#${Math.floor(
                      Math.random() * 16777215
                    ).toString(16)}`,
                  }}
                ></h1>
                <div className="  item flex items-center bg-[#EFEFEF] justify-between    py-2 px-4 ">
                  <input
                    checked={item.complete}
                    type="checkbox"
                    className="w-[15px] h-[15px] mr-5 cursor-pointer hover:outline-4"
                    onChange={() => this.handlechecked(item.id, index)}
                  />
                  <div className="flex-1 text-[1.2rem]">
                    <h2 className="title-mytasks text-[1.5rem]">
                      {item.Mytask}
                    </h2>
                    <div className="flex  text-[0.8rem] items-center text-[rgba(128,128,128,0.83)] ">
                      <i className="fa-solid fa-clock mb-1 " />
                      <p className="ml-1 ">{item.MyTime}</p>
                    </div>
                    <div className="flex text-[0.8rem] items-center text-[rgba(128,128,128,0.83)]">
                      <i className="fa-solid fa-calendar  mb-1"></i>
                      <p className="ml-1">{item.MyDate}</p>
                    </div>
                  </div>
                  <div className="icon">
                    <i
                      className="fa-solid fa-pen mr-6 text-[#48ef69]
                    hover:scale-150
                    cursor-pointer
                  "
                      onClick={() => this.handleEdit(item.id, index)}
                    ></i>
                    <i
                      className="fa-solid fa-trash text-[#E76E54] cursor-pointer   hover:scale-150"
                      onClick={() => this.handleDelete(item.id, item.iduser)}
                    ></i>
                  </div>
                  <i class="fa-solid fa-gear ml-6 hidden"></i>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  }
}
