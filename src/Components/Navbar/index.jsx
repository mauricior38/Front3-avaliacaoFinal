import { useContext } from "react";
import { Link } from 'react-router-dom';
import { useTheme } from "../../hooks/changeTheme.hook";
import { DentistContext } from "../../context/userContext";



import styles from "./Navbar.module.css";

export const Navbar = () => {
  const { theme, changeTheme } = useTheme();
  const { token, signOut, signin } = useContext(DentistContext);

  function handleClick() {
    if (theme === "light") changeTheme("dark");
    else changeTheme("light");
  }

  function handleAlternaLogin(){
    if(token){
      signOut()
    }
  }

  return (
    <header className="sticky-top ">
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar navbar-dark bg-dark ou navbar-light bg-light*/}
      <nav
        className={`navbar navbar-expand-sm navbar-${theme} bg-${theme} `}
        aria-label="Third navbar example"
      >
        <div className="container">
          {/* Ao clicar, o usuário deve ser redirecionado a home, com react-router */}
          <a className={`navbar-brand ${styles.navbarBrand}`} href="/home">
            DH Odonto
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsExample03"
            aria-controls="navbarsExample03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarsExample03"
          >
            <ul className="navbar-nav mb-2 mb-sm-0">
              <li className={`nav-item ${styles.navBarLink}`}>
                {/* Ao clicar, o usuário deve ser redirecionado a home, com react-router */}
                <a className="nav-link" href="/home">
                  Home
                </a>
              </li>
              <li className={`nav-item ${styles.navBarLink}`}>
                {/* Se o usuário estiver logado, deverá aparecer um botão de logout
                que vai apagar o token do localstorage.
                Se o usuário estiver deslogado, um link fará um redirecionamento, com react-router,
                ao formulário de login
                O botão de logout deverá ser testado darkmode
                se sim, btn-dark, se não, btn-light */}
                <Link className="nav-link" to="/login" replace onClick={handleAlternaLogin}>
                  {!token ? 'Login' : 'Logout'}
                </Link>
              </li>
              <li className={`nav-item`}>
                {/* Ao ser clicado, esse botão mudará a aplicação para dark mode ou light mode.
                 Lembre-se de usar um estado no contexto para fazer essa alteração.
                 Na linha seguinte deverá ser feito um teste se a aplicação
                 está em dark mode e deverá utilizar o icone ☀ e btn-dark ou btn-light*/}
                <button
                  className={`btn btn-${theme} ${styles.btnStyle}` } onClick={handleClick}
                >
                  ☀
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

