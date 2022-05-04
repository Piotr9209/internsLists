import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import "./editIntern.scss";

export const EditIntern = () => {
  const { id } = useParams();
  const [dataForm, setDataForm] = useState({
    id: "",
    name: "",
    email: "",
    internshipStart: "",
    internshipEnd: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    name: "",
    email: "",
    date: "",
  });
  const fetchInternsById = async (idIntern) => {
    const URL_FETCH = `http://localhost:3001/interns/${idIntern}`;
    const response = await fetch(URL_FETCH);
    if (!response.ok) {
      throw Error(`HTTP error! status: ${response.status}`);
    }
    const intern = await response.json();
    const { name, email, id, internshipStart, internshipEnd } = intern;

    setDataForm({
      id,
      name,
      email,
      internshipStart: JSON.stringify(
        new Date(internshipStart.replace("+", ":"))
      ).slice(1, 11),
      internshipEnd: JSON.stringify(
        new Date(internshipEnd.replace("+", ":"))
      ).slice(1, 11),
    });
  };
  useEffect(() => {
    //TODO: get intern from REST api http://localhost:3001/interns/:id

    fetchInternsById(id);
    console.log(`I want to get intern with id: ${id}!`);
  }, [id]);

  const handleChangeValue = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const regExpEmail =
      /^([a-zA-Z0-9_..-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    const updateInterns = async (id) => {
      const URL_FETCH = `http://localhost:3001/interns/${id}`;
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataForm),
      };
      const response = await fetch(URL_FETCH, requestOptions);
      if (!response.ok) {
        throw Error(response.message);
      }
      try {
        const data = await response.json();
        alert(`Interns ${dataForm.name} is updated`);
        return data;
      } catch (err) {
        throw Error(err);
      }
    };

    const isEmptyString = dataForm.name === "";
    const isWrongEmail = regExpEmail.test(dataForm.email);
    const isAfterDateInInternshipEnd =
      new Date(dataForm.internshipStart) >= new Date(dataForm.internshipEnd);

    if (isEmptyString || !isWrongEmail || isAfterDateInInternshipEnd) {
      return setErrorMessage({
        ...errorMessage,
        name: isEmptyString ? "This field is required" : "",
        email: !isWrongEmail ? "This email is not correct" : "",
        date: isAfterDateInInternshipEnd ? "The date is not correct" : "",
      });
    } else {
      //todo: block sending when data is the same
      return (
        updateInterns(id),
        setErrorMessage({
          ...errorMessage,
          name: "",
          email: "",
          internshipEnd: "",
        })
      );
    }
  };

  return (
    <section className="edit">
      <div className="edit__container__NavLink">
        <NavLink to="/">Back to list </NavLink>
      </div>
      <h1>Edit</h1>
      <form className="form__container" onSubmit={handleSubmitForm}>
        <div className="form__container--fullName">
          <label htmlFor="fullName">Full name *</label>
          <input
            id="fullName"
            type="text"
            name="name"
            value={dataForm.name}
            onChange={handleChangeValue}
          />
          {!!errorMessage.name && <p>{errorMessage.name}</p>}
        </div>
        <div className="form__container--email">
          <label htmlFor="email">Email *</label>
          <input
            id="email"
            type="text"
            name="email"
            value={dataForm.email}
            onChange={handleChangeValue}
          />
          {!!errorMessage.email && <p>{errorMessage.email}</p>}
        </div>
        <div className="form__container--date">
          <label htmlFor="internshipStart">Internship Start</label>
          <input
            id="internshipStart"
            type="date"
            name="internshipStart"
            value={dataForm.internshipStart}
            onChange={handleChangeValue}
          />
          <label htmlFor="internshipEnd">Internship End</label>
          <input
            id="internshipEnd"
            type="date"
            name="internshipEnd"
            value={dataForm.internshipEnd}
            onChange={handleChangeValue}
          />
          {!!errorMessage.date && <p>{errorMessage.date}</p>}
        </div>
        <div className="form__container--button">
          <input type="submit" value="Submit" />
          {/* todo: disabled button after sending */}
        </div>
      </form>
    </section>
  );
};
