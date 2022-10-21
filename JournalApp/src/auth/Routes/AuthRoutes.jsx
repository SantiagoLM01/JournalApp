import { Navigate, Route, Routes } from "react-router-dom"
import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"

const AuthRoutes = () => {
  return (

    <Routes>
        <Route path="login" element={<LoginPage></LoginPage>}/>


        <Route path="register" element={<RegisterPage></RegisterPage>}/>


        <Route path="/*" element={<Navigate to='/'></Navigate>}/>

    </Routes>

    )
}

export default AuthRoutes