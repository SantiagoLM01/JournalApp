import { configureStore } from "@reduxjs/toolkit"
import { fireEvent, render, screen } from "@testing-library/react"
import { Provider, useDispatch } from "react-redux"
import { MemoryRouter } from "react-router-dom"
import LoginPage from "../../../src/auth/pages/LoginPage"
import { authSlice } from "../../../src/store/auth/authSlice"


const mockStartOnGoogleSignIn = jest.fn()

const mockStartLoggingUserWithEmailPassword = jest.fn()


jest.mock('../../../src/store/auth/thunks', () => ({
    startOnGoogleSignIn: () => mockStartOnGoogleSignIn,
    startLoggingUserWithEmailPassword: ({ email, password }) => {
        return () => mockStartLoggingUserWithEmailPassword({ email, password })
    },

}))

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn) => fn()
}))

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    },
})


describe('Pruebas en el LoginPage', () => {

    beforeEach(() => jest.clearAllMocks())

    test('debe de mostrar el componente correctamente', () => {

        render(
            <Provider store={store}><MemoryRouter><LoginPage></LoginPage></MemoryRouter></Provider>

        )

        screen.debug()

        expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1)


    })

    test('boton de google debe llamar el StartGoogleSignIn', () => {


        render(
            <Provider store={store}><MemoryRouter><LoginPage></LoginPage></MemoryRouter></Provider>

        )
        const googleBtn = screen.getByLabelText('google-btn')

        fireEvent.click(googleBtn)

        expect(mockStartOnGoogleSignIn).toHaveBeenCalled()


    })

    test('boton de startLoginWithEmailPassword se llama', () => {


        render(
            <Provider store={store}><MemoryRouter><LoginPage></LoginPage></MemoryRouter></Provider>

        )
        const emailField = screen.getByRole('textbox', { name: 'Correo' })
        fireEvent.change(emailField, { target: { name: 'email', value: 'email' } })

        const passwordField = screen.getByTestId('password')
        fireEvent.change(passwordField, { target: { name: 'password', value: 'password' } })

        const loginFform = screen.getByLabelText('submit-form')
        fireEvent.submit(loginFform)

        const emailBtn = screen.getByLabelText('email-btn')

        fireEvent.click(emailBtn)




    })



})