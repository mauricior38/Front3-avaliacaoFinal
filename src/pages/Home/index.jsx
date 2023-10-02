import { useEffect, useState, useContext } from "react";
import api from "../../services/api";

import { DentistContext } from "../../context/userContext";

import Card from "../../Components/Card/index";

export const Home = () => {
  const { setListaDentistas, listaDentistas, checkLogged, isLogged } = useContext(DentistContext);

  async function loadDentistas() {
    const response = await api.get("/dentista");
    const data = await response.data;
    setListaDentistas(data);
    localStorage.setItem("@dentistas", JSON.stringify(data));
  }

  useEffect(() => {
    loadDentistas();
  
  }, []);

  return (
    <>
      <h1>Dentistas disponíveis</h1>
      <div className="card-grid container">
        {listaDentistas.map(({nome, sobrenome, matricula}) => (
          <Card key={matricula} nome={nome} sobrenome={sobrenome} matricula={matricula} />
        ))}
      </div>
    </>
  );
};
