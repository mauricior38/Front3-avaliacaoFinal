import { createContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

export const DentistContext = createContext();

export function DentistContextProvider({ children }) {
  const [listaDentistas, setListaDentistas] = useState([]);
  const [dentista, setDentista] = useState({});
  const [loged, setLoged] = useState(null);
  const [isLogged, setIsLoged] = useState(false);

    
  const navigate = useNavigate();

  async function signIn(username, password) {
    try {

      const e = await api
        .post("/auth", {
          username: username,
          password: password,
        })

      console.log("Login realizado com sucesso");
      const token = e.data.token;
      setLoged(token);
      localStorage.setItem("@dentistas-password", JSON.stringify(token));
      navigate("/home");
      return;
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          alert('Login ou senha incorretos')
        } else {
          alert('Erro: Tente novamente mais tarde')
        }
      }
    }
  }

  function checkLogged() {
    const checkLoggedRef = localStorage.getItem('@dentistas-password');

    if (checkLoggedRef) {
      setIsLoged(true)
    } else {
      console.log('não ta pegando a chave')
    }
  }

  return (
    <DentistContext.Provider
      value={{
        listaDentistas,
        setListaDentistas,
        dentista,
        signIn,
        isLogged,
        checkLogged,
      }}
    >
      {children}
    </DentistContext.Provider>
  );
}
