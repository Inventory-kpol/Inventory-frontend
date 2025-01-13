import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import LoginBase from "./components/LoginBase";

export default function App() {
  return (
    <Routes>
        <Route element={<LoginBase />}>
        <Route path="/" element={<Login />}></Route>
        <Route path="/SignUp" element={<SignUp />}></Route>
      </Route>
    </Routes>
  );
}