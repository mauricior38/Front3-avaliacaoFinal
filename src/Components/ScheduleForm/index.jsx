import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/changeTheme.hook";
import ScheduleForm from "../Schedule";
import { DentistContext } from "../../context/userContext";

const ScheduleFormModal = () => {
  const { theme } = useTheme();
  const { token } = useContext(DentistContext);

  return (
    <>
      {token ? (
        <div
          className={`modal fade`}
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            {/* //Na linha seguinte deverá ser feito um teste se a aplicação
          // está em dark mode e deverá utilizar o css correto */}
            <div className={`modal-content`}>
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                Selecione o dentista, o paciente, a data e hora da consulta
                </h1>
                {/* //Na linha seguinte deverá ser feito um teste se a aplicação
              // está em dark mode e deverá utilizado o css correto */}
                <button
                  type="button"
                  className={`btn-close`}
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <ScheduleForm />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`modal fade`}
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
            <div className={`modal-content`}>
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Você precisa estar logado na plataforma para cadastrar uma consulta
                </h1>
                {/* //Na linha seguinte deverá ser feito um teste se a aplicação
            // está em dark mode e deverá utilizado o css correto */}
                <button
                  type="button"
                  className={`btn-close`}
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <Link to="/login">
                  <button className="btn btn-primary" data-bs-dismiss="modal">Faça seu login</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ScheduleFormModal;
