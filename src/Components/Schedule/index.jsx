import { useEffect, useState, useContext } from "react";
import api from "../../services/api";
import styles from "./ScheduleForm.module.css";
import { useTheme } from "../../hooks/changeTheme.hook";
import { DentistContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const ScheduleForm = () => {
  const { theme } = useTheme();

  const navigate = useNavigate()

  const [dentistaEscolha, setDentistaEscolha] = useState("");
  const [pacienteEscolha, setPacienteEscolha] = useState("");
  const [date, setDate] = useState("");

  const [listaDentistas, setListaDentistas] = useState([]);
  const [listaP, setListaP] = useState(null);

  const { token } = useContext(DentistContext);

  async function loadData() {
    try {
      const responseDentista = await api.get("/dentista");
      const dataDentista = responseDentista.data;

      const responsePaciente = await api.get("/paciente");
      const dataPaciente = responsePaciente.data.body;

      setListaDentistas(dataDentista);
      setListaP(dataPaciente);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      dentista: {
        matricula: dentistaEscolha
      },
      paciente: {
        matricula: pacienteEscolha,
      },
      dataHoraAgendamento: date,
    };
    try {
      
      await api.post("/consulta", userData, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      alert('Consulta agendada com sucesso.')
      
      navigate('/home')
      window.location.reload()

    } catch (error) {
      if(error.response){
        alert(error.response.data)
      }else if(error.reponse.status === 403){
        alert('Faça o login para agendar uma consulta')
      }else{
        alert('Erro: Tente novamente mais tarde')
      }
    }
  };

  if (!listaP) {
    return null;
  }

  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
      <div className={`text-center container}`}>
        <form onSubmit={handleSubmit}>
          <div className={`row ${styles.rowSpacing}`}>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="dentist" className="form-label">
                Dentist
              </label>
              <select
                className="form-select"
                name="dentist"
                id="dentist"
                onChange={(e) => setDentistaEscolha(e.target.value)}
              >
                {listaDentistas.map((dentista) => {
                  return (
                    <option key={dentista.matricula} value={dentista.matricula}>
                      {dentista.nome}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="patient" className="form-label">
                Patient
              </label>

              <select
                className="form-select"
                name="patient"
                id="patient"
                onChange={(e) => setPacienteEscolha(e.target.value)}
              >
                {listaP.map((paciente) => {
                  return (
                    <option key={paciente.matricula} value={paciente.matricula}>
                      {paciente.nome}
                    </option>
                  );
                })}
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
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
          <div className={`row ${styles.rowSpacing}`}>
            {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
            <button
              className={`btn btn-${theme} ${styles.button}`}
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
