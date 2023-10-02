import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

export const DentistContext = createContext();

export function DentistContextProvider({ children }) {
  const [listaDentistas, setListaDentistas] = useState([]);
  const [dentista, setDentista] = useState({});
  const [loged, setLoged] = useState(null);
  const [isLogged, setIsLoged] = useState(false);

  const navigate = useNavigate();

  function procuraDentista(matricula) {
    const perfilDentista = listaDentistas.find(
      (e) => e.matricula === matricula
    );
    setDentista(perfilDentista);
    return;
  }

  async function signIn(username, password) {
    await api
      .post("/auth", {
        username: username,
        password: password,
      })
      .then((e) => {
        console.log("Login realizado com sucesso");
        const token = e.data.token;
        setLoged(token);
        localStorage.setItem("@dentistas-password", JSON.stringify(token));
        navigate("/home");
        return;
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  }

  function checkLogged(){
    const checkLoggedRef = localStorage.getItem('@dentistas-password');
    
    if(checkLoggedRef){
      setIsLoged(true)
    }else{
      console.log('não ta pegando a chave')
    }
  }

  return (
    <DentistContext.Provider
      value={{
        listaDentistas,
        setListaDentistas,
        procuraDentista,
        dentista,
        signIn,
        isLogged,
        checkLogged
      }}
    >
      {children}
    </DentistContext.Provider>
  );
}
