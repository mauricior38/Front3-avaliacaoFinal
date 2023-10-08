import { useContext, useEffect } from "react";
import { DentistContext } from "../../context/userContext";

import LoginForm from "../../Components/LoginForm/index";

const Contact = () => {
  const { loged } = useContext(DentistContext);

  useEffect(() => {
    console.log(loged);
  });

  return (
    <div className="dark">
      <h1>Logout</h1>
      <LoginForm />
    </div>
  );
};

export default Contact;
