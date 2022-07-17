import React, { Component } from "react";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";

class TodoFrom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MyDate: "",
      Mytask: "",
      MyTime: "",
      fulldate: "",
      iduser: this.props.iduser,
      complete: false,
    };
  }

  handleChangeTask = (e) => {
    this.setState({
      iduser: this.props.iduser,
      Mytask: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.props.iduser);

    const fromvalue = this.state;
    console.log(fromvalue);
    this.props.onSubmit(fromvalue);
    this.setState({
      MyDate: "",
      Mytask: "",
      MyTime: "",
      fulldate: "",
      iduser: "",
      complete: false,
    });
    console.log(this.state);
  };
  handleChangeDate = (e) => {
    let valueDate = e.target.value;
    console.log(valueDate);
    let newDate = `${valueDate.getDate()}/${
      valueDate.getMonth() + 1
    }/${valueDate.getFullYear()}`;
    let newTime = valueDate.toLocaleTimeString().slice(0, 5);
    this.setState({
      MyDate: newDate,
      fulldate: e.target.value,
      MyTime: newTime,
    });

    // let DateFull = `${DateFrominpput.getDate()}/${
    //   DateFrominpput.getHours() + 1
    // }/${DateFrominpput.getFullYear()}`;
  };
  render() {
    const { Mytask, Mydate, MyTime, fulldate } = this.state;
    return (
      <div
        className="myfrom
        font-mono
        relative
        px-[1rem]
        text-center
        md:border-r-2
        h-[100%] 
        flex
        items-center
        justify-center
        
        
      "
      >
        <div className="h-2/4 w-full pl-5 mb-[20px]">
          <h1 className="  text-[1.5rem] mb-5">Add yours tasks ✏️ </h1>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={Mytask}
              placeholder="Name task"
              onChange={(e) => this.handleChangeTask(e)}
              className=" outline-none border-b

              
               border-[rgba(0,0,0,0.4)] w-full
            mb-5"
            />
            <DateTimePickerComponent
              value={fulldate}
              min={new Date()}
              className="placeholder:text-[0.97rem] text-[gray]"
              placeholder="Task start time"
              onChange={(e) => this.handleChangeDate(e)}
            ></DateTimePickerComponent>
            <button
              type="submit"
              className="btn-add w-full p-4 bg-[#ECCE93] mt-5 text-[#fff]"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default TodoFrom;
