import React, { useContext, useState } from "react";
import Input from "../components/Input";
import AuthContext from "../context/authContext";
import UseHttp from "../hooks/http-hook";
import { useNavigate } from "react-router-dom";
import { VALIDATOR_REQUIRE, validate } from "../validators";

const AddVacation = () => {
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
  });
  const [isLoading, error, sendRequest] = UseHttp();
  const submitHandler = async (e) => {
    e.preventDefault();
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
        "vacation/add_vacation",
        "POST",
        formData,{
            authorization: "Bearer "+ auth.token
        }
      );
      console.log(requestData);
      if (requestData.status == "succes") navigator("/");
    }
  };
  return (
    <div
      style={{ marginTop: "25rem", marginBottom: "5rem" }}
      className="container"
    >
      <h2 className="title">{"Add Vacation"}</h2>

      <form onSubmit={submitHandler} className="form">
        <Input
          label="Title"
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
          Add Vacation
        </button>
      </form>
    </div>
  );
};

export default AddVacation;
