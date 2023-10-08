import styles from "./Form.module.css";
import { useContext, useState } from "react";
import { DentistContext } from "../../context/userContext";
import { useTheme } from "../../hooks/changeTheme.hook";

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {theme} = useTheme()

  const { signIn } = useContext(DentistContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    //Nesse handlesubmit você deverá usar o preventDefault,
    //enviar os dados do formulário e enviá-los no corpo da requisição
    //para a rota da api que faz o login /auth
    //lembre-se que essa rota vai retornar um Bearer Token e o mesmo deve ser salvo
    //no localstorage para ser usado em chamadas futuras
    //Com tudo ocorrendo corretamente, o usuário deve ser redirecionado a página principal,com react-router
    //Lembre-se de usar um alerta para dizer se foi bem sucedido ou ocorreu um erro
    
    signIn(username, password)
  };

  return (
    <div className={ `${theme === 'dark' ? styles.cardDark : 'light'} `}>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
      <div className={`text ${styles.textcenter}`}>
        <div className={`card-body ${styles.CardBody} d-flex justify-content-center align-items-center ${styles.form} ${theme === 'dark' ? 'dark' : 'light'}`}>
          <form onSubmit={handleSubmit}>
            <input
              className={`form-control ${styles.inputSpacing}`}
              placeholder="Login"
              value={username}
              onChange={e => setUsername(e.target.value)}
              name="login"
              minlength="8"

              required
            />
            <input
              className={`form-control ${styles.inputSpacing}`}
              placeholder="Password"
              name="password"
              type="password"
              value={password}
              minlength="6"
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button className={`btn ${styles.buttonForm}`} type="submit">
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
