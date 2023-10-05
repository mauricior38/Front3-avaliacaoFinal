import { useEffect, useState } from "react";
import api from '../../services/api';
import styles from "./ScheduleForm.module.css";
import { useTheme } from '../../hooks/changeTheme.hook'


const ScheduleForm = () => {
  const { theme } = useTheme()

  const [ listaDentistas, setListaDentistas] = useState([]);
  const [listaP, setListaP] = useState(null);


  async function loadData() {
    try{
    const responseDentista = await api.get("/dentista");
    const dataDentista = await responseDentista.data;

    const responsePaciente = await api.get("/paciente");
    const dataPaciente = await responsePaciente.data.body;
    
    setListaDentistas(dataDentista);
    setListaP(dataPaciente);

    }catch(error){
      console.log(error);
    }
  }


  useEffect(() => {
    loadData();
    console.log(listaP)
  }, []);

  const handleSubmit = (event) => {
    //Nesse handlesubmit você deverá usar o preventDefault,
    //obter os dados do formulário e enviá-los no corpo da requisição 
    //para a rota da api que marca a consulta
    //lembre-se que essa rota precisa de um Bearer Token para funcionar.
    //Lembre-se de usar um alerta para dizer se foi bem sucedido ou ocorreu um erro
  };


  if(!listaP){
    return null;
  }

  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
      <div
        className={`text-center container}`
        }
      >
        <form onSubmit={handleSubmit}>
          <div className={`row ${styles.rowSpacing}`}>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="dentist" className="form-label">
                Dentist
              </label>
              <select className="form-select" name="dentist" id="dentist">
                {/*Aqui deve ser feito um map para listar todos os dentistas*/}

                {listaDentistas.map((dentista) => {
                  return <option key={dentista.matricula} value={dentista.matricula}>
                  {dentista.nome}
                </option>
                })}

              </select>
            </div>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="patient" className="form-label">
                Patient
              </label>

              <select className="form-select" name="patient" id="patient">
                {/*Aqui deve ser feito um map para listar todos os pacientes*/}
                

              </select>
            </div>
          </div>
          <div className={`row ${styles.rowSpacing}`}>
            <div className="col-12">
              <label htmlFor="appointmentDate" className="form-label">
                Date
              </label>
              <input
                className="form-control"
                id="appointmentDate"
                name="appointmentDate"
                type="datetime-local"
              />
            </div>
          </div>
          <div className={`row ${styles.rowSpacing}`}>
            {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
            <button
              className={`btn btn-${theme} ${styles.button
                }`}
              type="submit"
            >
              Schedule
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ScheduleForm;
