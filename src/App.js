import "./App.css";
import Form from "./components/Form";
import Table from "./components/Table";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";


function App() {
  const [boolean, setBoolean] = useState(false);
  const [inputarr, setInputarr] = useState([]);
  const [index, setIndex] = useState([]);
  const [i, setI] = useState("")
  const [inputdata, setInputdata] = useState({
    name: "",
    email: "",
    dob: "",
    address: "",
  });
  let { name, email, dob, address } = inputdata;
  function addrecordhandle() {
    // setInputarr([...inputarr, { name, email, dob, address }]);
    //clear the input field again
    // setInputdata({ name: "", email: "", dob: "", address: "" });
    fetch("http://localhost:5000/submit", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "AccessControl-Allow-Origin": "*",
      },
      body: JSON.stringify({
        name,
        email,
        dob,
        address,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    // useEffect(()=>{
    //   axios
    //   .get("http://localhost:5000/get")
    //   .then(function (response) {
    //     // handle success
    //     let array = response.data;
    //     let inputarr = array;
    //     setInputarr([...inputarr]);
    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error);
    //   })
    //   .then(function () {
    //     // always executed
    //   });
    // })
    
    setInputdata({ name: "", email: "", dob: "", address: "" });
  }

  useEffect(()=>{
    axios
    .get("http://localhost:5000/get")
    .then(function (response) {
      // handle success
      let array = response.data;
      let inputarr = array;
      setInputarr([...inputarr]);
    })
  })
  // function to splice the previous record from that particular index
  function updateData() {
    console.log(i)
  
    axios.put(`http://localhost:5000/update/${i}`,{
        name,email,dob,address
    })
    // console.log(i)
    // console.log(index)
    // let total = [...inputarr];
    // total.splice(index, 1, { name, email, dob, address });
    // setInputarr(total);
    setBoolean(false);
    setInputdata({ name: "", email: "", dob: "", address: "" });
  }
  //function to handle changes in input field
  function changehandle(event) {
    setInputdata({ ...inputdata, [event.target.name]: event.target.value });
  }

  const deleteInput = (index, id) => {
    console.log(id)
    // let totalrecords = [...inputarr];
    // totalrecords.splice(index, 1);
    // setInputarr(totalrecords);
    axios.delete(`http://localhost:5000/delete/${id}`)
  }

  function updateInput(index,i) {
    axios.put(`http://localhost:5000/update/${i}`)
    let { name, email, dob, address } = inputarr[index];
    setInputdata({ name, email, dob, address });
    setBoolean(true);
    setIndex(index);
    setI(i)
    
  }

  return (
    <>
      <Form
        inputdata={inputdata}
        changehandle={changehandle}
        boolean={boolean}
        updateData={updateData}
        addrecordhandle={addrecordhandle}
      />
      <Table
        deleteInput={deleteInput}
        updateInput={updateInput}
        inputarr={inputarr}
      />
    </>
  );
}

export default App;
