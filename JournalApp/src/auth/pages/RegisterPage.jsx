import { Google } from "@mui/icons-material"
import { Link as RouterLink } from 'react-router-dom'
import { Alert, Button, Grid, TextField, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import AuthLayout from "../layout/AuthLayout"
import { useForm } from "../../hooks/useForm"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks"
import { useMemo } from "react"


const formData = {
    displayName: '',
    email: '',
    password: '',
    repetirPassword: ''

}

const RegisterPage = () => {

    const dispatch = useDispatch()
    const [formSubmitted, setFormSubmitted] = useState(false)
    const { status, errorMessage } = useSelector(state => state.auth)
    const isCheckingAuthentication = useMemo(() => status === 'checking', [status])


    const formValidations = {
        email: [(value) => value.includes('@'), 'El correo debe de tener una @'],
        password: [(value) => value === repetirPassword, 'El password no coincide o los campos estan vacios'],
        displayName: [(value) => value !== '', 'El nombre es obligatorio'],
        repetirPassword: [(value) => value !== '', 'Todos los campos son obligatorios']



    }

    const { formState, onInputChange, email, password, displayName, repetirPassword, isFormValid, emailValid, passwordValid, displayNameValid, repetirPasswordValid } = useForm(formData, formValidations)


    const onSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true)
        if (!isFormValid) return
        dispatch(startCreatingUserWithEmailPassword(formState))
    }
    return (
        <>

            <AuthLayout title={'Register'}>

                <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster" >
                    <Grid container>

                        <Grid item xs={12} sx={{ mt: 2 }}> <TextField error={!!displayNameValid && formSubmitted} helperText={displayNameValid} name="displayName" value={displayName} onChange={onInputChange} label='Nombre' type='text' placeholder="Tu Nombre" fullWidth></TextField></Grid>


                        <Grid item xs={12} sx={{ mt: 2 }}> <TextField error={!!emailValid && formSubmitted} helperText={emailValid} name="email" value={email} onChange={onInputChange} label='Correo' type='email' placeholder="correo@google.com" fullWidth></TextField></Grid>


                        <Grid item xs={12} sx={{ mt: 2 }}> <TextField error={!!passwordValid && formSubmitted} helperText={passwordValid} name="password" value={password} onChange={onInputChange} label='Contraseña' type='password' placeholder="Tu Contraseña" fullWidth></TextField></Grid>

                        <Grid item xs={12} sx={{ mt: 2 }}> <TextField error={!!repetirPasswordValid && formSubmitted} helperText={repetirPasswordValid} name="repetirPassword" value={repetirPassword} onChange={onInputChange} label='Repetir Contraseña' type='password' placeholder="Repetir Tu Contraseña" fullWidth></TextField></Grid>





                    </Grid>


                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                        <Grid display={!!errorMessage ? '' : 'none'} item xs={12} sm={6}>

                            <Alert severity="error">{errorMessage}</Alert>

                        </Grid>
                        <Grid item xs={12} sm={6}>

                            <Button disabled={isCheckingAuthentication} type="submit" variant="contained" fullWidth>Register</Button>

                        </Grid>







                    </Grid>

                    <Grid container direction='row' justifyContent='end'><Link component={RouterLink} color="inherit" to='/auth/register'></Link><Typography><Link to='/auth/login'>¿Ya Tienes una Cuenta?</Link></Typography></Grid>




                </form>

            </AuthLayout>

        </>

    )
}

export default RegisterPage