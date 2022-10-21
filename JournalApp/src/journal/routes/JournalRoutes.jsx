import { Navigate, Route, Routes } from "react-router-dom"
import Journal from "../pages/Journal"

const JournalRoutes = () => {
  return (
    <Routes>

        <Route path="/" element={<Journal></Journal>}></Route>
        <Route path="/*" element={<Navigate to='/'></Navigate>}></Route>


    </Routes>

    )
}

export default JournalRoutes