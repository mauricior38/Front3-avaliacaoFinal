import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DefaultLayout } from "../layouts/DefaultLayoult";
import { Home } from "../pages/Home/index";
import LoginForm from "../Components/LoginForm";

export const RouteList = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<DefaultLayout />}>
                    <Route path="/home" element={<Home />}/>
                    <Route path="/login" element={<LoginForm />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}