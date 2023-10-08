import { useEffect, useState } from "react";
import api from "../../services/api";
import { useTheme } from '../../hooks/changeTheme.hook';

import Card from "../../Components/Card/index";

export const Home = () => {
  const { theme } = useTheme() || {};
  const [ listaDentistas, setListaDentistas  ] = useState([])


  async function loadDentistas() {
    const response = await api.get("/dentista");
    if(response && response.data) {
      const data = await response.data;
      setListaDentistas(data);
      localStorage.setItem("@dentistas", JSON.stringify(data));

    }
  }

  useEffect(() => {
    loadDentistas();
  
  }, []);

  return (
    <div className={`${theme === 'dark' ? 'dark' : 'light'} pb-4`} >
      <h1>Dentistas disponíveis</h1>
      <div className="card-grid container">
        {listaDentistas.map(({nome, sobrenome, matricula}) => (
          <Card key={matricula} nome={nome} sobrenome={sobrenome} matricula={matricula} />
        ))}
      </div>
    </div>
  );
};
