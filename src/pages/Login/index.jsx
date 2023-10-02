import { useContext, useEffect, useState } from "react";
import { DentistContext } from "../../context/userContext";

import LoginForm from "../../Components/LoginForm/index";

const Contact = () => {
  const { loged } = useContext(DentistContext);

  useEffect(() => {
    console.log(loged);
  });

  return (
    <>
      <h1>Logout</h1>
      <LoginForm />
    </>
  );
};

export default Contact;
