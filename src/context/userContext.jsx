import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

export const DentistContext = createContext();

export function DentistContextProvider({ children }) {
  const [listaDentistas, setListaDentistas] = useState([]);

  const [token, setToken] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadUser() {
      try {
        const storageUser = await localStorage.getItem("@dentistas-password");
        
        if (storageUser) {
          setToken(JSON.parse(storageUser));
        } else {
        }
      } catch (error) {
        console.log(error);
      }
    }

    loadUser();
  }, []);

  async function signIn(username, password) {
    try {
      const e = await api.post("/auth", {
        username: username,
        password: password,
      });

      const token = e.data.token;
      localStorage.setItem("@dentistas-password", JSON.stringify(token));
      navigate("/home");
      navigate(0);
      return;
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          alert("Login ou senha incorretos");
        } else {
          alert("Erro: Tente novamente mais tarde");
        }
      }
    }
  }

 async function signOut(){
  setToken(null);
  localStorage.removeItem("@dentistas-password");
 }

  return (
    <DentistContext.Provider
      value={{
        listaDentistas,
        setListaDentistas,
        signIn,
        signOut,
        token
      }}
    >
      {children}
    </DentistContext.Provider>
  );
}
