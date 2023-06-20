import CardList from '../components/CardList'
import Modal from '../UIElements/Modal'
import React, { useContext, useState } from "react";
import Input from "../components/Input";
import AuthContext from "../context/authContext";
import UseHttp from "../hooks/http-hook";
import { useNavigate } from "react-router-dom";
import { VALIDATOR_REQUIRE, validate } from "../validators";
function MyVacations() {
  const [showModal,setShowModal] = useState(false)
  const [isProcced, setIsProcced] = useState(false);
  const navigator = useNavigate();
  const auth = useContext(AuthContext);
  const [data, setData] = useState({
    title: {
      value: "",
      isValid: false,
    },
    startDate: {
      value: "",
      isValid: false,
    },
    endDate: {
      value: "",
      isValid: false,
    },
    description: {
      value: "",
      isValid: false,
    },
    id:""
  });
  const [isLoading, error, sendRequest] = UseHttp();
  const cancelHandler  = () =>{
    setShowModal(false)
  }

  const submitHandler = async(e) =>{
    e.preventDefault()
    setIsProcced(true);
    if (
      data.title.isValid &&
      data.startDate.isValid &&
      data.endDate.isValid &&
      data.description.isValid 
    ) {
      const formData = new FormData();
      formData.append("DateTimeTo", data.endDate.value);
      formData.append("Description", data.description.value);
      formData.append("DateTimeFrom", data.startDate.value);
      formData.append("title", data.title.value);
      const requestData = await sendRequest(
        "vacation/update_vacation/"+data.id,
        "PUT",
        formData,{
            authorization: "Bearer "+ auth.token
        }
      );
      if (requestData.status == "succes") navigator("/");
    }  }

  const editHandler = (data) => {
    setData({
      title: {
        value: data.title,
        isValid: true,
      },
      startDate: {
        value: data.dateTimeFrom,
        isValid: true,
      },
      endDate: {
        value: data.dateTimeTo,
        isValid: true,
      },
      description: {
        value: data.description,
        isValid: true,
      },
      id:data.vacationId
    })
    setShowModal(true)
  }
  return (
    <>
        <Modal show = {showModal} onCancel = {cancelHandler}>
        <div
      className="container"
    >
      <h2 className="title">{"Edit Vacation"}</h2>

      <form onSubmit={submitHandler} className="form">
        <Input
          label="Title"
          value ={data.title.value}
          placeholder="Enter a title"
          isValid={data.title.isValid}
          isProcced={isProcced}
          onChange={(e) => {
            setIsProcced(false);

            setData({
              ...data,
              title: {
                value: e.target.value,
                isValid: validate(e.target.value, VALIDATOR_REQUIRE()),
              },
            });
          }}
        />
        <Input
          label="Start Date"
          type="date"
          value ={data.startDate.value}
          isValid={data.startDate.isValid}
          isProcced={isProcced}
          onChange={(e) => {
            setIsProcced(false);

            setData({
              ...data,
              startDate: {
                value: e.target.value,
                isValid: validate(e.target.value, VALIDATOR_REQUIRE()),
              },
            });
          }}
        />
        <Input
          label="End Date"
          value ={data.endDate.value}
          type="date"
          isValid={data.endDate.isValid}
          isProcced={isProcced}
          onChange={(e) => {
            setIsProcced(false);

            setData({
              ...data,
              endDate: {
                value: e.target.value,
                isValid: validate(e.target.value, VALIDATOR_REQUIRE()),
              },
            });
          }}
        />
        <Input
          label="Descrption"
          textAria
          value ={data.description.value}
          isValid={data.description.isValid}
          isProcced={isProcced}
          onChange={(e) => {
            setIsProcced(false);

            setData({
              ...data,
              description: {
                value: e.target.value,
                isValid: validate(e.target.value, VALIDATOR_REQUIRE()),
              },
            });
          }}
        />
        <button className="btn btn--form" type="submit">
          Save
        </button>
      </form>
    </div>
        </Modal>
    <CardList onClick ={editHandler} my/>
    </>
    )
}

export default MyVacations