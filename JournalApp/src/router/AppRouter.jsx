

import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AuthRoutes from '../auth/Routes/AuthRoutes'
import useCheckAuth from '../hooks/useCheckAuth'
import JournalRoutes from '../journal/routes/JournalRoutes'
import CheckingAuth from '../store/ui/components/CheckingAuth'

const AppRouter = () => {

    const {status, isAuthenticated} = useCheckAuth()




    if (status === 'checking') {
        return <CheckingAuth></CheckingAuth>
    }


    return (
        <>

            <Routes>


                {/* Login */}
                {!isAuthenticated ? <Route path='/auth/*' element={<AuthRoutes></AuthRoutes>}></Route> : <Route path='/*' element={<JournalRoutes></JournalRoutes>}></Route>}

                <Route path='/*' element={<Navigate to='/auth/login'></Navigate>}></Route>

                {/* JournalApp */}

            </Routes>


        </>


    )
}

export default AppRouter