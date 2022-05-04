import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./internList.scss";
export const InternList = () => {
  const [interns, setInterns] = useState([]);

  useEffect(() => {
    const fetchInterns = async () => {
      const response = await fetch("http://localhost:3001/interns");
      const interns = await response.json();
      setInterns(interns);
    };
    fetchInterns();
  }, []);

  return (
    <main className="lists">
      <h1>Participants</h1>
      <ul>
        {interns.map((u) => (
          <li key={u.id}>
            {<span>{u.name}</span>}{" "}
            <NavLink to={`/interns/${u.id}`}>Edit</NavLink>
          </li>
        ))}
      </ul>
    </main>
  );
};
