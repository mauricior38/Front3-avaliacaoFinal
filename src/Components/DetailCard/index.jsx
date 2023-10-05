import { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import api from '../../services/api';

import ScheduleFormModal from "../ScheduleForm";

import styles from "./DetailCard.module.css";
import { useTheme } from '../../hooks/changeTheme.hook'

const DetailCard = () => {
  const [dentista, setDentista] = useState(null)


  const { matricula } = useParams();
  const { theme } = useTheme()

  async function loadDentist(matricula){

    try{
      const dentistaRef = await api.get(`/dentista?matricula=${matricula}`);
      setDentista(dentistaRef.data);
      console.log(dentistaRef.data)
      return;

    }catch(error){
      console.log(error);
      return;
    }
  }

  useEffect(() => {
    //Nesse useEffect, você vai fazer um fetch na api passando o
    //id do dentista que está vindo do react-router e carregar os dados em algum estado
  
    loadDentist(matricula);

  }, []);

  if(!dentista){
    return null;
  }

  return (
    //As instruções que esto com {''} precisam ser
    //substituídas com as informações que vem da api
    <>
      <h1>Detalhes sobre {dentista.nome} </h1>

      <section className="card col-sm-12 col-lg-6 container">
        {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
        <div className={`card-body row`}>
          <div className="col-sm-12 col-lg-6">
            <img
              className="card-img-top"
              src="/images/doctor.jpg"
              alt="doctor placeholder"
            />
          </div>
          <div className="col-sm-12 col-lg-6">
            <ul className="list-group">
              <li className="list-group-item">Nome: {dentista.nome}</li>
              <li className="list-group-item">
                Sobrenome: {dentista.sobrenome}
              </li>
              <li className="list-group-item">
                Usuário: {dentista.usuario.username}
              </li>
            </ul>
            <div className="text-center">
              {/* //Na linha seguinte deverá ser feito um teste se a aplicação
              // está em dark mode e deverá utilizado o css correto */}
              <button
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                className={`btn btn-${theme} ${styles.button}`}
              >
                Marcar consulta
              </button>
            </div>
          </div>
        </div>
      </section>
      <ScheduleFormModal />
    </>
  );
};

export default DetailCard;
