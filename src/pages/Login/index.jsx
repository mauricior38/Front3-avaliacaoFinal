import { useContext, useEffect, useState } from "react";
import { DentistContext } from "../../context/userContext";
import { useTheme } from '../../hooks/changeTheme.hook';

import LoginForm from "../../Components/LoginForm/index";

const Contact = () => {
  const { loged } = useContext(DentistContext);

  const { theme } = useTheme();

  useEffect(() => {
    console.log(loged);
  });

  return (
    <div >
      <h1>Logout</h1>
      <LoginForm />
    </div>
  );
};

export default Contact;
