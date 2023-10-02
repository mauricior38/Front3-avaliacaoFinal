import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DefaultLayout } from "../layouts/DefaultLayoult";
import { Home } from "../pages/Home/index";
import { DentistContextProvider } from "../context/userContext";

import LoginForm from "../Components/LoginForm";

import DetailCard from "../Components/DetailCard";

export const RouteList = () => {
  return (
    <BrowserRouter>
      <DentistContextProvider>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />

            <Route path="/dentista/:matricula" element={<DetailCard />} />
          </Route>
        </Routes>
      </DentistContextProvider>
    </BrowserRouter>
  );
};
