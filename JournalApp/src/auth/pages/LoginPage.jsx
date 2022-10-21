import { Google } from "@mui/icons-material"
import { Link as RouterLink } from 'react-router-dom'
import { Alert, Button, Grid, TextField, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import AuthLayout from "../layout/AuthLayout"
import { useForm } from "../../hooks/useForm"
import { checkingAuthentication, startLoggingUserWithEmailPassword, startOnGoogleSignIn } from "../../store/auth/thunks"
import { useDispatch, useSelector } from "react-redux"
import { useMemo } from "react"
import { useState } from "react"


const formData = {
    email: '',
    password: ''
}

const LoginPage = () => {

    const [formSubmitted, setFormSubmitted] = useState(false)

    const formValidations = {
        email: [(value) => value.includes('@'), 'El correo debe de tener una @'],
        password: [(value) => value !== '', 'Todos los campos son obligatorios']
    }

    const dispatch = useDispatch()

    const { status, errorMessage } = useSelector(state => state.auth)


    const { isFormValid, formState, onInputChange, onResetForm, email, password, emailValid, passwordValid, } = useForm(formData, formValidations)

    const isAuthenticating = useMemo(() => status === 'checking', [status])

    const onSubmit = (e) => {
        e.preventDefault();

        console.log({ email, password })
        setFormSubmitted(true)
        if (!isFormValid) return
        dispatch(startLoggingUserWithEmailPassword(formState))
    }


    const onGoogleSignIn = () => {
        console.log('OnGoogleSignIn')
        dispatch(startOnGoogleSignIn(formState))
    }

    return (
        <>

            <AuthLayout title={'Login'}>

                <form aria-label="submit-form" onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster" >
                    <Grid container>
                        <Grid item xs={12} sx={{ mt: 2 }}> <TextField error={!!emailValid && formSubmitted} helperText={emailValid} name="email" value={email} onChange={onInputChange} label='Correo' type='email' placeholder="correo@google.com" fullWidth></TextField></Grid>


                        <Grid item xs={12} sx={{ mt: 2 }}> <TextField inputProps={{
                            'data-testid': 'password'
                        }} error={!!passwordValid && formSubmitted} helperText={passwordValid} name="password" value={password} onChange={onInputChange} label='Contraseña' type='password' placeholder="Tu Contraseña" fullWidth></TextField></Grid>





                    </Grid>
                    
                    <Grid display={!!errorMessage ? '' : 'none'} item>

                        <Alert severity="error">{errorMessage}</Alert>

                    </Grid>

                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>


                        <Grid item xs={12} sm={6}>

                            <Button aria-label="email-btn" disabled={isAuthenticating} type="submit" variant="contained" fullWidth>Login</Button>

                        </Grid>

                        <Grid item xs={12} sm={6}>

                            <Button aria-label="google-btn" onClick={onGoogleSignIn} variant="contained" fullWidth><Google></Google><Typography sx={{ ml: 1 }}>Google</Typography></Button>

                        </Grid>





                    </Grid>

                    <Grid container direction='row' justifyContent='end'><Link component={RouterLink} color="inherit" to='/auth/register'>Crear una Cuenta</Link></Grid>




                </form>

            </AuthLayout>

        </>

    )
}

export default LoginPage